/* eslint-disable */

import type { MessagingServiceScanResponse } from '../models/MessagingServiceScanResponse';
import type { MessagingServiceScansResponse } from '../models/MessagingServiceScansResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface MessagingServiceScansService {

    /**
     * (Beta) Retrieves a list of messaging service scans
     * Use this API to retrieve a list of messaging service scans that match the given parameters.
     * @param pageSize The number of messaging service scans to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the messaging service scans.
     * @param messagingServiceId Match only messaging service scans in the given messagingService
     * @param eventMeshId Match only messaging service scans in the given eventMeshId
     * @returns MessagingServiceScansResponse The list of messaging service scans and the accompanying metadata.
     */
    getMessagingServiceScans(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        messagingServiceId?: string,
        eventMeshId?: string,
    ): Promise<MessagingServiceScansResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a list of messaging service scans
     * Use this API to retrieve a list of messaging service scans that match the given parameters.
     * @param pageSize The number of messaging service scans to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the messaging service scans.
     * @param messagingServiceId Match only messaging service scans in the given messagingService
     * @param eventMeshId Match only messaging service scans in the given eventMeshId
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceScansApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        messagingServiceId?: string,
        eventMeshId?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves a messaging service scan object
     * Use this API to retrieve a single messaging service scan by its ID.
     * @param id The ID of the messaging service scan object.
     * @returns MessagingServiceScanResponse The messaging service scan object.
     */
    getMessagingServiceScan(
        id: string,
    ): Promise<MessagingServiceScanResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a messaging service scan object
     * Use this API to retrieve a single messaging service scan by its ID.
     * @param id The ID of the messaging service scan object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceScanApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Deletes a messaging service scan object
     * Use this API to delete a messaging service scan.
     * @param id The ID of the messaging service scan object.
     * @returns void
     */
    deleteMessagingServiceScan(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Deletes a messaging service scan object
     * Use this API to delete a messaging service scan.
     * @param id The ID of the messaging service scan object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteMessagingServiceScanApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}