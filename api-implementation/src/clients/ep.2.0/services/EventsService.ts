/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventsService {

    /**
     * Gets the event objects
     * Use this API to retrieve a list of events that match the given parameters.
     * @param pageSize The number of events to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event to match on.
     * @param shared Match only with shared or unshared events.
     * @param applicationDomainId Match only events in the given application domain.
     * @param applicationDomainIds Match only events in the given application domain ids.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param ids Match only events with the given IDs separated by commas.
     * @returns any Retrieve a list of applications and the accompanying metadata.
     */
    getEvents(
        pageSize: number,
        pageNumber: number,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        sort?: string,
        customAttributes?: string,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the event objects
     * Use this API to retrieve a list of events that match the given parameters.
     * @param pageSize The number of events to get per page.
     * @param pageNumber The page number to get.
     * @param name Name of the event to match on.
     * @param shared Match only with shared or unshared events.
     * @param applicationDomainId Match only events in the given application domain.
     * @param applicationDomainIds Match only events in the given application domain ids.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param ids Match only events with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        sort?: string,
        customAttributes?: string,
        ids?: Array<string>,
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
     * @param pageSize The number of event to get per page.
     * @param pageNumber The page number to get.
     * @param eventIds Match only event versions of these event IDs, separated by commas.
     * @param ids Match only event versions with the given IDs, separated by commas.
     * @param messagingServiceIds Match only event versions with the given IDs, separated by commas.
     * @param include
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns any Retrieve a list of event versions and the accompanying metadata.
     */
    getEventVersions(
        pageSize: number,
        pageNumber: number,
        eventIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        include?: string,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets event version objects
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param pageSize The number of event to get per page.
     * @param pageNumber The page number to get.
     * @param eventIds Match only event versions of these event IDs, separated by commas.
     * @param ids Match only event versions with the given IDs, separated by commas.
     * @param messagingServiceIds Match only event versions with the given IDs, separated by commas.
     * @param include
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        eventIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        include?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Creates an event version object
     * Creates an event version object
     * @param requestBody App version request body description
     * @returns any Created an event version. Returns the newly saved event version object in the response body.
     */
    createEventVersion(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event version object
     * Creates an event version object
     * @param requestBody App version request body description
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param id The ID of the event version object.
     * @param include
     * @returns any The event version object.
     */
    getEventVersion(
        id: string,
        include?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event version object
     * Use this API to retrieve a single event version by its ID.
     * @param id The ID of the event version object.
     * @param include
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionApiRequestOptions(
        id: string,
        include?: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event version object
     * Use this API to delete an event version.
     * @param id The ID of the event version
     * @returns void
     */
    deleteEventVersion(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event version object
     * Use this API to delete an event version.
     * @param id The ID of the event version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event version object
     * Use this API to update an event version. You only need to specify the fields that need to be updated.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns any The updated event version object.
     */
    updateEventVersion(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an event version object
     * Use this API to update an event version. You only need to specify the fields that need to be updated.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Updates the state of an event version object
     * Use this API to update the state of event version. You only need to specify the target stateId field
     * @param id The ID of the event version object to update.
     * @param requestBody The state object.
     * @returns any The updated state of the event version object.
     */
    updateEventVersionState(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an event version object
     * Use this API to update the state of event version. You only need to specify the target stateId field
     * @param id The ID of the event version object to update.
     * @param requestBody The state object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventVersionStateApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Gets the event version objects for an event
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param eventId The ID of the parent event.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param displayName Match event versions with the given display name.
     * @param ids Match event versions with the given IDs separated by commas.
     * @param version Match event version objects with the given version.
     * @returns any Retrieve a list of event versions.
     */
    getEventVersionsForEvent(
        eventId: string,
        customAttributes?: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Gets the event version objects for an event
     * Use this API to retrieve a list of event versions that match the given parameters.
     * @param eventId The ID of the parent event.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @param displayName Match event versions with the given display name.
     * @param ids Match event versions with the given IDs separated by commas.
     * @param version Match event version objects with the given version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventVersionsForEventApiRequestOptions(
        eventId: string,
        customAttributes?: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * Update messaging service association for an event version object
     * Use this API to update the messaging service association for an event version.
     * @param id The ID of the event version
     * @param requestBody The messaging service association object
     * @returns any The updated messaging service associations.
     */
    updateMsgSvcAssociationForEventVersion(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update messaging service association for an event version object
     * Use this API to update the messaging service association for an event version.
     * @param id The ID of the event version
     * @param requestBody The messaging service association object
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateMsgSvcAssociationForEventVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Updates the state of an event version object
     * Use this API to update the state of event version. You only need to specify the target stateId field
     * @param eventId The ID of the parent event object.
     * @param id The ID of the event version object to update.
     * @param requestBody The event version object.
     * @returns any The updated state of the event version object.
     */
    updateEventVersionStateForEvent(
        eventId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
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