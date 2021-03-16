/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdsResponse } from '../models/IdsResponse';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * Gets the event objects.
     * Use this API to retrieve a list of events that match the given parameters.
     * @param pageSize The number of events to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event to match on.
     * @param topicName Topic name of the event to match on.
     * @param brokerType Broker type of the event to match on.
     * @param shared Match only on shared or unshared events
     * @param schemaId Match only events which use the given schema
     * @param keySchemaId Match only events which use the given key schema
     * @param applicationDomainId Match only events in the given application domain
     * @param ids Match only events with the given ids separated by commas
     * @returns any Retrieve a list of events and the accompanying metadata.
     * @throws ApiError
     */
    public static async list5(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        topicName?: string,
        brokerType?: 'unspecified' | 'solace' | 'kafka',
        shared?: boolean,
        schemaId?: string,
        keySchemaId?: string,
        applicationDomainId?: string,
        ids?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/events`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'topicName': topicName,
                'brokerType': brokerType,
                'shared': shared,
                'schemaId': schemaId,
                'keySchemaId': keySchemaId,
                'applicationDomainId': applicationDomainId,
                'ids': ids,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Creates an event object
     * Events are the primary building block of an event-driven architecture. Applications publish and subscribe to events and events reference schemas. Events are created with a topic that they are published to, and subscribers subscribe to that topic to receive events from the event broker.In the event portal, an event is a type of event as opposed to a specific event instance.
     * @param requestBody The event requires a name and a topic.
     * @returns any Created. The newly saved event object is returned in the response body.
     * @throws ApiError
     */
    public static async add(
        requestBody: any,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/v1/eventPortal/events`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves an event object.
     * Use this API to retrieve a single event by its ID.
     * @param id The ID of the event object.
     * @returns any The event object.
     * @throws ApiError
     */
    public static async get2(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/events/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Deletes an event object
     * Use this API to delete an event. The event must not be in use by any applications else it cannot be deleted.
     * @param id The ID of the event object.
     * @returns any No content is returned.
     * @throws ApiError
     */
    public static async delete2(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/v1/eventPortal/events/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Updates an event object
     * Use this API to update an event. You only need to specify the field that needs to be updated.
     * @param id The ID of the event object to update.
     * @param requestBody The event object.
     * @returns any The updated event object.
     * @throws ApiError
     */
    public static async update5(
        id: string,
        requestBody?: any,
    ): Promise<any> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/v1/eventPortal/events/${id}`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves the tags of an event
     * Use this API to retrieve all of the tags of an event. Tags are referenced by their tag ID.
     * @param id The ID of the event to retrieve the tags.
     * @returns IdsResponse An array of tags identified by their tag ID
     * @throws ApiError
     */
    public static async list6(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/events/${id}/tags`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Updates the tags of an event
     * Use this API to update all of the tags of an event. Tags are referenced by their tag ID.
     * @param id The ID of the event object to update.
     * @param requestBody A list of tag IDs
     * @returns IdsResponse An array of the updated tags identified by their tag ID.
     * @throws ApiError
     */
    public static async update6(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/events/${id}/tags`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves the owners of an event
     * Use this API to retrieve all of the owners of an event. Owners are referenced by their user ID.
     * @param id The ID of the event to retrieve the owners.
     * @returns IdsResponse An array of owners identified by their user ID.
     * @throws ApiError
     */
    public static async list7(
        id: string,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'GET',
            path: `/api/v1/eventPortal/events/${id}/owners`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

    /**
     * Updates the owners of an event
     * Use this API to update all of the owners of an event. Owners are referenced by their user ID.
     * @param id The ID of the event object to update.
     * @param requestBody A list of user IDs
     * @returns IdsResponse An array of updated owners identified by their user ID.
     * @throws ApiError
     */
    public static async update7(
        id: string,
        requestBody?: Array<string>,
    ): Promise<IdsResponse> {
        const result = await __request({
            method: 'PUT',
            path: `/api/v1/eventPortal/events/${id}/owners`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                500: `Internal Server Error.`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        });
        return result.body;
    }

}