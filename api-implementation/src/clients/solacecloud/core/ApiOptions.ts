/* eslint-disable */
import type { ApiRequestOptions, Resolver, Headers, ErrorFactory } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';

/**
 * configuration object for the api
 */
export type ApiOptions = {
    /**
     * the base url of the api
     */
    baseUrl: string | Resolver<string>;

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
}