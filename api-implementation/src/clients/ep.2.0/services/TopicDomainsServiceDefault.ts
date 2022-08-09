/* eslint-disable */

import type { TopicDomainsService } from './TopicDomainsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class TopicDomainsServiceDefault implements TopicDomainsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getTopicDomains(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        brokerType?: string,
        applicationDomainIds?: Array<string>,
        applicationDomainId?: string,
    ): Promise<any> {
        const options = this.getTopicDomainsApiRequestOptions(
            pageSize,
            pageNumber,
            ids,
            brokerType,
            applicationDomainIds,
            applicationDomainId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getTopicDomainsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        ids?: Array<string>,
        brokerType?: string,
        applicationDomainIds?: Array<string>,
        applicationDomainId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/topicDomains`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'ids': ids,
                'brokerType': brokerType,
                'applicationDomainIds': applicationDomainIds,
                'applicationDomainId': applicationDomainId,
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

    public async createTopicDomain(
        requestBody: any,
    ): Promise<any> {
        const options = this.createTopicDomainApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createTopicDomainApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/topicDomains`,
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

    public async getTopicDomain(
        id: string,
    ): Promise<any> {
        const options = this.getTopicDomainApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/topicDomains/${id}`,
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

    public async deleteTopicDomain(
        id: string,
    ): Promise<void> {
        const options = this.deleteTopicDomainApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/topicDomains/${id}`,
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