/* eslint-disable */

import type { CustomAttributeDefinition } from '../models/CustomAttributeDefinition';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface CustomAttributeDefinitionsService {

    /**
     * Gets the custom attribute definition objects
     * Use this API to retrieve a list of custom attributes that match the given parameters.
     * @param pageSize The number of custom attribute definitions to get per page.
     * @param pageNumber The page number to get.
     * @param associatedEntityTypes Match only custom attribute definitions with the given associated entity type names separated by commas.
     * @returns any Retrieve a list of custom attribute definitions and the accompanying metadata.
     */
    getCustomAttributeDefinitions(
        pageSize: number,
        pageNumber: number,
        associatedEntityTypes?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the custom attribute definition objects
     * Use this API to retrieve a list of custom attributes that match the given parameters.
     * @param pageSize The number of custom attribute definitions to get per page.
     * @param pageNumber The page number to get.
     * @param associatedEntityTypes Match only custom attribute definitions with the given associated entity type names separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getCustomAttributeDefinitionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        associatedEntityTypes?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Creates a custom attribute definition object
     * Use this API to create a custom attribute definition.
     * @param requestBody The custom attribute object.
     * @returns any Created a custom attribute definition. Returns the newly saved custom attribute definition object in the response body.
     */
    createCustomAttributeDefinition(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a custom attribute definition object
     * Use this API to create a custom attribute definition.
     * @param requestBody The custom attribute object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createCustomAttributeDefinitionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves a custom attribute definition object
     * Use this API to retrieve a single custom attribute by its ID.
     * @param id The ID of the custom attribute object.
     * @returns any The custom attribute definition object.
     */
    getCustomAttributeDefinition(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a custom attribute definition object
     * Use this API to retrieve a single custom attribute by its ID.
     * @param id The ID of the custom attribute object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes a custom attribute definition object
     * Use this API to delete a custom attribute definition.
     * @param id The ID of the custom attribute definition
     * @returns void
     */
    deleteCustomAttributeDefinition(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a custom attribute definition object
     * Use this API to delete a custom attribute definition.
     * @param id The ID of the custom attribute definition
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates a custom attribute definition object
     * Use this API to update a custom attribute definition. You can only update the associated entity types.
     * @param id The ID of the custom attribute object to update.
     * @param requestBody The custom attribute definition object.
     * @returns any The updated custom attribute definition object.
     */
    updateCustomAttributeDefinition(
        id: string,
        requestBody?: CustomAttributeDefinition,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates a custom attribute definition object
     * Use this API to update a custom attribute definition. You can only update the associated entity types.
     * @param id The ID of the custom attribute object to update.
     * @param requestBody The custom attribute definition object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateCustomAttributeDefinitionApiRequestOptions(
        id: string,
        requestBody?: CustomAttributeDefinition,
    ): ApiRequestOptions;

}