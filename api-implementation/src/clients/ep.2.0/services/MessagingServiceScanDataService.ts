/* eslint-disable */

import type { MessagingServiceScanDataListResponse } from '../models/MessagingServiceScanDataListResponse';
import type { MessagingServiceScanDataResponse } from '../models/MessagingServiceScanDataResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface MessagingServiceScanDataService {

    /**
     * (Beta) Retrieves a list of messaging service scan data
     * Use this API to retrieve a list of messaging service scan data that match the given parameters.
     * @param scanId The ID of the messaging service scan we want data for.
     * @param pageSize The number of messaging service scan data to get per page.
     * @param pageNumber The page number to get.
     * @param sort The name of the field to sort on.
     * @param ids The IDs of the messaging service scan data.
     * @param collectionTypes Match only scan data whose dataCollectionType matches the given list.
     * @returns MessagingServiceScanDataListResponse The list of messaging service scan data and the accompanying metadata.
     */
    getMessagingServiceScansData(
        scanId: string,
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        collectionTypes?: Array<string>,
    ): Promise<MessagingServiceScanDataListResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a list of messaging service scan data
     * Use this API to retrieve a list of messaging service scan data that match the given parameters.
     * @param scanId The ID of the messaging service scan we want data for.
     * @param pageSize The number of messaging service scan data to get per page.
     * @param pageNumber The page number to get.
     * @param sort The name of the field to sort on.
     * @param ids The IDs of the messaging service scan data.
     * @param collectionTypes Match only scan data whose dataCollectionType matches the given list.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceScansDataApiRequestOptions(
        scanId: string,
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        collectionTypes?: Array<string>,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves a messaging service scan data object
     * Use this API to retrieve a single messaging service scan data by its ID.
     * @param scanId The ID of the messaging service scan object.
     * @param id The ID of the messaging service scan data object.
     * @returns MessagingServiceScanDataResponse The messaging service scan data object.
     */
    getMessagingServiceScanData(
        scanId: string,
        id: string,
    ): Promise<MessagingServiceScanDataResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a messaging service scan data object
     * Use this API to retrieve a single messaging service scan data by its ID.
     * @param scanId The ID of the messaging service scan object.
     * @param id The ID of the messaging service scan data object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceScanDataApiRequestOptions(
        scanId: string,
        id: string,
    ): ApiRequestOptions;

}