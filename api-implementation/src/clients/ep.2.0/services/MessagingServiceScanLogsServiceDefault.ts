/* eslint-disable */

import type { MessagingServiceScanLogListResponse } from '../models/MessagingServiceScanLogListResponse';
import type { MessagingServiceScanLogsService } from './MessagingServiceScanLogsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class MessagingServiceScanLogsServiceDefault implements MessagingServiceScanLogsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getMessagingServiceScansLogs(
        scanId: string,
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
    ): Promise<MessagingServiceScanLogListResponse> {
        const options = this.getMessagingServiceScansLogsApiRequestOptions(
            scanId,
            pageSize,
            pageNumber,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceScansLogsApiRequestOptions(
        scanId: string,
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServiceScans/${scanId}/logs`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
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

}