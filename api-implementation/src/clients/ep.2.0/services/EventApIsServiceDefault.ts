/* eslint-disable */

import type { EventApi } from '../models/EventApi';
import type { EventApiResponse } from '../models/EventApiResponse';
import type { EventApisResponse } from '../models/EventApisResponse';
import type { EventApiVersion } from '../models/EventApiVersion';
import type { EventApiVersionResponse } from '../models/EventApiVersionResponse';
import type { EventApiVersionsResponse } from '../models/EventApiVersionsResponse';
import type { StateChangeRequestResponse } from '../models/StateChangeRequestResponse';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { EventApIsService } from './EventApIsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventApIsServiceDefault implements EventApIsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getAsyncApiForEventApiVersion(
        eventApiVersionId: string,
        showVersioning: boolean = false,
        format: 'json' | 'yaml' = 'json',
        includedExtensions: string = 'all',
        version: string = '2.5.0',
        asyncApiVersion?: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): Promise<string> {
        const options = this.getAsyncApiForEventApiVersionApiRequestOptions(
            eventApiVersionId,
            showVersioning,
            format,
            includedExtensions,
            version,
            asyncApiVersion,
            eventApiProductVersionId,
            planId,
            gatewayMessagingServiceIds,
        );
        const result = await __request(options);
        return result.body;
    }

    public getAsyncApiForEventApiVersionApiRequestOptions(
        eventApiVersionId: string,
        showVersioning: boolean = false,
        format: 'json' | 'yaml' = 'json',
        includedExtensions: string = 'all',
        version: string = '2.5.0',
        asyncApiVersion?: string,
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiVersions/${eventApiVersionId}/asyncApi`,
            query: {
                'showVersioning': showVersioning,
                'format': format,
                'includedExtensions': includedExtensions,
                'version': version,
                'asyncApiVersion': asyncApiVersion,
                'eventApiProductVersionId': eventApiProductVersionId,
                'planId': planId,
                'gatewayMessagingServiceIds': gatewayMessagingServiceIds,
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

    public async getEventApis(
        pageSize: number = 20,
        pageNumber: number = 1,
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
    ): Promise<EventApisResponse> {
        const options = this.getEventApisApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            ids,
            applicationDomainId,
            applicationDomainIds,
            eventApiVersionIds,
            availableWithinApplicationDomainIds,
            shared,
            brokerType,
            sort,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApisApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
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
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'ids': ids,
                'applicationDomainId': applicationDomainId,
                'applicationDomainIds': applicationDomainIds,
                'eventApiVersionIds': eventApiVersionIds,
                'availableWithinApplicationDomainIds': availableWithinApplicationDomainIds,
                'shared': shared,
                'brokerType': brokerType,
                'sort': sort,
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

    public async createEventApi(
        requestBody: EventApi,
    ): Promise<EventApiResponse> {
        const options = this.createEventApiApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiApiRequestOptions(
        requestBody: EventApi,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApis`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApi(
        id: string,
    ): Promise<EventApiResponse> {
        const options = this.getEventApiApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${id}`,
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

    public async deleteEventApi(
        id: string,
    ): Promise<void> {
        const options = this.deleteEventApiApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApis/${id}`,
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

    public async updateEventApi(
        id: string,
        requestBody: EventApi,
    ): Promise<EventApiResponse> {
        const options = this.updateEventApiApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiApiRequestOptions(
        id: string,
        requestBody: EventApi,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApis/${id}`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApiVersionsForEventApi(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): Promise<EventApiVersionsResponse> {
        const options = this.getEventApiVersionsForEventApiApiRequestOptions(
            eventApiId,
            id,
            displayName,
            ids,
            version,
            stateId,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionsForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions`,
            query: {
                'id': id,
                'displayName': displayName,
                'ids': ids,
                'version': version,
                'stateId': stateId,
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

    public async createEventApiVersionForEventApi(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse> {
        const options = this.createEventApiVersionForEventApiApiRequestOptions(
            eventApiId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<EventApiVersionResponse> {
        const options = this.getEventApiVersionForEventApiApiRequestOptions(
            eventApiId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}`,
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

    public async deleteEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteEventApiVersionForEventApiApiRequestOptions(
            eventApiId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}`,
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

    public async updateEventApiVersionForEventApi(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse> {
        const options = this.updateEventApiVersionForEventApiApiRequestOptions(
            eventApiId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApiVersionAsyncApiForEventApi(
        eventApiId: string,
        id: string,
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        format: 'json' | 'yaml' = 'json',
        version: string = '2.5.0',
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): Promise<string> {
        const options = this.getEventApiVersionAsyncApiForEventApiApiRequestOptions(
            eventApiId,
            id,
            showVersioning,
            includedExtensions,
            format,
            version,
            eventApiProductVersionId,
            planId,
            gatewayMessagingServiceIds,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionAsyncApiForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        format: 'json' | 'yaml' = 'json',
        version: string = '2.5.0',
        eventApiProductVersionId?: string,
        planId?: string,
        gatewayMessagingServiceIds?: Array<string>,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}/asyncApi`,
            query: {
                'showVersioning': showVersioning,
                'includedExtensions': includedExtensions,
                'format': format,
                'version': version,
                'eventApiProductVersionId': eventApiProductVersionId,
                'planId': planId,
                'gatewayMessagingServiceIds': gatewayMessagingServiceIds,
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

    public async updateEventApiVersionStateForEventApi(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): Promise<VersionedObjectStateChangeRequest> {
        const options = this.updateEventApiVersionStateForEventApiApiRequestOptions(
            eventApiId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionStateForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}/state`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApiVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        eventApiIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        customAttributes?: string,
    ): Promise<EventApiVersionsResponse> {
        const options = this.getEventApiVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            eventApiIds,
            ids,
            include,
            stateId,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        eventApiIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'eventApiIds': eventApiIds,
                'ids': ids,
                'include': include,
                'stateId': stateId,
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

    public async createEventApiVersion(
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse> {
        const options = this.createEventApiVersionApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiVersionApiRequestOptions(
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApiVersions`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async getEventApiVersion(
        versionId: string,
        include?: string,
    ): Promise<EventApiVersionResponse> {
        const options = this.getEventApiVersionApiRequestOptions(
            versionId,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionApiRequestOptions(
        versionId: string,
        include?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiVersions/${versionId}`,
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

    public async deleteEventApiVersion(
        versionId: string,
    ): Promise<void> {
        const options = this.deleteEventApiVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApiVersions/${versionId}`,
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

    public async updateEventApiVersion(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse> {
        const options = this.updateEventApiVersionApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionApiRequestOptions(
        versionId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApiVersions/${versionId}`,
            body: requestBody,
            mediaType: 'application/json',
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

    public async updateEventApiVersionState(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<StateChangeRequestResponse> {
        const options = this.updateEventApiVersionStateApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionStateApiRequestOptions(
        versionId: string,
        requestBody: EventApiVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApiVersions/${versionId}/state`,
            body: requestBody,
            mediaType: 'application/json',
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