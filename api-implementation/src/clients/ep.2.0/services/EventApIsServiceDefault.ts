/* eslint-disable */

import type { eventApiVersion } from '../models/eventApiVersion';
import type { EventApIsService } from './EventApIsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventApIsServiceDefault implements EventApIsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEventApiVersionInfo(
        eventApiId: string,
        id: string,
    ): Promise<eventApiVersion> {
        const options = this.getEventApiVersionInfoApiRequestOptions(
            eventApiId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionInfoApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}`,
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

    public async generateAsyncApi(
        eventApiId: string,
        id: string,
        version: string,
        format: string,
    ): Promise<any> {
        const options = this.generateAsyncApiApiRequestOptions(
            eventApiId,
            id,
            version,
            format,
        );
        const result = await __request(options);
        return result.body;
    }

    public generateAsyncApiApiRequestOptions(
        eventApiId: string,
        id: string,
        version: string,
        format: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}/asyncApi`,
            query: {
                'version': version,
                'format': format,
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