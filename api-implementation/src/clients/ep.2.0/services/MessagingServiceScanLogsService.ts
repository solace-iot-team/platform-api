/* eslint-disable */

import type { MessagingServiceScanLogListResponse } from '../models/MessagingServiceScanLogListResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface MessagingServiceScanLogsService {

    /**
     * (Beta) Get a list of messaging service scan logs
     * Use this API to get a list of messaging service scan logs that match the given parameters.
     * @param scanId The ID of the messaging service scan we want logs for.
     * @param pageSize The number of messaging service scan logs to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns MessagingServiceScanLogListResponse The list of messaging service scan logs and the accompanying metadata.
     */
    getMessagingServiceScansLogs(
        scanId: string,
        pageSize: number,
        pageNumber: number,
        sort?: string,
    ): Promise<MessagingServiceScanLogListResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a list of messaging service scan logs
     * Use this API to get a list of messaging service scan logs that match the given parameters.
     * @param scanId The ID of the messaging service scan we want logs for.
     * @param pageSize The number of messaging service scan logs to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceScansLogsApiRequestOptions(
        scanId: string,
        pageSize: number,
        pageNumber: number,
        sort?: string,
    ): ApiRequestOptions;

}