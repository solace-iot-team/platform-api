/* eslint-disable */

import type { EventApi } from '../models/EventApi';
import type { EventApiResponse } from '../models/EventApiResponse';
import type { EventApisResponse } from '../models/EventApisResponse';
import type { EventApiVersion } from '../models/EventApiVersion';
import type { EventApiVersionResponse } from '../models/EventApiVersionResponse';
import type { EventApiVersionsResponse } from '../models/EventApiVersionsResponse';
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

    public async getEventApis(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
        eventApiVersionIds?: Array<string>,
    ): Promise<EventApisResponse> {
        const options = this.getEventApisApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            ids,
            applicationDomainId,
            applicationDomainIds,
            shared,
            sort,
            eventApiVersionIds,
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
        shared?: boolean,
        sort?: string,
        eventApiVersionIds?: Array<string>,
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
                'shared': shared,
                'sort': sort,
                'eventApiVersionIds': eventApiVersionIds,
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

    public async getEventApiVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): Promise<EventApiVersionsResponse> {
        const options = this.getEventApiVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
            include,
            stateId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
                'include': include,
                'stateId': stateId,
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

    public async getEventApiVersion(
        versionId: string,
        include: string,
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
        include: string,
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

    public async deleteEventApiVersionByVersionId(
        versionId: string,
    ): Promise<void> {
        const options = this.deleteEventApiVersionByVersionIdApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiVersionByVersionIdApiRequestOptions(
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

    public async updateEventApiVersionByVersionId(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<EventApiVersionResponse> {
        const options = this.updateEventApiVersionByVersionIdApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionByVersionIdApiRequestOptions(
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

    public async getEventApiVersionsForEventApi(
        eventApiId: string,
        id: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiVersionsResponse> {
        const options = this.getEventApiVersionsForEventApiApiRequestOptions(
            eventApiId,
            id,
            displayName,
            ids,
            version,
            stateId,
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

    public async updateEventApiVersionStateByEventApiVersionId(
        versionId: string,
        requestBody: EventApiVersion,
    ): Promise<VersionedObjectStateChangeRequest> {
        const options = this.updateEventApiVersionStateByEventApiVersionIdApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiVersionStateByEventApiVersionIdApiRequestOptions(
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

    public async getEventApiVersionAsyncApiForEventApi(
        eventApiId: string,
        id: string,
        format: 'json' | 'yaml' = 'json',
        version: '2.0.0' = '2.0.0',
    ): Promise<any> {
        const options = this.getEventApiVersionAsyncApiForEventApiApiRequestOptions(
            eventApiId,
            id,
            format,
            version,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiVersionAsyncApiForEventApiApiRequestOptions(
        eventApiId: string,
        id: string,
        format: 'json' | 'yaml' = 'json',
        version: '2.0.0' = '2.0.0',
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApis/${eventApiId}/versions/${id}/asyncApi`,
            query: {
                'format': format,
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

    public async getAsyncApiForEventApiVersion(
        eventApiVersionId: string,
        format: 'json' | 'yaml' = 'json',
        version: '2.0.0' = '2.0.0',
        asyncApiVersion?: '2.0.0',
    ): Promise<any> {
        const options = this.getAsyncApiForEventApiVersionApiRequestOptions(
            eventApiVersionId,
            format,
            version,
            asyncApiVersion,
        );
        const result = await __request(options);
        return result.body;
    }

    public getAsyncApiForEventApiVersionApiRequestOptions(
        eventApiVersionId: string,
        format: 'json' | 'yaml' = 'json',
        version: '2.0.0' = '2.0.0',
        asyncApiVersion?: '2.0.0',
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiVersions/${eventApiVersionId}/asyncApi`,
            query: {
                'format': format,
                'version': version,
                'asyncApiVersion': asyncApiVersion,
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

}