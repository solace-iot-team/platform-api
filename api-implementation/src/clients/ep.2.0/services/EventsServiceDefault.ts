/* eslint-disable */

import type { EventsService } from './EventsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventsServiceDefault implements EventsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEvents(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
    ): Promise<any> {
        const options = this.getEventsApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            shared,
            applicationDomainId,
            applicationDomainIds,
            ids,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        ids?: Array<string>,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/events`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'shared': shared,
                'applicationDomainId': applicationDomainId,
                'applicationDomainIds': applicationDomainIds,
                'ids': ids,
                'sort': sort,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async createEvent(
        requestBody: any,
    ): Promise<any> {
        const options = this.createEventApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/events`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getEvent(
        id: string,
    ): Promise<any> {
        const options = this.getEventApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/events/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async deleteEvent(
        id: string,
    ): Promise<void> {
        const options = this.deleteEventApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/events/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateEvent(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEventApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/events/${id}`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getEventVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
    ): Promise<any> {
        const options = this.getEventVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getEventVersionsForEvent(
        eventId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): Promise<any> {
        const options = this.getEventVersionsForEventApiRequestOptions(
            eventId,
            displayName,
            ids,
            version,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionsForEventApiRequestOptions(
        eventId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/events/${eventId}/versions`,
            query: {
                'displayName': displayName,
                'ids': ids,
                'version': version,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async createEventVersionForEvent(
        eventId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.createEventVersionForEventApiRequestOptions(
            eventId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventVersionForEventApiRequestOptions(
        eventId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/events/${eventId}/versions`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getEventVersion(
        versionId: string,
    ): Promise<any> {
        const options = this.getEventVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventVersions/${versionId}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getEventVersionForEvent(
        eventId: string,
        id: string,
    ): Promise<any> {
        const options = this.getEventVersionForEventApiRequestOptions(
            eventId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/events/${eventId}/versions/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async deleteEventVersionForEvent(
        eventId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteEventVersionForEventApiRequestOptions(
            eventId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/events/${eventId}/versions/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateEventVersionForEvent(
        eventId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEventVersionForEventApiRequestOptions(
            eventId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventVersionForEventApiRequestOptions(
        eventId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/events/${eventId}/versions/${id}`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateEventVersionStateForEvent(
        eventId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEventVersionStateForEventApiRequestOptions(
            eventId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventVersionStateForEventApiRequestOptions(
        eventId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/events/${eventId}/versions/${id}/state`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

}