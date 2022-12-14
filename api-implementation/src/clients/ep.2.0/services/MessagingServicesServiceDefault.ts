/* eslint-disable */

import type { MessagingService } from '../models/MessagingService';
import type { MessagingServiceOperation } from '../models/MessagingServiceOperation';
import type { MessagingServiceOperationResponse } from '../models/MessagingServiceOperationResponse';
import type { MessagingServiceRemoveAssociation } from '../models/MessagingServiceRemoveAssociation';
import type { MessagingServiceResponse } from '../models/MessagingServiceResponse';
import type { MessagingServicesResponse } from '../models/MessagingServicesResponse';
import type { MessagingServicesService } from './MessagingServicesService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class MessagingServicesServiceDefault implements MessagingServicesService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getMessagingServices(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        messagingServiceType?: string,
        runtimeAgentId?: string,
        eventMeshId?: string,
        eventManagementAgentId?: string,
    ): Promise<MessagingServicesResponse> {
        const options = this.getMessagingServicesApiRequestOptions(
            pageSize,
            pageNumber,
            sort,
            ids,
            messagingServiceType,
            runtimeAgentId,
            eventMeshId,
            eventManagementAgentId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServicesApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        messagingServiceType?: string,
        runtimeAgentId?: string,
        eventMeshId?: string,
        eventManagementAgentId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServices`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
                'ids': ids,
                'messagingServiceType': messagingServiceType,
                'runtimeAgentId': runtimeAgentId,
                'eventMeshId': eventMeshId,
                'eventManagementAgentId': eventManagementAgentId,
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

    public async createMessagingService(
        requestBody: MessagingService,
    ): Promise<MessagingServiceResponse> {
        const options = this.createMessagingServiceApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createMessagingServiceApiRequestOptions(
        requestBody: MessagingService,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/messagingServices`,
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

    public async getMessagingService(
        id: string,
    ): Promise<MessagingServiceResponse> {
        const options = this.getMessagingServiceApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getMessagingServiceApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/messagingServices/${id}`,
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

    public async deleteMessagingService(
        id: string,
    ): Promise<void> {
        const options = this.deleteMessagingServiceApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteMessagingServiceApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/messagingServices/${id}`,
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

    public async updateMessagingService(
        id: string,
        requestBody: MessagingService,
    ): Promise<MessagingServiceResponse> {
        const options = this.updateMessagingServiceApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateMessagingServiceApiRequestOptions(
        id: string,
        requestBody: MessagingService,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/messagingServices/${id}`,
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

    public async removeAssociationMessagingService(
        id: string,
        requestBody: MessagingServiceRemoveAssociation,
    ): Promise<MessagingServiceResponse> {
        const options = this.removeAssociationMessagingServiceApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public removeAssociationMessagingServiceApiRequestOptions(
        id: string,
        requestBody: MessagingServiceRemoveAssociation,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PUT',
            path: `/api/v2/architecture/messagingServices/${id}/removeAssociation`,
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

    public async scanStartMessagingService(
        messagingServiceId: string,
        requestBody: MessagingServiceOperation,
    ): Promise<MessagingServiceOperationResponse> {
        const options = this.scanStartMessagingServiceApiRequestOptions(
            messagingServiceId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public scanStartMessagingServiceApiRequestOptions(
        messagingServiceId: string,
        requestBody: MessagingServiceOperation,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PUT',
            path: `/api/v2/architecture/messagingServices/${messagingServiceId}/scanStart`,
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