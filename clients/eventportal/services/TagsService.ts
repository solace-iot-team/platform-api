/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class TagsService {

    /**
     * Gets the tags
     * Use this API to retrieve a list of tags that match the given parameters.
     * @param pageSize The number of tags to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the tag to match on.
     * @param ids Match only tags with the given IDs separated by commas.
     * @returns any Retrieve a list of tags and the accompanying metadata.
     * @throws ApiError
     */
    public static async list11(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/tags`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'ids': ids,
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
     * Creates a tag
     * Tags can be created to organize the objects of your event-driven architecture. Assign tags to objects to make them easier to group and find.
     * @param requestBody Tags require a name.
     * @returns any Created. The newly saved tag is returned in the response body.
     * @throws ApiError
     */
    public static async add2(
        requestBody: any,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/tags`,
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
     * Retrieves a tag
     * Use this API to retrieve a single tag by its ID.
     * @param id The ID of the tag.
     * @returns any The single tag.
     * @throws ApiError
     */
    public static async get4(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/tags/${id}`,
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
     * Updates a tag
     * Use this API to update a tag.
     * @param id The ID of the tag object to update.
     * @param requestBody The tag.
     * @returns any The updated tag.
     * @throws ApiError
     */
    public static async update11(
        id: string,
        requestBody?: any,
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/tags/${id}`,
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
     * Deletes a tag
     * Use this API to delete a tag. The tag must not be in use by any objects else it cannot be deleted.
     * @param id The ID of the tag.
     * @returns any No content is returned.
     * @throws ApiError
     */
    public static async delete4(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/v1/eventPortal/tags/${id}`,
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