/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventMeshesService {

    /**
     * Gets the event mesh objects
     * Use this API to retrieve a list of event meshes that match the given parameters.
     * @param pageSize The number of event meshes to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event mesh to match on.
     * @param environmentId Match only event meshes in the given environment
     * @returns any The list of event meshes and the accompanying metadata.
     */
    getEventMeshes(
        pageSize: number,
        pageNumber: number,
        name?: string,
        environmentId?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the event mesh objects
     * Use this API to retrieve a list of event meshes that match the given parameters.
     * @param pageSize The number of event meshes to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event mesh to match on.
     * @param environmentId Match only event meshes in the given environment
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventMeshesApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        environmentId?: string,
    ): ApiRequestOptions;

    /**
     * Creates an event mesh object
     * Creates an event mesh object.
     * @param requestBody Event mesh.
     * @returns any Created an event mesh. The newly saved event object is returned in the response body.
     */
    createEventMesh(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event mesh object
     * Creates an event mesh object.
     * @param requestBody Event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventMeshApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an event mesh object
     * Retrieves a single event mesh by its ID.
     * @param id The ID of the event mesh object.
     * @returns any The event mesh object.
     */
    getEventMesh(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event mesh object
     * Retrieves a single event mesh by its ID.
     * @param id The ID of the event mesh object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventMeshApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event mesh object
     * Use this API to delete an event mesh.
     * @param id The ID of the event mesh object.
     * @returns void
     */
    deleteEventMesh(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event mesh object
     * Use this API to delete an event mesh.
     * @param id The ID of the event mesh object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventMeshApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event mesh object
     * Use this API to update an event mesh. You only need to specify the fields that need to be updated.
     * @param id The ID of the event mesh object to update.
     * @param requestBody The event mesh object.
     * @returns any The updated event mesh object.
     */
    updateEventMesh(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an event mesh object
     * Use this API to update an event mesh. You only need to specify the fields that need to be updated.
     * @param id The ID of the event mesh object to update.
     * @param requestBody The event mesh object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventMeshApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}