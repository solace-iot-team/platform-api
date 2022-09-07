/* eslint-disable */

import type { EnvironmentsService } from './EnvironmentsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EnvironmentsServiceDefault implements EnvironmentsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEnvironments(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        like?: string,
    ): Promise<any> {
        const options = this.getEnvironmentsApiRequestOptions(
            pageSize,
            pageNumber,
            sort,
            like,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnvironmentsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        like?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/environments`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
                'like': like,
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

    public async getEnvironment(
        id: string,
    ): Promise<any> {
        const options = this.getEnvironmentApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnvironmentApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/environments/${id}`,
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