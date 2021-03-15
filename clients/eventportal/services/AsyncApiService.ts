/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenerateAsyncAPIRequest } from '../models/GenerateAsyncAPIRequest';
import { request as __request } from '../core/request';

export class AsyncApiService {

    /**
     * Generates an AsyncApi document from an event portal application
     * Use this API to generate the AsyncApi document of an application object.
     * @param id The ID of the application object
     * @param requestBody The version of the AsyncApi specification that you want to generate.
     * @returns string Returns the AsyncApi document as a string.
     * @throws ApiError
     */
    public static async generateAsyncApi(
        id: string,
        requestBody?: GenerateAsyncAPIRequest,
    ): Promise<string> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/applications/${id}/generateAsyncApiRequest`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

}