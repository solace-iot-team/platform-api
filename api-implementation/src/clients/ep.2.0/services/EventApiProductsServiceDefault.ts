/* eslint-disable */

import type { EventApiProduct } from '../models/EventApiProduct';
import type { EventApiProductResponse } from '../models/EventApiProductResponse';
import type { EventApiProductsResponse } from '../models/EventApiProductsResponse';
import type { EventApiProductVersion } from '../models/EventApiProductVersion';
import type { EventApiProductVersionResponse } from '../models/EventApiProductVersionResponse';
import type { EventApiProductVersionsResponse } from '../models/EventApiProductVersionsResponse';
import type { GatewayMessagingService } from '../models/GatewayMessagingService';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { EventApiProductsService } from './EventApiProductsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventApiProductsServiceDefault implements EventApiProductsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEventApiProducts(
        pageSize: number = 20,
        pageNumber: number = 1,
        brokerType?: 'solace' | 'kafka',
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): Promise<EventApiProductsResponse> {
        const options = this.getEventApiProductsApiRequestOptions(
            pageSize,
            pageNumber,
            brokerType,
            name,
            ids,
            applicationDomainId,
            applicationDomainIds,
            shared,
            sort,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        brokerType?: 'solace' | 'kafka',
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProducts`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'brokerType': brokerType,
                'name': name,
                'ids': ids,
                'applicationDomainId': applicationDomainId,
                'applicationDomainIds': applicationDomainIds,
                'shared': shared,
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

    public async createEventApiProduct(
        requestBody: EventApiProduct,
    ): Promise<EventApiProductResponse> {
        const options = this.createEventApiProductApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiProductApiRequestOptions(
        requestBody: EventApiProduct,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApiProducts`,
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

    public async getEventApiProduct(
        id: string,
    ): Promise<EventApiProductResponse> {
        const options = this.getEventApiProductApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProducts/${id}`,
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

    public async deleteEventApiProduct(
        id: string,
    ): Promise<void> {
        const options = this.deleteEventApiProductApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApiProducts/${id}`,
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

    public async updateEventApiProduct(
        id: string,
        requestBody: EventApiProduct,
    ): Promise<EventApiProductResponse> {
        const options = this.updateEventApiProductApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiProductApiRequestOptions(
        id: string,
        requestBody: EventApiProduct,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApiProducts/${id}`,
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

    public async getEventApiProductVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse> {
        const options = this.getEventApiProductVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
            include,
            stateId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProductVersions`,
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

    public async getEventApiProductVersion(
        versionId: string,
        include: string,
    ): Promise<EventApiProductVersionResponse> {
        const options = this.getEventApiProductVersionApiRequestOptions(
            versionId,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductVersionApiRequestOptions(
        versionId: string,
        include: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProductVersions/${versionId}`,
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

    public async getEventApiProductVersionsForEventApiProduct(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse> {
        const options = this.getEventApiProductVersionsForEventApiProductApiRequestOptions(
            eventApiProductId,
            displayName,
            id,
            ids,
            version,
            stateId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductVersionsForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions`,
            query: {
                'displayName': displayName,
                'id': id,
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

    public async createEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse> {
        const options = this.createEventApiProductVersionForEventApiProductApiRequestOptions(
            eventApiProductId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions`,
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

    public async getEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<EventApiProductVersionResponse> {
        const options = this.getEventApiProductVersionForEventApiProductApiRequestOptions(
            eventApiProductId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions/${id}`,
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

    public async deleteEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteEventApiProductVersionForEventApiProductApiRequestOptions(
            eventApiProductId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions/${id}`,
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

    public async updateEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse> {
        const options = this.updateEventApiProductVersionForEventApiProductApiRequestOptions(
            eventApiProductId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions/${id}`,
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

    public async updateEventApiProductVersionStateForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<VersionedObjectStateChangeRequest> {
        const options = this.updateEventApiProductVersionStateForEventApiProductApiRequestOptions(
            eventApiProductId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventApiProductVersionStateForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventApiProducts/${eventApiProductId}/versions/${id}/state`,
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

    public async associateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): Promise<GatewayMessagingService> {
        const options = this.associateGatewayMessagingServiceToEapVersionApiRequestOptions(
            eventApiProductVersionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public associateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventApiProductVersions/${eventApiProductVersionId}/memAssociations`,
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

    public async disassociateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): Promise<void> {
        const options = this.disassociateGatewayMessagingServiceToEapVersionApiRequestOptions(
            eventApiProductVersionId,
            memAssociationId,
        );
        const result = await __request(options);
        return result.body;
    }

    public disassociateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventApiProductVersions/${eventApiProductVersionId}/memAssociations/${memAssociationId}`,
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