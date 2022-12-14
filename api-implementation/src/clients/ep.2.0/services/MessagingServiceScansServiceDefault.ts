/* eslint-disable */

import type { MessagingServiceScanResponse } from '../models/MessagingServiceScanResponse';
import type { MessagingServiceScansResponse } from '../models/MessagingServiceScansResponse';
import type { MessagingServiceScansService } from './MessagingServiceScansService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class MessagingServiceScansServiceDefault implements MessagingServiceScansService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getMessagingServiceScans(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        messagingServiceId?: string,
        eventMeshId?: string,
    ): Promise<MessagingServiceScansResponse> {
        const options = this.getMessagingServiceScansApiRequestOptions(
            pageSize,
            pageNumber,
            sort,
            ids,
            messagingServiceId,
            eventMeshId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceScansApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        messagingServiceId?: string,
        eventMeshId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServiceScans`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
                'ids': ids,
                'messagingServiceId': messagingServiceId,
                'eventMeshId': eventMeshId,
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

    public async getMessagingServiceScan(
        id: string,
    ): Promise<MessagingServiceScanResponse> {
        const options = this.getMessagingServiceScanApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceScanApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServiceScans/${id}`,
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

    public async deleteMessagingServiceScan(
        id: string,
    ): Promise<void> {
        const options = this.deleteMessagingServiceScanApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteMessagingServiceScanApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/messagingServiceScans/${id}`,
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