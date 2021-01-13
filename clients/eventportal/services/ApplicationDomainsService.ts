/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdsResponse } from '../models/IdsResponse';
import { request as __request } from '../core/request';

export class ApplicationDomainsService {

    /**
     * Retrieves an application domain object
     * Use this API to retrieve a single application domain by its ID.
     * @param id The ID of the application domain object.
     * @result any The application domain object.
     * @throws ApiError
     */
    public static async get(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applicationDomains/${id}`,
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
     * Deletes an application domain object
     * Use this API to delete an application domain. This action also deletes all applications, events, and schemas in the application domain. You cannot undo this operation.
     * @param id The ID of the application domain object.
     * @result any No content is returned.
     * @throws ApiError
     */
    public static async delete(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/v1/eventPortal/applicationDomains/${id}`,
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
     * Updates an application domain object
     * Use this API to update an application domain. You only need to specify the field that needs to be updated.
     * @param id The ID of the application domain object.
     * @param requestBody The application domain object.
     * @result any The updated application domain object.
     * @throws ApiError
     */
    public static async update(
        id: string,
        requestBody?: any,
    ): Promise<any> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/v1/eventPortal/applicationDomains/${id}`,
            body: requestBody,
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
     * Gets the application domain objects
     * Use this API to retrieve a list of application domains that match the given parameters.
     * @param pageSize The number of application domains to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name to be used to match the application domain.
     * @param ids Match only application domains with the given IDs separated by commas
     * @param topicDomain Match only application domains with the given topic domain.
     * @result any Retrieve a list of application domains and the accompanying metadata.
     * @throws ApiError
     */
    public static async list(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: string,
        topicDomain?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applicationDomains`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'ids': ids,
                'topicDomain': topicDomain,
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
        });
        return result.body;
    }

    /**
     * Creates an application domain object.
     * To help keep your event-driven architecture organized, use application domains to create namespaces for your applications, events and schemas.
     * @param requestBody Application domains have a name and topic domain.
     * @result any Created. The newly saved application domain object is returned in the response body.
     * @throws ApiError
     */
    public static async create(
        requestBody: any,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/applicationDomains`,
            body: requestBody,
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
     * Retrieves the owners of an application domain.
     * Use this API to retrieve all of the owners of an application domain. Owners are referenced by their user ID.
     * @param id The ID of the application domain to retrieve the owners.
     * @result IdsResponse An array of owners identified by their user ID.
     * @throws ApiError
     */
    public static async list1(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applicationDomains/${id}/owners`,
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
     * Updates the owners of an application domain
     * Use this API to update all of the owners of an application domain. Owners are referenced by their user ID.
     * @param id The ID of the application domain object to update.
     * @param requestBody A list of user IDs.
     * @result IdsResponse The updated application domain object.
     * @throws ApiError
     */
    public static async update1(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/applicationDomains/${id}/owners`,
            body: requestBody,
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