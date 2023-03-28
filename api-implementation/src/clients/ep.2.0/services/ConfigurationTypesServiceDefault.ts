/* eslint-disable */

import type { ConfigurationTypesService } from './ConfigurationTypesService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ConfigurationTypesServiceDefault implements ConfigurationTypesService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getConfigurationTypes(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        names?: Array<string>,
        associatedEntityTypes?: Array<string>,
        brokerType?: string,
        sort?: string,
    ): Promise<any> {
        const options = this.getConfigurationTypesApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
            names,
            associatedEntityTypes,
            brokerType,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConfigurationTypesApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        names?: Array<string>,
        associatedEntityTypes?: Array<string>,
        brokerType?: string,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/configurationTypes`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
                'names': names,
                'associatedEntityTypes': associatedEntityTypes,
                'brokerType': brokerType,
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

    public async getConfigurationType(
        id: string,
    ): Promise<any> {
        const options = this.getConfigurationTypeApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConfigurationTypeApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/configurationTypes/${id}`,
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