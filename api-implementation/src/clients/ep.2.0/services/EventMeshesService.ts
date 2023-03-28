/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventMeshesService {

    /**
     * Get a list of event meshes
     * Use this API to get a list of event meshes that match the given parameters.
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
     * Get a list of event meshes
     * Use this API to get a list of event meshes that match the given parameters.
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
     * Create an event mesh
     * Create an event mesh.
     * @param requestBody Event mesh.
     * @returns any Created an event mesh. The newly saved event mesh is returned in the response body.
     */
    createEventMesh(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create an event mesh
     * Create an event mesh.
     * @param requestBody Event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventMeshApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get an event mesh
     * Get a single event mesh by its ID.
     * @param id The ID of the event mesh.
     * @returns any The event mesh.
     */
    getEventMesh(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an event mesh
     * Get a single event mesh by its ID.
     * @param id The ID of the event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventMeshApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete an event mesh
     * Use this API to delete an event mesh.
     * @param id The ID of the event mesh.
     * @returns void
     */
    deleteEventMesh(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an event mesh
     * Use this API to delete an event mesh.
     * @param id The ID of the event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventMeshApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an event mesh
     * Use this API to update an event mesh. You only need to specify the fields that need to be updated.
     * @param id The ID of the event mesh to update.
     * @param requestBody The event mesh.
     * @returns any The updated event mesh.
     */
    updateEventMesh(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update an event mesh
     * Use this API to update an event mesh. You only need to specify the fields that need to be updated.
     * @param id The ID of the event mesh to update.
     * @param requestBody The event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventMeshApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}