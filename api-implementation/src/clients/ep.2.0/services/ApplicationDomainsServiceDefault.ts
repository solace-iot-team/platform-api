/* eslint-disable */

import type { ApplicationDomainsService } from './ApplicationDomainsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ApplicationDomainsServiceDefault implements ApplicationDomainsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getApplicationDomains(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: Array<string>,
        include?: Array<string>,
    ): Promise<any> {
        const options = this.getApplicationDomainsApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            ids,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationDomainsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: Array<string>,
        include?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applicationDomains`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'ids': ids,
                'include': include,
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

    public async createApplicationDomain(
        requestBody: any,
    ): Promise<any> {
        const options = this.createApplicationDomainApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createApplicationDomainApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/applicationDomains`,
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

    public async getApplicationDomain(
        id: string,
        include?: Array<string>,
    ): Promise<any> {
        const options = this.getApplicationDomainApiRequestOptions(
            id,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationDomainApiRequestOptions(
        id: string,
        include?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applicationDomains/${id}`,
            query: {
                'include': include,
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

    public async deleteApplicationDomain(
        id: string,
    ): Promise<void> {
        const options = this.deleteApplicationDomainApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteApplicationDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/applicationDomains/${id}`,
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

    public async updateApplicationDomain(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateApplicationDomainApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationDomainApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applicationDomains/${id}`,
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