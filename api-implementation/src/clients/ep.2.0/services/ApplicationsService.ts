/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ApplicationsService {

    /**
     * Get a list of applications
     * Use this API to get a list of applications that match the given parameters.
     * @param pageSize The number of applications to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the application to match on.
     * @param applicationDomainId Match only applications in the given application domain.
     * @param ids Match only applications with the given IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @param applicationType Match only applications with the given applicationType.
     * @returns any Get a list of applications and the accompanying metadata.
     */
    getApplications(
        pageSize: number,
        pageNumber: number,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
        applicationType?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of applications
     * Use this API to get a list of applications that match the given parameters.
     * @param pageSize The number of applications to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the application to match on.
     * @param applicationDomainId Match only applications in the given application domain.
     * @param ids Match only applications with the given IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @param applicationType Match only applications with the given applicationType.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
        applicationType?: string,
    ): ApiRequestOptions;

    /**
     * Create an application
     * To model your event-driven architecture, applications are a fundamental building block for modelling the producers and consumers of events. Use this API to create applications and model the events they produce and consume.
     * @param requestBody Applications have a name and live within an application domain. Events can be added to the application as produced or consumed.
     * @returns any Created an application. Returns the newly saved application in the response body.
     */
    createApplication(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create an application
     * To model your event-driven architecture, applications are a fundamental building block for modelling the producers and consumers of events. Use this API to create applications and model the events they produce and consume.
     * @param requestBody Applications have a name and live within an application domain. Events can be added to the application as produced or consumed.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get an application
     * Use this API to get a single application by its ID.
     * @param id The ID of the application.
     * @returns any The application.
     */
    getApplication(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an application
     * Use this API to get a single application by its ID.
     * @param id The ID of the application.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete an application
     * Use this API to delete an application.
     * @param id The ID of the application
     * @returns void
     */
    deleteApplication(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an application
     * Use this API to delete an application.
     * @param id The ID of the application
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an application
     * Use this API to update an application. You only need to specify the fields that need to be updated.
     * @param id The ID of the application to update.
     * @param requestBody The application.
     * @returns any The updated application.
     */
    updateApplication(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update an application
     * Use this API to update an application. You only need to specify the fields that need to be updated.
     * @param id The ID of the application to update.
     * @param requestBody The application.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get a list of application versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getapplicationversions">another endpoint.</a><br><br>*Use this API to get a list of application versions that match the given parameters.
     * @param applicationId The ID of the parent application.
     * @param displayName Match application versions with the given display name.
     * @param ids Match application versions with the given IDs separated by commas.
     * @param version Match application versions with the given version.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns any Get a list of application versions.
     */
    getApplicationVersionsForApplication(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get a list of application versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getapplicationversions">another endpoint.</a><br><br>*Use this API to get a list of application versions that match the given parameters.
     * @param applicationId The ID of the parent application.
     * @param displayName Match application versions with the given display name.
     * @param ids Match application versions with the given IDs separated by commas.
     * @param version Match application versions with the given version.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionsForApplicationApiRequestOptions(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Create an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createapplicationversion">another endpoint.</a><br><br>*Create an application version
     * @param applicationId The ID of the parent application
     * @param requestBody App version request body description
     * @returns any Created an application version. Returns the newly saved application version in the response body.
     */
    createApplicationVersionForApplication(
        applicationId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Create an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createapplicationversion">another endpoint.</a><br><br>*Create an application version
     * @param applicationId The ID of the parent application
     * @param requestBody App version request body description
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getapplicationversion">another endpoint.</a><br><br>*Use this API to get a single application version by its ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @returns any The application version.
     */
    getApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getapplicationversion">another endpoint.</a><br><br>*Use this API to get a single application version by its ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Delete an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteapplicationversion">another endpoint.</a><br><br>*Use this API to delete an application version.
     * @param applicationId The ID of the parent application
     * @param id The ID of the application version
     * @returns void
     */
    deleteApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<void>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Delete an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteapplicationversion">another endpoint.</a><br><br>*Use this API to delete an application version.
     * @param applicationId The ID of the parent application
     * @param id The ID of the application version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateapplicationversion">another endpoint.</a><br><br>*Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version to update.
     * @param requestBody The application version.
     * @returns any The updated application version.
     */
    updateApplicationVersionForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateapplicationversion">another endpoint.</a><br><br>*Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version to update.
     * @param requestBody The application version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update the state of an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateapplicationversionstate">another endpoint.</a><br><br>*Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version to update.
     * @param requestBody The application version.
     * @returns any The updated state of the application version.
     */
    updateApplicationVersionStateForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update the state of an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateapplicationversionstate">another endpoint.</a><br><br>*Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version to update.
     * @param requestBody The application version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionStateForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get the AsyncAPI specification for an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getasyncapiforapplicationversion">another endpoint.</a><br><br>*Use this API to get the AsyncAPI specification for an application version using the parent ID and the version's ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param asyncApiVersion The version of AsyncAPI to use
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param messagingServiceId Applies bindings from consumed events that are published in this messaging service's modeled event mesh.
     * @returns string The AsyncAPI specification for the application version.
     */
    getApplicationVersionAsyncApiForApplication(
        applicationId: string,
        id: string,
        showVersioning: boolean,
        includedExtensions: string,
        asyncApiVersion: string,
        format: 'json' | 'yaml',
        messagingServiceId?: string,
    ): Promise<string>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get the AsyncAPI specification for an application version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getasyncapiforapplicationversion">another endpoint.</a><br><br>*Use this API to get the AsyncAPI specification for an application version using the parent ID and the version's ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param asyncApiVersion The version of AsyncAPI to use
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param messagingServiceId Applies bindings from consumed events that are published in this messaging service's modeled event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionAsyncApiForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        showVersioning: boolean,
        includedExtensions: string,
        asyncApiVersion: string,
        format: 'json' | 'yaml',
        messagingServiceId?: string,
    ): ApiRequestOptions;

    /**
     * Get a list of application versions
     * Use this API to get a list of application versions that match the given parameters.
     * @param pageSize The number of application versions to get per page.
     * @param pageNumber The page number to get.
     * @param applicationIds Match only application versions of these application IDs, separated by commas.
     * @param ids Match only application versions with the given IDs, separated by commas.
     * @param messagingServiceIds Match only application versions with the given messaging service IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns any Get a list of application versions and the accompanying metadata.
     */
    getApplicationVersions(
        pageSize: number,
        pageNumber: number,
        applicationIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of application versions
     * Use this API to get a list of application versions that match the given parameters.
     * @param pageSize The number of application versions to get per page.
     * @param pageNumber The page number to get.
     * @param applicationIds Match only application versions of these application IDs, separated by commas.
     * @param ids Match only application versions with the given IDs, separated by commas.
     * @param messagingServiceIds Match only application versions with the given messaging service IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        applicationIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Create an application version
     * Create an application version
     * @param requestBody App version request body description
     * @returns any Created an application version. Returns the newly saved application version in the response body.
     */
    createApplicationVersion(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create an application version
     * Create an application version
     * @param requestBody App version request body description
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get an application version
     * Use this API to get a single application version by its ID.
     * @param versionId The ID of the application version.
     * @returns any The application version.
     */
    getApplicationVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an application version
     * Use this API to get a single application version by its ID.
     * @param versionId The ID of the application version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Delete an application version
     * Use this API to delete an application version.
     * @param versionId The ID of the application version
     * @returns void
     */
    deleteApplicationVersion(
        versionId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an application version
     * Use this API to delete an application version.
     * @param versionId The ID of the application version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Update an application version
     * Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the application version to update.
     * @param requestBody The application version.
     * @param include
     * @param relationsBrokerType
     * @returns any The updated application version.
     */
    updateApplicationVersion(
        versionId: string,
        requestBody: any,
        include?: Array<string>,
        relationsBrokerType?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update an application version
     * Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the application version to update.
     * @param requestBody The application version.
     * @param include
     * @param relationsBrokerType
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionApiRequestOptions(
        versionId: string,
        requestBody: any,
        include?: Array<string>,
        relationsBrokerType?: string,
    ): ApiRequestOptions;

    /**
     * Update the state of an application version
     * Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param versionId The ID of the application version to update.
     * @param requestBody The state change object.
     * @returns any The updated state of the application version.
     */
    updateApplicationVersionState(
        versionId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update the state of an application version
     * Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param versionId The ID of the application version to update.
     * @param requestBody The state change object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionStateApiRequestOptions(
        versionId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Replace messaging service association for an application version
     * Use this API to replace the messaging service association for an application version.
     * @param versionId The ID of the application version
     * @param requestBody The messaging service association object
     * @returns any The updated messaging service associations.
     */
    updateMsgSvcAssociationForAppVersion(
        versionId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Replace messaging service association for an application version
     * Use this API to replace the messaging service association for an application version.
     * @param versionId The ID of the application version
     * @param requestBody The messaging service association object
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateMsgSvcAssociationForAppVersionApiRequestOptions(
        versionId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get the AsyncAPI specification for an application version
     * Use this API to get the AsyncAPI specification for an application version.
     * @param applicationVersionId The ID of the application version.
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @param messagingServiceId Applies bindings from consumed events that are published in this messaging service's modeled event mesh.
     * @returns string The AsyncAPI specification for the application version.
     */
    getAsyncApiForApplicationVersion(
        applicationVersionId: string,
        format: 'json' | 'yaml',
        showVersioning: boolean,
        includedExtensions: string,
        asyncApiVersion: string,
        messagingServiceId?: string,
    ): Promise<string>;

    /**
     * **used to get the request options without making a http request**
     * Get the AsyncAPI specification for an application version
     * Use this API to get the AsyncAPI specification for an application version.
     * @param applicationVersionId The ID of the application version.
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @param messagingServiceId Applies bindings from consumed events that are published in this messaging service's modeled event mesh.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getAsyncApiForApplicationVersionApiRequestOptions(
        applicationVersionId: string,
        format: 'json' | 'yaml',
        showVersioning: boolean,
        includedExtensions: string,
        asyncApiVersion: string,
        messagingServiceId?: string,
    ): ApiRequestOptions;

}