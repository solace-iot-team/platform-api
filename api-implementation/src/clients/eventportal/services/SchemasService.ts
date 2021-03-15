/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdsResponse } from '../models/IdsResponse';
import { request as __request } from '../core/request';

export class SchemasService {

    /**
     * Gets the schema objects
     * Use this API to retrieve a list of schemas that match the given parameters.
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the schema to match on.
     * @param shared Match only with shared or unshared schemas.
     * @param applicationDomainId Match only schemas in the given application domain.
     * @param ids Match only schemas with the given IDs separated by commas
     * @returns any Retrieve a list of schemas and the accompanying metadata.
     * @throws ApiError
     */
    public static async list8(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        ids?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/schemas`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'shared': shared,
                'applicationDomainId': applicationDomainId,
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
     * Creates a schema object.
     * To model your event-driven architecture, schemas are a fundamental building block for modelling the payloads of the events flowing through your system. Use this API to create schemas that can later be referenced by events.
     * @param requestBody The schema requires a name, an application domain, and a content type (one of XML, JSON, Binary, or Text). For JSON and XML based schemas, the content field must be populated with a valid JSON schema or XML schema (XSD or DTD). A schema should be marked as shared when it is allowed to be used by other application domains. To avoid sharing a schema with other application domains, do not share it. The description field should be populated to describe to other users what the schema is and how it should be used (much like this description you're reading is describing the schema of this API).
     * @returns any Created. The newly saved schema object is returned in the response body.
     * @throws ApiError
     */
    public static async add1(
        requestBody: any,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/schemas`,
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
     * Retrieves a schema object
     * Use this API to retrieve a single schema by its ID.
     * @param id The ID of the schema object.
     * @returns any The schema object.
     * @throws ApiError
     */
    public static async get3(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/schemas/${id}`,
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
     * Deletes a schema object
     * Use this API to delete a schema. The schema must not be in use by any events else it cannot be deleted.
     * @param id The ID of the schema object.
     * @returns any No content is returned.
     * @throws ApiError
     */
    public static async delete3(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/v1/eventPortal/schemas/${id}`,
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
     * Updates a schema object
     * Use this API to update a schema. You only need to specify the field that needs to be updated.
     * @param id The ID of the schema object to update.
     * @param requestBody The schema object.
     * @returns any The updated schema object.
     * @throws ApiError
     */
    public static async update8(
        id: string,
        requestBody?: any,
    ): Promise<any> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/v1/eventPortal/schemas/${id}`,
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
     * Retrieves the tags of a schema
     * Use this API to retrieve all of the tags of a schema. Tags are referenced by their tag ID.
     * @param id The ID of the schema to retrieve the tags.
     * @returns IdsResponse An array of tags identified by their tag ID.
     * @throws ApiError
     */
    public static async list9(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/schemas/${id}/tags`,
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
     * Updates the tags of a schema.
     * Use this API to update all of the tags of a schema. Tags are referenced by their tag ID.
     * @param id The ID of the schema object to update.
     * @param requestBody A list of tag IDs
     * @returns IdsResponse An array of the updated tags identified by their tag ID.
     * @throws ApiError
     */
    public static async update9(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/schemas/${id}/tags`,
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
     * Retrieves the owners of a schema
     * Use this API to retrieve all of the owners of a schema. Owners are referenced by their user ID.
     * @param id The ID of the schema to retrieve the owners.
     * @returns IdsResponse An array of owners identified by their user ID.
     * @throws ApiError
     */
    public static async list10(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/schemas/${id}/owners`,
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
     * Updates the owners of a schema
     * Use this API to update all of the owners of schema. Owners are referenced by their user ID.
     * @param id The ID of the schema object to update.
     * @param requestBody A list of user IDs
     * @returns IdsResponse An array of updated owners identified by their user ID.
     * @throws ApiError
     */
    public static async update10(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/schemas/${id}/owners`,
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