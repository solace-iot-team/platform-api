/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceResponse } from '../models/ServiceResponse';
import type { ServicesResponse } from '../models/ServicesResponse';
import { request as __request } from '../core/request';

export class ServicesService {

    /**
     * @result ServicesResponse list of services
     * @throws ApiError
     */
    public static async listServices(): Promise<ServicesResponse> {
        const result = await __request({
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
        });
        return result.body;
    }

    /**
     * @param serviceId the id of a cloud service
     * @result ServiceResponse service
     * @throws ApiError
     */
    public static async getService(
        serviceId: string,
    ): Promise<ServiceResponse> {
        const result = await __request({
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
        });
        return result.body;
    }

}