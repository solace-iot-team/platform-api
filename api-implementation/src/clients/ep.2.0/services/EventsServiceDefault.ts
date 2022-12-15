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
        sort?: string,
        customAttributes?: string,
        ids?: Array<string>,
    ): Promise<any> {
        const options = this.getEventsApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            shared,
            applicationDomainId,
            applicationDomainIds,
            sort,
            customAttributes,
            ids,
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
        sort?: string,
        customAttributes?: string,
        ids?: Array<string>,
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
                'sort': sort,
                'customAttributes': customAttributes,
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
        eventIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        include?: string,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getEventVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            eventIds,
            ids,
            messagingServiceIds,
            include,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        eventIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        include?: string,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'eventIds': eventIds,
                'ids': ids,
                'messagingServiceIds': messagingServiceIds,
                'include': include,
                'customAttributes': customAttributes,
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

    public async createEventVersion(
        requestBody: any,
    ): Promise<any> {
        const options = this.createEventVersionApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventVersions`,
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
        id: string,
        include?: string,
    ): Promise<any> {
        const options = this.getEventVersionApiRequestOptions(
            id,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionApiRequestOptions(
        id: string,
        include?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventVersions/${id}`,
            query: {
                'include': include,
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

    public async deleteEventVersion(
        id: string,
    ): Promise<void> {
        const options = this.deleteEventVersionApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventVersions/${id}`,
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

    public async updateEventVersion(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEventVersionApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventVersions/${id}`,
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

    public async updateEventVersionState(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateEventVersionStateApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventVersionStateApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventVersions/${id}/state`,
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

    public async getEventVersionsForEvent(
        eventId: string,
        customAttributes?: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): Promise<any> {
        const options = this.getEventVersionsForEventApiRequestOptions(
            eventId,
            customAttributes,
            displayName,
            ids,
            version,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventVersionsForEventApiRequestOptions(
        eventId: string,
        customAttributes?: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/events/${eventId}/versions`,
            query: {
                'customAttributes': customAttributes,
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

    public async updateMsgSvcAssociationForEventVersion(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateMsgSvcAssociationForEventVersionApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateMsgSvcAssociationForEventVersionApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PUT',
            path: `/api/v2/architecture/eventVersions/${id}/messagingServices`,
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