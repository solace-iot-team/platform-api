/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventsService {

    /**
     * Gets the event objects
     * Use this API to retrieve a list of events that match the given parameters.
     * @param pageSize The number of events to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event to match on.
     * @param shared Match only with shared or unshared events.
     * @param applicationDomainId Match only events in the given application domain.
     * @param applicationDomainIds Match only events in the given application domain ids.
     * @param ids Match only events with the given IDs separated by commas.
     * @param sort
     * @returns any Retrieve a list of applications and the accompanying metadata.
     */
    getEvents(
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
     * Gets the event objects
     * Use this API to retrieve a list of events that match the given parameters.
     * @param pageSize The number of events to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event to match on.
     * @param shared Match only with shared or unshared events.
     * @param applicationDomainId Match only events in the given application domain.
     * @param applicationDomainIds Match only events in the given application domain ids.
     * @param ids Match only events with the given IDs separated by commas.
     * @param sort
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventsApiRequestOptions(
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
     * Creates an event object
     * Events are the primary building block of an event-driven architecture. Applications publish and subscribe to events and events reference schemas.  In the Event Portal, an event is a type of event as opposed to a specific event instance.
     * @param requestBody The event requires a name and an application domain ID.
     * @returns any Created an event. The newly saved event object is returned in the response body.
     */
    createEvent(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event object
     * Events are the primary building block of an event-driven architecture. Applications publish and subscribe to events and events reference schemas.  In the Event Portal, an event is a type of event as opposed to a specific event instance.
     * @param requestBody The event requires a name and an application domain ID.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an event object
     * Use this API to retrieve a single event by its ID.
     * @param id The ID of the event object.
     * @returns any The event object.
     */
    getEvent(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event object
     * Use this API to retrieve a single event by its ID.
     * @param id The ID of the event object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event object
     * Use this API to delete an event.
     * @param id The ID of the event object.
     * @returns void
     */
    deleteEvent(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event object
     * Use this API to delete an event.
     * @param id The ID of the event object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event object
     * Use this API to update an event. You only need to specify the fields that need to be updated.
     * @param id The ID of the event object to update.
     * @param requestBody The event object.
     * @returns any The updated event object.
     */
    updateEvent(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an event object
     * Use this API to update an event. You only need to specify the fields that need to be updated.
     * @param id The ID of the event object to update.
     * @param requestBody The event object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Gets event version objects
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param pageSize The number of event to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only event versions with the given IDs separated by commas.
     * @returns any Retrieve a list of event versions and the accompanying metadata.
     */
    getEventVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets event version objects
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param pageSize The number of event to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only event versions with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Gets the event version objects for an event
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param eventId The ID of the parent event.
     * @param displayName Match event versions with the given display name.
     * @param ids Match event versions with the given IDs separated by commas.
     * @param version Match event version objects with the given version.
     * @returns any Retrieve a list of event versions.
     */
    getEventVersionsForEvent(
        eventId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the event version objects for an event
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param eventId The ID of the parent event.
     * @param displayName Match event versions with the given display name.
     * @param ids Match event versions with the given IDs separated by commas.
     * @param version Match event version objects with the given version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionsForEventApiRequestOptions(
        eventId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): ApiRequestOptions;

    /**
     * Creates an event version object
     * Creates an event version object
     * @param eventId The ID of the parent event
     * @param requestBody App version request body description
     * @returns any Created an event version. Returns the newly saved event version object in the response body.
     */
    createEventVersionForEvent(
        eventId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event version object
     * Creates an event version object
     * @param eventId The ID of the parent event
     * @param requestBody App version request body description
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventVersionForEventApiRequestOptions(
        eventId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param versionId The ID of the event version object.
     * @returns any The event version object.
     */
    getEventVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param versionId The ID of the event version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param eventId The ID of the parent event.
     * @param id The ID of the event version.
     * @returns any The event version object.
     */
    getEventVersionForEvent(
        eventId: string,
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param eventId The ID of the parent event.
     * @param id The ID of the event version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event version object
     * Use this API to delete an event version.
     * @param eventId The ID of the parent event
     * @param id The ID of the event version
     * @returns void
     */
    deleteEventVersionForEvent(
        eventId: string,
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event version object
     * Use this API to delete an event version.
     * @param eventId The ID of the parent event
     * @param id The ID of the event version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event version object
     * Use this API to update an event version. You only need to specify the fields that need to be updated.
     * @param eventId The ID of the parent event object.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns any The updated event version object.
     */
    updateEventVersionForEvent(
        eventId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an event version object
     * Use this API to update an event version. You only need to specify the fields that need to be updated.
     * @param eventId The ID of the parent event object.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Updates the state of an event version object
     * Use this API to update the state of event version. You only need to specify the target stateId field
     * @param eventId The ID of the parent event object.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns any The updated  state of the event version object.
     */
    updateEventVersionStateForEvent(
        eventId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an event version object
     * Use this API to update the state of event version. You only need to specify the target stateId field
     * @param eventId The ID of the parent event object.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventVersionStateForEventApiRequestOptions(
        eventId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}