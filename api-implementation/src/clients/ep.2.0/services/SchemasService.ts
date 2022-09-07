/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface SchemasService {

    /**
     * Gets the schema objects
     * Use this API to retrieve a list of schemas that match the given parameters.
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the schema to match on.
     * @param shared Match only with shared or unshared schemas.
     * @param applicationDomainId Match only schemas in the given application domain.
     * @param applicationDomainIds Match only schemas in the given application domain ids.
     * @param ids Match only schemas with the given IDs separated by commas.
     * @param sort
     * @returns any Retrieve a list of schemas and the accompanying metadata.
     */
    getSchemas(
        pageSize: number,
        pageNumber: number,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the schema objects
     * Use this API to retrieve a list of schemas that match the given parameters.
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the schema to match on.
     * @param shared Match only with shared or unshared schemas.
     * @param applicationDomainId Match only schemas in the given application domain.
     * @param applicationDomainIds Match only schemas in the given application domain ids.
     * @param ids Match only schemas with the given IDs separated by commas.
     * @param sort
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemasApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * Creates a schema object
     * To model your event-driven architecture, schemas are a fundamental building block for modelling the payloads of the events flowing through your system. Use this API to create schemas that can later be referenced by events.
     * @param requestBody The schema requires a name, an application domain, a schema type and a content type.
     * @returns any Created a schema. The newly saved schema object is returned in the response body.
     */
    createSchema(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a schema object
     * To model your event-driven architecture, schemas are a fundamental building block for modelling the payloads of the events flowing through your system. Use this API to create schemas that can later be referenced by events.
     * @param requestBody The schema requires a name, an application domain, a schema type and a content type.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createSchemaApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves a schema object
     * Use this API to retrieve a single schema by its ID.
     * @param id The ID of the schema object.
     * @returns any The schema object.
     */
    getSchema(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a schema object
     * Use this API to retrieve a single schema by its ID.
     * @param id The ID of the schema object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes a schema object
     * Use this API to delete a schema. The schema must not be in use by any events else it cannot be deleted.
     * @param id The ID of the schema object.
     * @returns void
     */
    deleteSchema(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a schema object
     * Use this API to delete a schema. The schema must not be in use by any events else it cannot be deleted.
     * @param id The ID of the schema object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteSchemaApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates a schema object
     * Update a schema
     * @param id The ID of the schema object.
     * @param requestBody The schema requires a name, an application domain, a schema type and a content type.
     * @returns any Updated a schema. The newly saved schema object is returned in the response body.
     */
    updateSchema(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates a schema object
     * Update a schema
     * @param id The ID of the schema object.
     * @param requestBody The schema requires a name, an application domain, a schema type and a content type.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @returns any Retrieve a list of schema versions and the accompanying metadata.
     */
    getSchemaVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Retrieves a schema version object
     * Use this API to retrieve a single schema version by its ID.
     * @param versionId The ID of the schema version object.
     * @returns any The schema version object.
     */
    getSchemaVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a schema version object
     * Use this API to retrieve a single schema version by its ID.
     * @param versionId The ID of the schema version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param schemaId The ID of the schema object.
     * @param pageNumber The page number to get. Min: 1
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param versions Match only with schema versions.
     * @param displayName Match only schema versions with the given display name.
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @returns any Retrieve a list of schema versions and the accompanying metadata.
     */
    getSchemaVersionsForSchema(
        schemaId: string,
        pageNumber: number,
        pageSize?: number,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param schemaId The ID of the schema object.
     * @param pageNumber The page number to get. Min: 1
     * @param pageSize The number of schemas to get per page. Min: 1 Max: 100
     * @param versions Match only with schema versions.
     * @param displayName Match only schema versions with the given display name.
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionsForSchemaApiRequestOptions(
        schemaId: string,
        pageNumber: number,
        pageSize?: number,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Creates a schema version object
     * Creates a schema version object
     * @param schemaId
     * @param requestBody schema version details
     * @returns any Created a schema version. The newly saved schema version object is returned in the response body.
     */
    createSchemaVersionForSchema(
        schemaId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a schema version object
     * Creates a schema version object
     * @param schemaId
     * @param requestBody schema version details
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves a schema version object
     * Use this API to retrieve a single schema by its ID.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @returns any The schema version object.
     */
    getSchemaVersionForSchema(
        schemaId: string,
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a schema version object
     * Use this API to retrieve a single schema by its ID.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes a schema version object
     * Use this API to delete a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @returns void
     */
    deleteSchemaVersionForSchema(
        schemaId: string,
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a schema version object
     * Use this API to delete a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates a schema version object
     * Use this API to update a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns any The schema version object.
     */
    updateSchemaVersionForSchema(
        schemaId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates a schema version object
     * Use this API to update a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns any The updated state of the schema version object.
     */
    updateSchemaVersionStateForSchema(
        schemaId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaVersionStateForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}