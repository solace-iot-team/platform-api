/* eslint-disable */

import type { TopicAddressEnumVersion } from '../models/TopicAddressEnumVersion';
import type { EnumsService } from './EnumsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EnumsServiceDefault implements EnumsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEnums(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        names?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): Promise<any> {
        const options = this.getEnumsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
            applicationDomainId,
            applicationDomainIds,
            names,
            shared,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        names?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enums`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
                'applicationDomainId': applicationDomainId,
                'applicationDomainIds': applicationDomainIds,
                'names': names,
                'shared': shared,
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

    public async createEnum(
        requestBody: any,
    ): Promise<any> {
        const options = this.createEnumApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEnumApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/enums`,
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

    public async getEnum(
        id: string,
    ): Promise<any> {
        const options = this.getEnumApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enums/${id}`,
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

    public async deleteEnum(
        id: string,
    ): Promise<void> {
        const options = this.deleteEnumApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/enums/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `If the enum did not exist.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateEnum(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEnumApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEnumApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/enums/${id}`,
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

    public async getEnumVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
    ): Promise<any> {
        const options = this.getEnumVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enumVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
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

    public async getEnumVersionsForEnum(
        enumId: string,
        pageNumber: number = 1,
        pageSize?: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
    ): Promise<any> {
        const options = this.getEnumVersionsForEnumApiRequestOptions(
            enumId,
            pageNumber,
            pageSize,
            ids,
            versions,
            displayName,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumVersionsForEnumApiRequestOptions(
        enumId: string,
        pageNumber: number = 1,
        pageSize?: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enums/${enumId}/versions`,
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'ids': ids,
                'versions': versions,
                'displayName': displayName,
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

    public async createEnumVersionForEnum(
        enumId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.createEnumVersionForEnumApiRequestOptions(
            enumId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEnumVersionForEnumApiRequestOptions(
        enumId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/enums/${enumId}/versions`,
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

    public async getEnumVersion(
        versionId: string,
    ): Promise<any> {
        const options = this.getEnumVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enumVersions/${versionId}`,
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

    public async getEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<any> {
        const options = this.getEnumVersionForEnumApiRequestOptions(
            enumId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/enums/${enumId}/versions/${id}`,
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

    public async deleteEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteEnumVersionForEnumApiRequestOptions(
            enumId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/enums/${enumId}/versions/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `If the enum version did not exist.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateEnumVersionForEnum(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any> {
        const options = this.updateEnumVersionForEnumApiRequestOptions(
            enumId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/enums/${enumId}/versions/${id}`,
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

    public async updateEnumVersionStateForEnum(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any> {
        const options = this.updateEnumVersionStateForEnumApiRequestOptions(
            enumId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEnumVersionStateForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/enums/${enumId}/versions/${id}/state`,
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