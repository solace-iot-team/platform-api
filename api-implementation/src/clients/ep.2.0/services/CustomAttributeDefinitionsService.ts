/* eslint-disable */

import type { CustomAttributeDefinition } from '../models/CustomAttributeDefinition';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface CustomAttributeDefinitionsService {

    /**
     * Get a list of custom attribute definitions
     * Use this API to get a list of custom attribute definitions that match the given parameters.
     * @param pageSize The number of custom attribute definitions to get per page.
     * @param pageNumber The page number to get.
     * @param associatedEntityTypes Match only custom attribute definitions with the given associated entity type names separated by commas.
     * @returns any Get a list of custom attribute definitions and the accompanying metadata.
     */
    getCustomAttributeDefinitions(
        pageSize: number,
        pageNumber: number,
        associatedEntityTypes?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of custom attribute definitions
     * Use this API to get a list of custom attribute definitions that match the given parameters.
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
     * Create a custom attribute definition
     * Use this API to create a custom attribute definition.
     * @param requestBody The custom attribute definition.
     * @returns any Created a custom attribute definition. Returns the newly saved custom attribute definition in the response body.
     */
    createCustomAttributeDefinition(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create a custom attribute definition
     * Use this API to create a custom attribute definition.
     * @param requestBody The custom attribute definition.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createCustomAttributeDefinitionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get a custom attribute definition
     * Use this API to get a single custom attribute definition by its ID.
     * @param id The ID of the custom attribute definition.
     * @returns any The custom attribute definition.
     */
    getCustomAttributeDefinition(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a custom attribute definition
     * Use this API to get a single custom attribute definition by its ID.
     * @param id The ID of the custom attribute definition.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete a custom attribute definition
     * Use this API to delete a custom attribute definition.
     * @param id The ID of the custom attribute definition
     * @returns void
     */
    deleteCustomAttributeDefinition(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete a custom attribute definition
     * Use this API to delete a custom attribute definition.
     * @param id The ID of the custom attribute definition
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteCustomAttributeDefinitionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update a custom attribute definition
     * Use this API to update a custom attribute definition. You can only update the associated entity types.
     * @param id The ID of the custom attribute definition to update.
     * @param requestBody The custom attribute definition.
     * @returns any The updated custom attribute definition.
     */
    updateCustomAttributeDefinition(
        id: string,
        requestBody: CustomAttributeDefinition,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update a custom attribute definition
     * Use this API to update a custom attribute definition. You can only update the associated entity types.
     * @param id The ID of the custom attribute definition to update.
     * @param requestBody The custom attribute definition.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateCustomAttributeDefinitionApiRequestOptions(
        id: string,
        requestBody: CustomAttributeDefinition,
    ): ApiRequestOptions;

    /**
     * Get a list the custom attribute definitions of provided application domain
     * Use this API to get a list of custom attribute definitions that match the given parameters.
     * @param applicationDomainId Match only custom attribute definitions with the given application domain Id
     * @param pageSize The number of custom attribute definitions to get per page.
     * @param pageNumber The page number to get.
     * @returns any Get a list of custom attribute definitions of a given application domain id.
     */
    getCustomAttributeDefinitionsByApplicationDomain(
        applicationDomainId: string,
        pageSize: number,
        pageNumber: number,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list the custom attribute definitions of provided application domain
     * Use this API to get a list of custom attribute definitions that match the given parameters.
     * @param applicationDomainId Match only custom attribute definitions with the given application domain Id
     * @param pageSize The number of custom attribute definitions to get per page.
     * @param pageNumber The page number to get.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getCustomAttributeDefinitionsByApplicationDomainApiRequestOptions(
        applicationDomainId: string,
        pageSize: number,
        pageNumber: number,
    ): ApiRequestOptions;

    /**
     * Create a custom attribute definition for provided application domain
     * Use this API to create a custom attribute definition for provided application domain.
     * @param applicationDomainId The ID of the application domain
     * @param requestBody The custom attribute definition.
     * @returns any Created a custom attribute definition in provided application domain and Returns the newly saved custom attribute definition in the response body.
     */
    createCustomAttributeDefinitionByApplicationDomain(
        applicationDomainId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create a custom attribute definition for provided application domain
     * Use this API to create a custom attribute definition for provided application domain.
     * @param applicationDomainId The ID of the application domain
     * @param requestBody The custom attribute definition.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createCustomAttributeDefinitionByApplicationDomainApiRequestOptions(
        applicationDomainId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Delete a custom attribute definition of provided application domain
     * Use this API to delete a custom attribute definition by given application domain.
     * @param applicationDomainId The ID of the application domain
     * @returns void
     */
    deleteCustomAttributeDefinitionByApplicationDomain(
        applicationDomainId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete a custom attribute definition of provided application domain
     * Use this API to delete a custom attribute definition by given application domain.
     * @param applicationDomainId The ID of the application domain
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteCustomAttributeDefinitionByApplicationDomainApiRequestOptions(
        applicationDomainId: string,
    ): ApiRequestOptions;

    /**
     * Delete a custom attribute definition of provided application domain
     * Use this API to delete a custom attribute definition of given application domain.
     * @param applicationDomainId The ID of the application domain
     * @param customAttributeId The ID of the custom attribute definition
     * @returns void
     */
    deleteCustomAttributeDefinitionOfApplicationDomain(
        applicationDomainId: string,
        customAttributeId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete a custom attribute definition of provided application domain
     * Use this API to delete a custom attribute definition of given application domain.
     * @param applicationDomainId The ID of the application domain
     * @param customAttributeId The ID of the custom attribute definition
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteCustomAttributeDefinitionOfApplicationDomainApiRequestOptions(
        applicationDomainId: string,
        customAttributeId: string,
    ): ApiRequestOptions;

    /**
     * Update a custom attribute definition for provided application domain
     * Use this API to update a custom attribute definition for provided application domain.
     * @param applicationDomainId The ID of the application domain
     * @param customAttributeId The ID of the custom attribute definition
     * @param requestBody The custom attribute definition.
     * @returns any Updated a custom attribute definition in provided application domain and Returns the newly saved custom attribute definition in the response body.
     */
    updateCustomAttributeDefinitionByApplicationDomain(
        applicationDomainId: string,
        customAttributeId: string,
        requestBody: CustomAttributeDefinition,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update a custom attribute definition for provided application domain
     * Use this API to update a custom attribute definition for provided application domain.
     * @param applicationDomainId The ID of the application domain
     * @param customAttributeId The ID of the custom attribute definition
     * @param requestBody The custom attribute definition.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateCustomAttributeDefinitionByApplicationDomainApiRequestOptions(
        applicationDomainId: string,
        customAttributeId: string,
        requestBody: CustomAttributeDefinition,
    ): ApiRequestOptions;

}