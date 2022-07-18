/* eslint-disable */

import type { eventApiVersion } from '../models/eventApiVersion';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApIsService {

    /**
     * @param eventApiId
     * @param id
     * @returns eventApiVersion OK
     */
    getEventApiVersionInfo(
        eventApiId: string,
        id: string,
    ): Promise<eventApiVersion>;

    /**
     * **used to get the request options without making a http request**
     * @param eventApiId
     * @param id
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionInfoApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @param eventApiId
     * @param id
     * @param version
     * @param format
     * @returns any OK
     */
    generateAsyncApi(
        eventApiId: string,
        id: string,
        version: string,
        format: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * @param eventApiId
     * @param id
     * @param version
     * @param format
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    generateAsyncApiApiRequestOptions(
        eventApiId: string,
        id: string,
        version: string,
        format: string,
    ): ApiRequestOptions;

}