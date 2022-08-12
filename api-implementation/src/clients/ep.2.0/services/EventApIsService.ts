/* eslint-disable */

import type { EventApi } from '../models/EventApi';
import type { EventApiResponse } from '../models/EventApiResponse';
import type { EventApisResponse } from '../models/EventApisResponse';
import type { EventApiVersion } from '../models/EventApiVersion';
import type { EventApiVersionResponse } from '../models/EventApiVersionResponse';
import type { EventApiVersionsResponse } from '../models/EventApiVersionsResponse';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApIsService {

    /**
     * Retrieves a list of event APIs
     * Use this API to retrieve a list of event APIs that match the given parameters.
     * @param pageSize The number of event APIs to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event API to match on.
     * @param ids Match only event APIs with the given IDs separated by commas.
     * @param applicationDomainId Match only event APIs in the given application domain.
     * @param applicationDomainIds Match only event APIs in the given application domains.
     * @param shared Match only with shared or unshared event APIs.
     * @param sort The name of the field to sort on.
     * @param eventApiVersionIds
     * @returns EventApisResponse The list of event APIs and the accompanying metadata.
     */
    getEventApis(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
        eventApiVersionIds?: Array<string>,
    ): Promise<EventApisResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event APIs
     * Use this API to retrieve a list of event APIs that match the given parameters.
     * @param pageSize The number of event APIs to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event API to match on.
     * @param ids Match only event APIs with the given IDs separated by commas.
     * @param applicationDomainId Match only event APIs in the given application domain.
     * @param applicationDomainIds Match only event APIs in the given application domains.
     * @param shared Match only with shared or unshared event APIs.
     * @param sort The name of the field to sort on.
     * @param eventApiVersionIds
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApisApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
        eventApiVersionIds?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Creates an event API
     * Use this API to create an event API.
     * @param requestBody The event API
     * @returns EventApiResponse Created an event API. The newly saved event API is returned in the response body.
     */
    createEventApi(
        requestBody: EventApi,
    ): Promise<EventApiResponse>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event API
     * Use this API to create an event API.
     * @param requestBody The event API
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiApiRequestOptions(
        requestBody: EventApi,
    ): ApiRequestOptions;

    /**
     * Retrieves an event API
     * Use this API to retrieve a single event API by its ID.
     * @param id The ID of the event API.
     * @returns EventApiResponse The event API.
     */
    getEventApi(
        id: string,
    ): Promise<EventApiResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event API
     * Use this API to retrieve a single event API by its ID.
     * @param id The ID of the event API.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event API
     * Use this API to delete an event API.
     * @param id The ID of the event API.
     * @returns void
     */
    deleteEventApi(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event API
     * Use this API to delete an event API.
     * @param id The ID of the event API.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event API
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
     * Updates an event API
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
     * Retrieves a list of event API versions
     * Use this API to retrieve a list of event API versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API versions with the given state ID.
     * @returns EventApiVersionsResponse Retrieve a list of event API versions.
     */
    getEventApiVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): Promise<EventApiVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API versions
     * Use this API to retrieve a list of event API versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API versions with the given state ID.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): ApiRequestOptions;

    /**
     * Retrieves an event API version
     * Use this API to retrieve a single event API version by its ID.
     * @param versionId The ID of the event API version.
     * @param include A list of additional entities to include in the response.
     * @returns EventApiVersionResponse The event API version.
     */
    getEventApiVersion(
        versionId: string,
        include: string,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event API version
     * Use this API to retrieve a single event API version by its ID.
     * @param versionId The ID of the event API version.
     * @param include A list of additional entities to include in the response.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionApiRequestOptions(
        versionId: string,
        include: string,
    ): ApiRequestOptions;

    /**
     * Retrieves a list of event API versions
     * Use this API to retrieve a list of event API versions under a particular event API matching the given parameters.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param displayName Match event API versions with the given display name.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param version Match event API versions with the given version.
     * @param stateId Match event API versions with the given state ID.
     * @returns EventApiVersionsResponse Retrieve a list of event API versions.
     */
    getEventApiVersionsForEventApi(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API versions
     * Use this API to retrieve a list of event API versions under a particular event API matching the given parameters.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param displayName Match event API versions with the given display name.
     * @param ids Match event API versions with the given IDs separated by commas.
     * @param version Match event API versions with the given version.
     * @param stateId Match event API versions with the given state ID.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionsForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): ApiRequestOptions;

    /**
     * Creates an event API version
     * Use this API to create an event API version.
     * @param eventApiId The ID of the parent event API
     * @param requestBody Event API version
     * @returns EventApiVersionResponse Created an event API version. Returns the newly saved event API version in the response body.
     */
    createEventApiVersionForEventApi(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event API version
     * Use this API to create an event API version.
     * @param eventApiId The ID of the parent event API
     * @param requestBody Event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * Retrieves an event API version
     * Use this API to retrieve a single event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @returns EventApiVersionResponse The event API version.
     */
    getEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<EventApiVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event API version
     * Use this API to retrieve a single event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event API version
     * Use this API to delete an event API version.
     * @param eventApiId The ID of the parent event API
     * @param id The ID of the event API version
     * @returns void
     */
    deleteEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event API version
     * Use this API to delete an event API version.
     * @param eventApiId The ID of the parent event API
     * @param id The ID of the event API version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event API
     * Use this API to update an event API version. You only need to specify the fields that need to be updated.
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
     * **used to get the request options without making a http request**
     * Updates an event API
     * Use this API to update an event API version. You only need to specify the fields that need to be updated.
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
     * Updates the state of an event API version
     * Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The Event API version.
     * @returns VersionedObjectStateChangeRequest The updated state of the event API version.
     */
    updateEventApiVersionStateForEventApi(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): Promise<VersionedObjectStateChangeRequest>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an event API version
     * Use this API to update the state of an event API version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version to update.
     * @param requestBody The Event API version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiVersionStateForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions;

    /**
     * Retrieves the AsyncAPI specification for an event API version
     * Use this API to retrieve the AsyncAPI specification for an event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param format The format in which to retrieve the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use
     * @returns any The AsyncAPI specification for the event API version.
     */
    getEventApiVersionAsyncApiForEventApi(
        eventApiId: string,
        id: string,
        format: 'json' | 'yaml',
        version: '2.0.0',
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves the AsyncAPI specification for an event API version
     * Use this API to retrieve the AsyncAPI specification for an event API version using the parent ID and the version's ID.
     * @param eventApiId The ID of the parent event API.
     * @param id The ID of the event API version.
     * @param format The format in which to retrieve the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiVersionAsyncApiForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        format: 'json' | 'yaml',
        version: '2.0.0',
    ): ApiRequestOptions;

    /**
     * Retrieves the AsyncAPI specification for an event API version
     * Use this API to retrieve the AsyncAPI specification for an event API version.
     * @param eventApiVersionId The ID of the event API version.
     * @param format The format in which to retrieve the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @returns any The AsyncAPI specification for the event API version.
     */
    getAsyncApiForEventApiVersion(
        eventApiVersionId: string,
        format: 'json' | 'yaml',
        version: '2.0.0',
        asyncApiVersion?: '2.0.0',
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves the AsyncAPI specification for an event API version
     * Use this API to retrieve the AsyncAPI specification for an event API version.
     * @param eventApiVersionId The ID of the event API version.
     * @param format The format in which to retrieve the AsyncAPI specification. Possible values are yaml and json.
     * @param version The version of AsyncAPI to use.
     * @param asyncApiVersion The version of AsyncAPI to use.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getAsyncApiForEventApiVersionApiRequestOptions(
        eventApiVersionId: string,
        format: 'json' | 'yaml',
        version: '2.0.0',
        asyncApiVersion?: '2.0.0',
    ): ApiRequestOptions;

}