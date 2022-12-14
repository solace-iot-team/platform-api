/* eslint-disable */

import type { EventManagementAgentRegionsService } from './EventManagementAgentRegionsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventManagementAgentRegionsServiceDefault implements EventManagementAgentRegionsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEventManagementAgentRegions(
        pageSize: number = 20,
        pageNumber: number = 1,
    ): Promise<any> {
        const options = this.getEventManagementAgentRegionsApiRequestOptions(
            pageSize,
            pageNumber,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventManagementAgentRegionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventManagementAgentRegions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
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