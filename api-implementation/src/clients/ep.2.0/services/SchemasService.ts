/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface SchemasService {

    /**
     * Gets the schema objects
     * Use this API to retrieve a list of schemas that match the given parameters.
     * @param pageSize The number of schemas to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the schema to match on.
     * @param shared Match only with shared or unshared schemas.
     * @param applicationDomainId Match only schemas in the given application domain.
     * @param applicationDomainIds Match only schemas in the given application domain ids.
     * @param ids Match only schemas with the given IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
        customAttributes?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the schema objects
     * Use this API to retrieve a list of schemas that match the given parameters.
     * @param pageSize The number of schemas to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the schema to match on.
     * @param shared Match only with shared or unshared schemas.
     * @param applicationDomainId Match only schemas in the given application domain.
     * @param applicationDomainIds Match only schemas in the given application domain ids.
     * @param ids Match only schemas with the given IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
        customAttributes?: string,
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
     * Retrieves a list of schema version objects
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param pageSize The number of schemas to get per page.
     * @param pageNumber The page number to get.
     * @param schemaIds Match only schema versions of these schema IDs, separated by commas.
     * @param ids Match only schema versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param include
     * @returns any Retrieve a list of schema versions and the accompanying metadata.
     */
    getSchemaVersions(
        pageSize: number,
        pageNumber: number,
        schemaIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
        include?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of schema version objects
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param pageSize The number of schemas to get per page.
     * @param pageNumber The page number to get.
     * @param schemaIds Match only schema versions of these schema IDs, separated by commas.
     * @param ids Match only schema versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param include
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        schemaIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
        include?: string,
    ): ApiRequestOptions;

    /**
     * Creates a schema version object
     * Creates a schema version object
     * @param requestBody schema version details
     * @returns any Created a schema version. The newly saved schema version object is returned in the response body.
     */
    createSchemaVersion(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a schema version object
     * Creates a schema version object
     * @param requestBody schema version details
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createSchemaVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Deletes a schema version object
     * Use this API to delete a schema version.
     * @param id The ID of the schema version.
     * @returns void
     */
    deleteSchemaVersion(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a schema version object
     * Use this API to delete a schema version.
     * @param id The ID of the schema version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteSchemaVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates a schema version object
     * Use this API to update a schema version.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns any The schema version object.
     */
    updateSchemaVersion(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates a schema version object
     * Use this API to update a schema version.
     * @param id The ID of the schema version.
     * @param requestBody
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param id The ID of the schema version.
     * @param requestBody The state change object.
     * @returns any The updated state of the schema version object.
     */
    updateSchemaVersionState(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param id The ID of the schema version.
     * @param requestBody The state change object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaVersionStateApiRequestOptions(
        id: string,
        requestBody: any,
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
     * @deprecated
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param schemaId The ID of the schema object.
     * @param pageNumber The page number to get.
     * @param pageSize The number of schemas to get per page.
     * @param versions Match only with schema versions.
     * @param displayName Match only schema versions with the given display name.
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns any Retrieve a list of schema versions and the accompanying metadata.
     */
    getSchemaVersionsForSchema(
        schemaId: string,
        pageNumber: number,
        pageSize?: number,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Gets the schema version objects for a schema
     * Use this API to retrieve a list of schema versions that match the given parameters.
     * @param schemaId The ID of the schema object.
     * @param pageNumber The page number to get.
     * @param pageSize The number of schemas to get per page.
     * @param versions Match only with schema versions.
     * @param displayName Match only schema versions with the given display name.
     * @param ids Match only schema versions with the given IDs separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSchemaVersionsForSchemaApiRequestOptions(
        schemaId: string,
        pageNumber: number,
        pageSize?: number,
        versions?: Array<string>,
        displayName?: string,
        ids?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Creates a schema version object
     * Creates a schema version object
     * @param schemaId The ID of the parent schema
     * @param requestBody schema version details
     * @returns any Created a schema version. The newly saved schema version object is returned in the response body.
     */
    createSchemaVersionForSchema(
        schemaId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Creates a schema version object
     * Creates a schema version object
     * @param schemaId The ID of the parent schema
     * @param requestBody schema version details
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createSchemaVersionForSchemaApiRequestOptions(
        schemaId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody The state change object.
     * @returns any The updated state of the schema version object.
     */
    updateSchemaVersionStateForSchema(
        schemaId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Updates the state of a schema version object
     * Use this API to update the state of a schema version.
     * @param schemaId The ID of the schema object.
     * @param id The ID of the schema version.
     * @param requestBody The state change object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateSchemaVersionStateForSchemaApiRequestOptions(
        schemaId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}