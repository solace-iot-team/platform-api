/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventManagementAgentRegionsService {

    /**
     * (Beta) Retrieves a list of event management agent regions.
     * Use this API to retrieve a list of event management agent regions.
     * @param pageSize The number of event management agent regions to get per page.
     * @param pageNumber The page number to get.
     * @returns any The list of event management agent regions and the accompanying metadata.
     */
    getEventManagementAgentRegions(
        pageSize: number,
        pageNumber: number,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a list of event management agent regions.
     * Use this API to retrieve a list of event management agent regions.
     * @param pageSize The number of event management agent regions to get per page.
     * @param pageNumber The page number to get.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventManagementAgentRegionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
    ): ApiRequestOptions;

}