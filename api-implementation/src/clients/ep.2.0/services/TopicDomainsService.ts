/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface TopicDomainsService {

    /**
     * Get a list of the topic domains
     * Use this API to get a list of topic domains that match the given parameters.
     * @param pageSize The number of topic domains to get per page.
     * @param pageNumber The page number to get.
     * @param ids Match only topic domains with the given IDs separated by commas.
     * @param brokerType Match only topic domains with the given brokerType.
     * @param applicationDomainIds Match only topic domains with the given application domain ids separated by commas.
     * @param applicationDomainId
     * @returns any Get a list of topic domains and the accompanying metadata.
     */
    getTopicDomains(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        brokerType?: string,
        applicationDomainIds?: Array<string>,
        applicationDomainId?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of the topic domains
     * Use this API to get a list of topic domains that match the given parameters.
     * @param pageSize The number of topic domains to get per page.
     * @param pageNumber The page number to get.
     * @param ids Match only topic domains with the given IDs separated by commas.
     * @param brokerType Match only topic domains with the given brokerType.
     * @param applicationDomainIds Match only topic domains with the given application domain ids separated by commas.
     * @param applicationDomainId
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getTopicDomainsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        brokerType?: string,
        applicationDomainIds?: Array<string>,
        applicationDomainId?: string,
    ): ApiRequestOptions;

    /**
     * Create a topic domain
     * Topic Domains govern the format of topic addresses within an application domain
     * @param requestBody
     * @returns any Created a topic domain. Returns the newly saved topic domain in the response body.
     */
    createTopicDomain(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create a topic domain
     * Topic Domains govern the format of topic addresses within an application domain
     * @param requestBody
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createTopicDomainApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get a topic domain
     * Use this API to get a single topic domain by its ID.
     * @param id The ID of the topic domain.
     * @returns any The topic domain.
     */
    getTopicDomain(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a topic domain
     * Use this API to get a single topic domain by its ID.
     * @param id The ID of the topic domain.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete a topic domain
     * Use this API to delete a topic domain.
     * @param id The ID of the topic domain
     * @returns void
     */
    deleteTopicDomain(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete a topic domain
     * Use this API to delete a topic domain.
     * @param id The ID of the topic domain
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}