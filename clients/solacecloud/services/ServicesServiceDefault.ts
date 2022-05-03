/* eslint-disable */

import type { ClientProfileRequest } from '../models/ClientProfileRequest';
import type { CloudRequestStatusResponse } from '../models/CloudRequestStatusResponse';
import type { ServiceResponse } from '../models/ServiceResponse';
import type { ServicesResponse } from '../models/ServicesResponse';
import type { ServicesService } from './ServicesService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ServicesServiceDefault implements ServicesService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async listServices(): Promise<ServicesResponse> {
        const options = this.listServicesApiRequestOptions(
        );
        const result = await __request(options);
        return result.body;
    }

    public listServicesApiRequestOptions(): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/services`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getService(
        serviceId: string,
    ): Promise<ServiceResponse> {
        const options = this.getServiceApiRequestOptions(
            serviceId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getServiceApiRequestOptions(
        serviceId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/services/${serviceId}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async sendClientProfileRequest(
        serviceId: string,
        requestBody?: ClientProfileRequest,
    ): Promise<CloudRequestStatusResponse> {
        const options = this.sendClientProfileRequestApiRequestOptions(
            serviceId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public sendClientProfileRequestApiRequestOptions(
        serviceId: string,
        requestBody?: ClientProfileRequest,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/services/${serviceId}/requests/clientProfileRequests`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async trackCloudRequestStatus(
        serviceId: string,
        requestId: string,
        withProgress: boolean = true,
    ): Promise<CloudRequestStatusResponse> {
        const options = this.trackCloudRequestStatusApiRequestOptions(
            serviceId,
            requestId,
            withProgress,
        );
        const result = await __request(options);
        return result.body;
    }

    public trackCloudRequestStatusApiRequestOptions(
        serviceId: string,
        requestId: string,
        withProgress: boolean = true,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/services/${serviceId}/requests/${requestId}`,
            query: {
                'withProgress': withProgress,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

}