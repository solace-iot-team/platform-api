/* eslint-disable */

import type { SchemasService } from './SchemasService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class SchemasServiceDefault implements SchemasService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getSchemas(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getSchemasApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            shared,
            applicationDomainId,
            applicationDomainIds,
            ids,
            sort,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemasApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemas`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'shared': shared,
                'applicationDomainId': applicationDomainId,
                'applicationDomainIds': applicationDomainIds,
                'ids': ids,
                'sort': sort,
                'customAttributes': customAttributes,
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

    public async createSchema(
        requestBody: any,
    ): Promise<any> {
        const options = this.createSchemaApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createSchemaApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/schemas`,
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

    public async getSchema(
        id: string,
    ): Promise<any> {
        const options = this.getSchemaApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemaApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemas/${id}`,
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

    public async deleteSchema(
        id: string,
    ): Promise<void> {
        const options = this.deleteSchemaApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteSchemaApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/schemas/${id}`,
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

    public async updateSchema(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateSchemaApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateSchemaApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/schemas/${id}`,
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

    public async getSchemaVersionsForSchema(
        schemaId: string,
        pageNumber: number = 1,
        pageSize: number = 20,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getSchemaVersionsForSchemaApiRequestOptions(
            schemaId,
            pageNumber,
            pageSize,
            versions,
            displayName,
            ids,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemaVersionsForSchemaApiRequestOptions(
        schemaId: string,
        pageNumber: number = 1,
        pageSize: number = 20,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemas/${schemaId}/versions`,
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'versions': versions,
                'displayName': displayName,
                'ids': ids,
                'customAttributes': customAttributes,
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

    public async createSchemaVersionForSchema(
        schemaId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.createSchemaVersionForSchemaApiRequestOptions(
            schemaId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/schemas/${schemaId}/versions`,
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

    public async getSchemaVersionForSchema(
        schemaId: string,
        id: string,
    ): Promise<any> {
        const options = this.getSchemaVersionForSchemaApiRequestOptions(
            schemaId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemas/${schemaId}/versions/${id}`,
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

    public async deleteSchemaVersionForSchema(
        schemaId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteSchemaVersionForSchemaApiRequestOptions(
            schemaId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/schemas/${schemaId}/versions/${id}`,
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

    public async updateSchemaVersionForSchema(
        schemaId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateSchemaVersionForSchemaApiRequestOptions(
            schemaId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/schemas/${schemaId}/versions/${id}`,
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

    public async updateSchemaVersionStateForSchema(
        schemaId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateSchemaVersionStateForSchemaApiRequestOptions(
            schemaId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateSchemaVersionStateForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/schemas/${schemaId}/versions/${id}/state`,
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

    public async getSchemaVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        schemaIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getSchemaVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            schemaIds,
            ids,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemaVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        schemaIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemaVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'schemaIds': schemaIds,
                'ids': ids,
                'customAttributes': customAttributes,
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

    public async createSchemaVersion(
        requestBody: any,
    ): Promise<any> {
        const options = this.createSchemaVersionApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createSchemaVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/schemaVersions`,
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

    public async deleteSchemaVersion(
        id: string,
    ): Promise<void> {
        const options = this.deleteSchemaVersionApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteSchemaVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/schemaVersions/${id}`,
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

    public async updateSchemaVersion(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateSchemaVersionApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateSchemaVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/schemaVersions/${id}`,
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

    public async getSchemaVersion(
        versionId: string,
    ): Promise<any> {
        const options = this.getSchemaVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getSchemaVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/schemaVersions/${versionId}`,
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

    public async updateSchemaVersionState(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateSchemaVersionStateApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateSchemaVersionStateApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/schemaVersions/${id}/state`,
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

}