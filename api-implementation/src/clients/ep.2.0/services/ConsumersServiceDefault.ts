/* eslint-disable */

import type { Consumer } from '../models/Consumer';
import type { ConsumersService } from './ConsumersService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ConsumersServiceDefault implements ConsumersService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getConsumers(
        pageSize: number = 20,
        pageNumber: number = 1,
        applicationVersionIds?: Array<string>,
        ids?: Array<string>,
    ): Promise<any> {
        const options = this.getConsumersApiRequestOptions(
            pageSize,
            pageNumber,
            applicationVersionIds,
            ids,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConsumersApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        applicationVersionIds?: Array<string>,
        ids?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/consumers`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'applicationVersionIds': applicationVersionIds,
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

    public async createConsumer(
        requestBody: Consumer,
    ): Promise<any> {
        const options = this.createConsumerApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createConsumerApiRequestOptions(
        requestBody: Consumer,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/consumers`,
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

    public async getConsumer(
        id: string,
    ): Promise<any> {
        const options = this.getConsumerApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/consumers/${id}`,
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

    public async deleteConsumer(
        id: string,
    ): Promise<void> {
        const options = this.deleteConsumerApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/consumers/${id}`,
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

    public async updateConsumer(
        id: string,
        requestBody: Consumer,
    ): Promise<any> {
        const options = this.updateConsumerApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateConsumerApiRequestOptions(
        id: string,
        requestBody: Consumer,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/consumers/${id}`,
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