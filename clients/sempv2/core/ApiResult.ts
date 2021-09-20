/* eslint-disable */

/**
 * a result from the api
 */
export type ApiResult = {
    /**
     * the url that was called
     */
    readonly url: string;

    /**
     * whether the status was considered OK
     */
    readonly ok: boolean;

    /**
     * the status code of the response
     */
    readonly status: number;

    /**
     * the status text
     */
    readonly statusText: string;

    /**
     * the body of the response if any
     */
    readonly body: any;
}