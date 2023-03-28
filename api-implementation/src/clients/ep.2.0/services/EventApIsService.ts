/* eslint-disable */

import type { EventApi } from '../models/EventApi';
import type { EventApiResponse } from '../models/EventApiResponse';
import type { EventApisResponse } from '../models/EventApisResponse';
import type { EventApiVersion } from '../models/EventApiVersion';
import type { EventApiVersionResponse } from '../models/EventApiVersionResponse';
import type { EventApiVersionsResponse } from '../models/EventApiVersionsResponse';
import type { StateChangeRequestResponse } from '../models/StateChangeRequestResponse';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApIsService {

    /**
     * Get the AsyncAPI specification for an event API version
     * Use this API to get the AsyncAPI specification for an event API version.
     * @param eventApiVersionId The ID of the event API version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param version The version of AsyncAPI to use.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @param eventApiProductVersionId The ID of the event API Product Version to use for generating bindings.
     * @param planId The ID of the plan to use for generating bindings.
     * @param gatewayMessagingServiceIds The list IDs of gateway messaging services for generating bindings.
     * @returns string The AsyncAPI specification for the event API version.
     */
    getAsyncApiForEventApiVersion(
        eventApiVersionId: string,
        showVersioning: boolean,
        format: 'json' | 'yaml',
        includedExtensions: string,
        version: string,
        asyncApiVersion?: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): Promise<string>;

    /**
     * **used to get the request options without making a http request**
     * Get the AsyncAPI specification for an event API version
     * Use this API to get the AsyncAPI specification for an event API version.
     * @param eventApiVersionId The ID of the event API version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param version The version of AsyncAPI to use.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @param eventApiProductVersionId The ID of the event API Product Version to use for generating bindings.
     * @param planId The ID of the plan to use for generating bindings.
     * @param gatewayMessagingServiceIds The list IDs of gateway messaging services for generating bindings.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getAsyncApiForEventApiVersionApiRequestOptions(
        eventApiVersionId: string,
        showVersioning: boolean,
        format: 'json' | 'yaml',
        includedExtensions: string,
        version: string,
        asyncApiVersion?: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Get a list of event APIs
     * Use this API to get a list of event APIs that match the given parameters.
     * @param pageSize The number of event APIs to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event API to match on.
     * @param ids Match only event APIs with the given IDs separated by commas.
     * @param applicationDomainId Match only event APIs in the given application domain.
     * @param applicationDomainIds Match only event APIs in the given application domains.
     * @param eventApiVersionIds Match only event APIs in the given event API version ids.
     * @param availableWithinApplicationDomainIds Additionally match any shared event APIs in any application domain.
     * @param shared Match only with shared or unshared event APIs.
     * @param brokerType Match only event APIs with the given broker type.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApisResponse Get a list of event APIs and the accompanying metadata.
     */
    getEventApis(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        eventApiVersionIds?: Array<string>,
        availableWithinApplicationDomainIds?: boolean,
        shared?: boolean,
        brokerType?: string,
        sort?: string,
        customAttributes?: string,
    ): Promise<EventApisResponse>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of event APIs
     * Use this API to get a list of event APIs that match the given parameters.
     * @param pageSize The number of event APIs to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event API to match on.
     * @param ids Match only event APIs with the given IDs separated by commas.
     * @param applicationDomainId Match only event APIs in the given application domain.
     * @param applicationDomainIds Match only event APIs in the given application domains.
     * @param eventApiVersionIds Match only event APIs in the given event API version ids.
     * @param availableWithinApplicationDomainIds Additionally match any shared event APIs in any application domain.
     * @param shared Match only with shared or unshared event APIs.
     * @param brokerType Match only event APIs with the given broker type.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApisApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        eventApiVersionIds?: Array<string>,
        availableWithinApplicationDomainIds?: boolean,
        shared?: boolean,
        brokerType?: string,
        sort?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Create an event API
     * Use this API to create an event API.
     * @param requestBody The event API
     * @returns EventApiResponse Created an event API. The newly saved event API is returned in the response body.
     */
    createEventApi(
        requestBody: EventApi,
    ): Promise<EventApiResponse>;

    /**
     * **used to get the request options without making a http request**
     * Create an event API
     * Use this API to create an event API.
     * @param requestBody The event API
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiApiRequestOptions(
        requestBody: EventApi,
    ): ApiRequestOptions;

    /**
     * Get an event API
     * Use this API to get a single event API by its ID.
     * @param id The ID of the event API.
     * @returns EventApiResponse The event API.
     */
    getEventApi(
        id: string,
    ): Promise<EventApiResponse>;

    /**
     * **used to get the request options without making a http request**
     * Get an event API
     * Use this API to get a single event API by its ID.
     * @param id The ID of the event API.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete an event API
     * Use this API to delete an event API.
     * @param id The ID of the event API.
     * @returns void
     */
    deleteEventApi(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an event API
     * Use this API to delete an event API.
     * @param id The ID of the event API.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an event API
     * Use this API to update an event API. You only need to specify the fields that need to be updated.
     * @param id The ID of the event API to update.
     * @param requestBody The event API
     * @returns EventApiResponse The updated event API.
     */
    updateEventApi(
        id: string,
        requestBody: EventApi,
    ): Promise<EventApiResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update an event API
     * Use this API to update an event API. You only need to specify the fields that need to be updated.
     * @param id The ID of the event API to update.
     * @param requestBody The event API
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiApiRequestOptions(
        id: string,
        requestBody: EventApi,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get a list of event API versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiversions">another endpoint.</a><br><br>*Use this API to get a list of event API versions under a particular event API matching the given parameters.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param displayName Match event API versions with the given display name.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param version Match event API versions with the given version.
     * @param stateId Match event API versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiVersionsResponse Get a list of event API versions.
     */
    getEventApiVersionsForEventApi(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): Promise<EventApiVersionsResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get a list of event API versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiversions">another endpoint.</a><br><br>*Use this API to get a list of event API versions under a particular event API matching the given parameters.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param displayName Match event API versions with the given display name.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param version Match event API versions with the given version.
     * @param stateId Match event API versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionsForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Create an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createeventapiversion">another endpoint.</a><br><br>*Use this API to create an event API version.
     * @param eventApiId The ID of the parent event API
     * @param requestBody Event API version
     * @returns EventApiVersionResponse Created an event API version. Returns the newly saved event API version in the response body.
     */
    createEventApiVersionForEventApi(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Create an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createeventapiversion">another endpoint.</a><br><br>*Use this API to create an event API version.
     * @param eventApiId The ID of the parent event API
     * @param requestBody Event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiversion">another endpoint.</a><br><br>*Use this API to get a single event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @returns EventApiVersionResponse The event API version.
     */
    getEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<EventApiVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiversion">another endpoint.</a><br><br>*Use this API to get a single event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Delete an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteeventapiversion">another endpoint.</a><br><br>*Use this API to delete an event API version.
     * @param eventApiId The ID of the parent event API
     * @param id The ID of the event API version
     * @returns void
     */
    deleteEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<void>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Delete an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteeventapiversion">another endpoint.</a><br><br>*Use this API to delete an event API version.
     * @param eventApiId The ID of the parent event API
     * @param id The ID of the event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiversion">another endpoint.</a><br><br>*Use this API to update an event API version. You only need to specify the fields that need to be updated.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The event API version.
     * @returns EventApiVersionResponse The updated event API version.
     */
    updateEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiversion">another endpoint.</a><br><br>*Use this API to update an event API version. You only need to specify the fields that need to be updated.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get the AsyncAPI specification for an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getasyncapiforeventapiversion">another endpoint.</a><br><br>*Use this API to get the AsyncAPI specification for an event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use
     * @param eventApiProductVersionId The ID of the event API Product Version to use for generating bindings.
     * @param planId The ID of the plan to use for generating bindings.
     * @param gatewayMessagingServiceIds The list IDs of gateway messaging services for generating bindings.
     * @returns string The AsyncAPI specification for the event API version.
     */
    getEventApiVersionAsyncApiForEventApi(
        eventApiId: string,
        id: string,
        showVersioning: boolean,
        includedExtensions: string,
        format: 'json' | 'yaml',
        version: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): Promise<string>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get the AsyncAPI specification for an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getasyncapiforeventapiversion">another endpoint.</a><br><br>*Use this API to get the AsyncAPI specification for an event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param showVersioning Include versions in each AsyncAPI object's name when only one version is present
     * @param includedExtensions The event portal database keys to include for each AsyncAPI object.
     * @param format The format in which to get the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use
     * @param eventApiProductVersionId The ID of the event API Product Version to use for generating bindings.
     * @param planId The ID of the plan to use for generating bindings.
     * @param gatewayMessagingServiceIds The list IDs of gateway messaging services for generating bindings.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionAsyncApiForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        showVersioning: boolean,
        includedExtensions: string,
        format: 'json' | 'yaml',
        version: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update the state of an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiversionstate">another endpoint.</a><br><br>*Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The event API version.
     * @returns VersionedObjectStateChangeRequest The updated state of the event API version.
     */
    updateEventApiVersionStateForEventApi(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): Promise<VersionedObjectStateChangeRequest>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update the state of an event API version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiversionstate">another endpoint.</a><br><br>*Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiVersionStateForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * Get a list of event API versions
     * Use this API to get a list of event API versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiIds Match only event API versions of these event API IDs, separated by commas.
     * @param ids Match event API versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiVersionsResponse Get a list of event API versions.
     */
    getEventApiVersions(
        pageSize: number,
        pageNumber: number,
        eventApiIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        customAttributes?: string,
    ): Promise<EventApiVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of event API versions
     * Use this API to get a list of event API versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiIds Match only event API versions of these event API IDs, separated by commas.
     * @param ids Match event API versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        eventApiIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Create an event API version
     * Use this API to create an event API version.
     * @param requestBody Event API version
     * @returns EventApiVersionResponse Created an event API version. Returns the newly saved event API version in the response body.
     */
    createEventApiVersion(
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Create an event API version
     * Use this API to create an event API version.
     * @param requestBody Event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiVersionApiRequestOptions(
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * Get an event API version
     * Use this API to get a single event API version by its ID.
     * @param versionId The ID of the event API version.
     * @param include A list of additional entities to include in the response.
     * @returns EventApiVersionResponse The event API version.
     */
    getEventApiVersion(
        versionId: string,
        include?: string,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Get an event API version
     * Use this API to get a single event API version by its ID.
     * @param versionId The ID of the event API version.
     * @param include A list of additional entities to include in the response.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionApiRequestOptions(
        versionId: string,
        include?: string,
    ): ApiRequestOptions;

    /**
     * Delete an event API version
     * Use this API to delete an event API version by event API version ID.
     * @param versionId The ID of the event API version
     * @returns void
     */
    deleteEventApiVersion(
        versionId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an event API version
     * Use this API to delete an event API version by event API version ID.
     * @param versionId The ID of the event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Update an event API by event API version ID
     * Use this API to update an event API version by event API version ID.You only need to specify the fields that need to be updated.
     * @param versionId The ID of the event API version.
     * @param requestBody The event API version.
     * @returns EventApiVersionResponse The updated event API version.
     */
    updateEventApiVersion(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update an event API by event API version ID
     * Use this API to update an event API version by event API version ID.You only need to specify the fields that need to be updated.
     * @param versionId The ID of the event API version.
     * @param requestBody The event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiVersionApiRequestOptions(
        versionId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * Update the state of an event API version by event API version ID
     * Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the event API version.
     * @param requestBody The Event API version.
     * @returns StateChangeRequestResponse The updated state of the event API version.
     */
    updateEventApiVersionState(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<StateChangeRequestResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update the state of an event API version by event API version ID
     * Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the event API version.
     * @param requestBody The Event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiVersionStateApiRequestOptions(
        versionId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

}