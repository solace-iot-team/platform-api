/* eslint-disable */

import type { CustomAttributeDefinition } from '../models/CustomAttributeDefinition';
import type { CustomAttributeDefinitionsService } from './CustomAttributeDefinitionsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class CustomAttributeDefinitionsServiceDefault implements CustomAttributeDefinitionsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getCustomAttributeDefinitions(
        pageSize: number = 20,
        pageNumber: number = 1,
        associatedEntityTypes?: Array<string>,
    ): Promise<any> {
        const options = this.getCustomAttributeDefinitionsApiRequestOptions(
            pageSize,
            pageNumber,
            associatedEntityTypes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getCustomAttributeDefinitionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        associatedEntityTypes?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/customAttributeDefinitions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'associatedEntityTypes': associatedEntityTypes,
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

    public async createCustomAttributeDefinition(
        requestBody: any,
    ): Promise<any> {
        const options = this.createCustomAttributeDefinitionApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createCustomAttributeDefinitionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/customAttributeDefinitions`,
            body: requestBody,
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

    public async getCustomAttributeDefinition(
        id: string,
    ): Promise<any> {
        const options = this.getCustomAttributeDefinitionApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/customAttributeDefinitions/${id}`,
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

    public async deleteCustomAttributeDefinition(
        id: string,
    ): Promise<void> {
        const options = this.deleteCustomAttributeDefinitionApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/customAttributeDefinitions/${id}`,
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

    public async updateCustomAttributeDefinition(
        id: string,
        requestBody?: CustomAttributeDefinition,
    ): Promise<any> {
        const options = this.updateCustomAttributeDefinitionApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateCustomAttributeDefinitionApiRequestOptions(
        id: string,
        requestBody?: CustomAttributeDefinition,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/customAttributeDefinitions/${id}`,
            body: requestBody,
            mediaType: 'application/json',
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