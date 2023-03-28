/* eslint-disable */

import type { ConfigurationsService } from './ConfigurationsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ConfigurationsServiceDefault implements ConfigurationsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getConfigurations(
        pageSize: number = 20,
        pageNumber: number = 1,
        messagingServiceIds?: Array<string>,
        ids?: Array<string>,
        configurationTypeIds?: Array<string>,
        entityTypes?: Array<string>,
        entityIds?: Array<string>,
        sort?: string,
    ): Promise<any> {
        const options = this.getConfigurationsApiRequestOptions(
            pageSize,
            pageNumber,
            messagingServiceIds,
            ids,
            configurationTypeIds,
            entityTypes,
            entityIds,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConfigurationsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        messagingServiceIds?: Array<string>,
        ids?: Array<string>,
        configurationTypeIds?: Array<string>,
        entityTypes?: Array<string>,
        entityIds?: Array<string>,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/configurations`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'messagingServiceIds': messagingServiceIds,
                'ids': ids,
                'configurationTypeIds': configurationTypeIds,
                'entityTypes': entityTypes,
                'entityIds': entityIds,
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

    public async getConfiguration(
        id: string,
    ): Promise<any> {
        const options = this.getConfigurationApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConfigurationApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/configurations/${id}`,
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