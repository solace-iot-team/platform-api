/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface TopicDomainsService {

    /**
     * Gets the topic domain objects
     * Use this API to retrieve a list of topic domains that match the given parameters.
     * @param pageSize The number of topic domains to get per page.
     * @param pageNumber The page number to get.
     * @param ids Match only topic domains with the given IDs separated by commas.
     * @param brokerType Match only topic domains with the given brokerType.
     * @param applicationDomainIds Match only topic domains with the given application domain ids separated by commas.
     * @param applicationDomainId
     * @returns any Retrieve a list of topic domains and the accompanying metadata.
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
     * Gets the topic domain objects
     * Use this API to retrieve a list of topic domains that match the given parameters.
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
     * Creates a topic domain object
     * Topic Domains govern the format of topic addresses within an application domain
     * @param requestBody
     * @returns any Created a topic domain. Returns the newly saved topic domain object in the response body.
     */
    createTopicDomain(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a topic domain object
     * Topic Domains govern the format of topic addresses within an application domain
     * @param requestBody
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createTopicDomainApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves a topic domain object
     * Use this API to retrieve a single topic domain by its ID.
     * @param id The ID of the topic domain object.
     * @returns any The topic domain object.
     */
    getTopicDomain(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a topic domain object
     * Use this API to retrieve a single topic domain by its ID.
     * @param id The ID of the topic domain object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes a topic domain object
     * Use this API to delete a topic domain.
     * @param id The ID of the topic domain
     * @returns void
     */
    deleteTopicDomain(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a topic domain object
     * Use this API to delete a topic domain.
     * @param id The ID of the topic domain
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteTopicDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}