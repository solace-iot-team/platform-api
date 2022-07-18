/* eslint-disable */
import type { ApiResult } from './ApiResult';

/**
 * can be used to resolve to a value when called
 */
export type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

/**
 * represents headers to send in a request
 */
export type Headers = Record<string, string>;

/**
 * a factory for creating error instances
 */
export type ErrorFactory = (message: string, options: ApiRequestOptions) => Error;

/**
 * options for a single api request
 */
export type ApiRequestOptions = {
    /**
     * the base url of the api
     */
    baseUrl: string;

    /**
     * optional version of the api
     */
    version?: string;

    /**
     * whether to include credentials on the request, for example this sets `credentials = 'include'` on the request
     * when using the fetch implementation
     */
    withCredentials?: boolean;

    /**
     * the token to send in the request using the `Authentication` header
     */
    token?: string | Resolver<string>;

    /**
     * the username to authenticate with when using basic auth
     */
    username?: string | Resolver<string>;

    /**
     * the password to authenticate with when using basic auth
     */
    password?: string | Resolver<string>;

    /**
     * any headers to add to the request
     */
    defaultHeaders?: Headers | Resolver<Headers>;

    /**
     * an optional error factory for producing error instances,
     * if not provided a regular `Error` instance will be created
     */
    errorFactory?: ErrorFactory;

    /**
     * optionally post process the response to catch any specific errors, this can be useful if a more complex
     * error handling approach is used on the api e.g. json responses representing an error
     */
    catchErrors?: (options: ApiRequestOptions, result: ApiResult) => void | (Promise<void>);

    /**
     * the http method to use
     */
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';

    /**
     * the api route
     */
    readonly path: string;

    /**
     * optional cookies to set on the request
     */
    readonly cookies?: Record<string, any>;

    /**
     * optional headers to set on the request
     */
    readonly headers?: Record<string, any>;

    /**
     * optional query parameters to set on the request
     */
    readonly query?: Record<string, any>;

    /**
     * optional form data to send in the request, should not be used if using `body`
     */
    readonly formData?: Record<string, any>;

    /**
     * optional body to serialise into the request, should not be used if using `formData`.
     * this can be a JSON object, a raw string or blob
     */
    readonly body?: any;

    /**
     * optional media type to specify on the request, if not specified then we will try to work it out
     */
    readonly mediaType?: string;

    /**
     * optional response header to select from the response and return as the result instead of the body
     */
    readonly responseHeader?: string;

    /**
     * optional http status codes to handle with the description of the error
     */
    readonly errors?: Record<number, string>;
}