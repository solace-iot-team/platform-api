/* eslint-disable */

import type { MessagingServiceScanDataListResponse } from '../models/MessagingServiceScanDataListResponse';
import type { MessagingServiceScanDataResponse } from '../models/MessagingServiceScanDataResponse';
import type { MessagingServiceScanDataService } from './MessagingServiceScanDataService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class MessagingServiceScanDataServiceDefault implements MessagingServiceScanDataService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getMessagingServiceScansData(
        scanId: string,
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        collectionTypes?: Array<string>,
    ): Promise<MessagingServiceScanDataListResponse> {
        const options = this.getMessagingServiceScansDataApiRequestOptions(
            scanId,
            pageSize,
            pageNumber,
            sort,
            ids,
            collectionTypes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceScansDataApiRequestOptions(
        scanId: string,
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        collectionTypes?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServiceScans/${scanId}/dataCollection`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
                'ids': ids,
                'collectionTypes': collectionTypes,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getMessagingServiceScanData(
        scanId: string,
        id: string,
    ): Promise<MessagingServiceScanDataResponse> {
        const options = this.getMessagingServiceScanDataApiRequestOptions(
            scanId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceScanDataApiRequestOptions(
        scanId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServiceScans/${scanId}/dataCollection/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

}