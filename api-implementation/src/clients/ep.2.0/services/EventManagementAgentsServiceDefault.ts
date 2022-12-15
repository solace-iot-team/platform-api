/* eslint-disable */

import type { EventManagementAgent } from '../models/EventManagementAgent';
import type { EventManagementAgentResponse } from '../models/EventManagementAgentResponse';
import type { EventManagementAgentsResponse } from '../models/EventManagementAgentsResponse';
import type { EventManagementAgentsService } from './EventManagementAgentsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class EventManagementAgentsServiceDefault implements EventManagementAgentsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getEventManagementAgents(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        createdBy?: string,
        eventManagementAgentRegionId?: string,
        include?: string,
    ): Promise<EventManagementAgentsResponse> {
        const options = this.getEventManagementAgentsApiRequestOptions(
            pageSize,
            pageNumber,
            sort,
            ids,
            createdBy,
            eventManagementAgentRegionId,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventManagementAgentsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        sort?: string,
        ids?: Array<string>,
        createdBy?: string,
        eventManagementAgentRegionId?: string,
        include?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventManagementAgents`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'sort': sort,
                'ids': ids,
                'createdBy': createdBy,
                'eventManagementAgentRegionId': eventManagementAgentRegionId,
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

    public async createEventManagementAgent(
        requestBody: EventManagementAgent,
    ): Promise<EventManagementAgentResponse> {
        const options = this.createEventManagementAgentApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createEventManagementAgentApiRequestOptions(
        requestBody: EventManagementAgent,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/eventManagementAgents`,
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

    public async getEventManagementAgent(
        id: string,
        include?: string,
    ): Promise<EventManagementAgentResponse> {
        const options = this.getEventManagementAgentApiRequestOptions(
            id,
            include,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventManagementAgentApiRequestOptions(
        id: string,
        include?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventManagementAgents/${id}`,
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

    public async deleteEventManagementAgent(
        id: string,
    ): Promise<void> {
        const options = this.deleteEventManagementAgentApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteEventManagementAgentApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/eventManagementAgents/${id}`,
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

    public async updateEventManagementAgent(
        id: string,
        requestBody: EventManagementAgent,
    ): Promise<EventManagementAgentResponse> {
        const options = this.updateEventManagementAgentApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateEventManagementAgentApiRequestOptions(
        id: string,
        requestBody: EventManagementAgent,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/eventManagementAgents/${id}`,
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

    public async getEventManagementAgentConfigRaw(
        id: string,
    ): Promise<string> {
        const options = this.getEventManagementAgentConfigRawApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventManagementAgentConfigRawApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventManagementAgents/${id}/configuration/raw`,
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

    public async getEventManagementAgentConfigFile(
        id: string,
    ): Promise<any> {
        const options = this.getEventManagementAgentConfigFileApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getEventManagementAgentConfigFileApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventManagementAgents/${id}/configuration/file`,
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