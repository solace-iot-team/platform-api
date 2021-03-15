/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdsResponse } from '../models/IdsResponse';
import { request as __request } from '../core/request';

export class ApplicationsService {

    /**
     * Retrieves an application object
     * Use this API to retrieve a single application by its ID.
     * @param id The ID of the application object.
     * @returns any The application object.
     * @throws ApiError
     */
    public static async get1(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applications/${id}`,
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
     * Deletes an application object
     * Use this API to delete an application. If the application never existed or is already deleted, the operation will still be successful.
     * @param id The ID of the Schema application
     * @returns any No content is returned.
     * @throws ApiError
     */
    public static async delete1(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/v1/eventPortal/applications/${id}`,
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
     * Updates an application object.
     * Use this API to update an application. You only need to specify the field that needs to be updated.
     * @param id The ID of the application object to update.
     * @param requestBody The application object.
     * @returns any The updated application object.
     * @throws ApiError
     */
    public static async update2(
        id: string,
        requestBody?: any,
    ): Promise<any> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/v1/eventPortal/applications/${id}`,
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
     * Gets the application objects
     * Use this API to retrieve a list of applications that match the given parameters.
     * @param pageSize The number of applications to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the application to match on.
     * @param applicationDomainId Match only applications in the given application domain.
     * @param ids Match only applications with the given IDs separated by commas.
     * @param applicationClass Match only applications with the given application class.
     * @returns any Retrieve a list of applications and the accompanying metadata.
     * @throws ApiError
     */
    public static async list2(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        applicationDomainId?: string,
        ids?: string,
        applicationClass?: 'unspecified' | 'kafka_connector' | 'solace_connector' | 'kafka_application',
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applications`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'applicationDomainId': applicationDomainId,
                'ids': ids,
                'applicationClass': applicationClass,
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
     * Creates an application object
     * To model your event-driven architecture, applications are a fundamental building block for modelling the producers and consumers of events. Use this API to create applications and model the events they produce and consume.
     * @param requestBody Applications have a name and live within an application domain. Events can be added to the application as produced or consumed.
     * @returns any Created. Returns the newly saved application object in the response body.
     * @throws ApiError
     */
    public static async create1(
        requestBody: any,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/applications`,
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
     * Retrieves the tags of an application
     * Use this API to retrieve all of the tags of an application. Tags are referenced by their tag ID.
     * @param id The ID of the application to retrieve the tags.
     * @returns IdsResponse An array of tags identified by their tag ID.
     * @throws ApiError
     */
    public static async list3(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applications/${id}/tags`,
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
     * Updates the tags of an application
     * Use this API to update all of the tags of an application. Tags are referenced by their tag ID.
     * @param id The ID of the application object to update.
     * @param requestBody A list of tag IDs
     * @returns IdsResponse An array of the updated tags identified by their tag ID
     * @throws ApiError
     */
    public static async update3(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/applications/${id}/tags`,
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
     * Retrieves the owners of an application
     * Use this API to retrieve all of the owners of an application. Owners are referenced by their user ID.
     * @param id The ID of the application to retrieve the owners.
     * @returns IdsResponse An array of owners identified by their user ID.
     * @throws ApiError
     */
    public static async list4(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/applications/${id}/owners`,
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
     * Updates the owners of an application
     * Use this API to update all the owners of an application. Owners are referenced by their user ID.
     * @param id The ID of the application object to update.
     * @param requestBody A list of user IDs
     * @returns IdsResponse An array of updated owners identified by their user ID
     * @throws ApiError
     */
    public static async update4(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/applications/${id}/owners`,
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