/* eslint-disable */

import type { EventApiProductsResponse } from '../models/EventApiProductsResponse';
import type { EventApiProductVersionsResponse } from '../models/EventApiProductVersionsResponse';
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

    public async listEventApiProducts(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared: boolean = true,
        sort?: string,
    ): Promise<EventApiProductsResponse> {
        const options = this.listEventApiProductsApiRequestOptions(
            pageSize,
            pageNumber,
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

    public listEventApiProductsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared: boolean = true,
        sort?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/eventApiProducts`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
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

    public async listApiProductVersion(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse> {
        const options = this.listApiProductVersionApiRequestOptions(
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

    public listApiProductVersionApiRequestOptions(
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

}