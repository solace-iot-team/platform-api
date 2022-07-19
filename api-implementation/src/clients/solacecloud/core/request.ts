/* eslint-disable */
import FormData from 'form-data';
import { BodyInit, Headers, RequestInit, Response } from 'node-fetch';
import fetch from 'fetch-with-proxy';
import { types } from 'util';

import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';

function isDefined<T>(value: T | null | undefined): value is Exclude<T, null | undefined> {
    return value !== undefined && value !== null;
}

function isString(value: any): value is string {
    return typeof value === 'string';
}

function isStringWithValue(value: any): value is string {
    return isString(value) && value !== '';
}

function isBinary(value: any): value is Buffer | ArrayBuffer | ArrayBufferView {
    const isBuffer = Buffer.isBuffer(value);
    const isArrayBuffer = types.isArrayBuffer(value);
    const isArrayBufferView = types.isArrayBufferView(value);
    return isBuffer || isArrayBuffer || isArrayBufferView;
}

function getQueryString(params: Record<string, any>): string {
    const qs: string[] = [];
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(value => {
                    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
                });
            } else {
                qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
            }
        }
    });
    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }
    return '';
}

async function getUrl(options: ApiRequestOptions): Promise<string> {
    const base = await resolve(options, options.baseUrl);
    const path = options.path.replace(/[:]/g, '_');
    const url = `${base}${path}`;

    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
}

function getFormData(params: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (isDefined(value)) {
            formData.append(key, value);
        }
    });
    return formData;
}

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

async function resolve<T>(options: ApiRequestOptions, resolver?: T | Resolver<T>): Promise<T | undefined> {
    if (typeof resolver === 'function') {
        return (resolver as Resolver<T>)(options);
    }
    return resolver;
}

async function getHeaders(options: ApiRequestOptions): Promise<Headers> {
    const token = await resolve(options, options.token);
    const username = await resolve(options, options.username);
    const password = await resolve(options, options.password);
    const defaultHeaders = await resolve(options, options.defaultHeaders);

    const headers = new Headers({
        Accept: 'application/json',
        ...defaultHeaders,
        ...options.headers,
    });

    if (isStringWithValue(token)) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    if (isStringWithValue(username) && isStringWithValue(password)) {
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        headers.append('Authorization', `Basic ${credentials}`);
    }

    if (options.body) {
        if (options.mediaType) {
            headers.append('Content-Type', options.mediaType);
        } else if (isBinary(options.body)) {
            headers.append('Content-Type', 'application/octet-stream');
        } else if (isString(options.body)) {
            headers.append('Content-Type', 'text/plain');
        } else {
            headers.append('Content-Type', 'application/json');
        }
    }
    return headers;
}

function getRequestBody(options: ApiRequestOptions): BodyInit | undefined {
    if (options.formData) {
        return getFormData(options.formData);
    }
    if (options.body) {
        if (options.mediaType?.includes('/json')) {
            return JSON.stringify(options.body)
        } else if (isString(options.body) || isBinary(options.body)) {
            return options.body;
        } else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
}

async function sendRequest(options: ApiRequestOptions, url: string): Promise<Response> {
    const request: RequestInit = {
        method: options.method,
        headers: await getHeaders(options),
        body: getRequestBody(options),
    };

    try {
        return await fetch(url, request);
    } catch(e) {
        throw createError('failed to fetch: ' + e, options);
    }
}

function getResponseHeader(response: Response, responseHeader?: string): string | null {
    if (responseHeader) {
        const content = response.headers.get(responseHeader);
        if (isString(content)) {
            return content;
        }
    }
    return null;
}

async function getResponseBody(options: ApiRequestOptions, response: Response): Promise<any> {
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
        const isJSON = contentType.toLowerCase().startsWith('application/json');
        if (isJSON) {
            try {
                return await response.json();
            } catch (e) {
                throw createError('failed to parse JSON response: ' + e, options);
            }
        } else {
            try {
                return await response.text();
            } catch (e) {
                throw createError('failed to parse text response: ' + e, options);
            }
        }
    }
    return null;
}

function catchErrors(options: ApiRequestOptions, result: ApiResult): void {
    const errors: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        ...options.errors,
    }

    const error = errors[result.status];
    if (error) {
        throw createError(error, options);
    }

    if (!result.ok) {
        throw createError('unhandled service error', options);
    }
}

function createError(message: string, options: ApiRequestOptions): Error {
    if (options.errorFactory) {
        return options.errorFactory(message, options);
    } else {
        return new Error(message);
    }
}

/**
 * Request using node-fetch client
 * @param options The request options from the the service
 * @returns ApiResult
 */
export async function request(options: ApiRequestOptions): Promise<ApiResult> {
    const url = await getUrl(options);
    const response = await sendRequest(options, url);
    const responseBody = await getResponseBody(options, response);
    const responseHeader = getResponseHeader(response, options.responseHeader);

    const result: ApiResult = {
        url,
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        body: responseHeader || responseBody,
    };

    await (options.catchErrors ?? catchErrors)(options, result);
    return result;
}