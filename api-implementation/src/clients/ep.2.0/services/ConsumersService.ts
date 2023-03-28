/* eslint-disable */

import type { Consumer } from '../models/Consumer';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ConsumersService {

    /**
     * Get a list of consumers
     * Use this API to get a list of consumers that match the given parameters.
     * @param pageSize The number of consumers to get per page.
     * @param pageNumber The page number to get.
     * @param applicationVersionIds Match only consumers with the given application version IDs, separated by commas.
     * @param ids Match only consumers with the given IDs separated by commas.
     * @returns any Get a list of consumers and the accompanying metadata.
     */
    getConsumers(
        pageSize: number,
        pageNumber: number,
        applicationVersionIds?: Array<string>,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of consumers
     * Use this API to get a list of consumers that match the given parameters.
     * @param pageSize The number of consumers to get per page.
     * @param pageNumber The page number to get.
     * @param applicationVersionIds Match only consumers with the given application version IDs, separated by commas.
     * @param ids Match only consumers with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConsumersApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        applicationVersionIds?: Array<string>,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Create a consumer
     * Use this API to create a consumer.
     * @param requestBody The consumer.
     * @returns any Created a consumer. Returns the newly saved consumer in the response body.
     */
    createConsumer(
        requestBody: Consumer,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create a consumer
     * Use this API to create a consumer.
     * @param requestBody The consumer.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createConsumerApiRequestOptions(
        requestBody: Consumer,
    ): ApiRequestOptions;

    /**
     * Get a consumer
     * Use this API to get a single consumer by its ID.
     * @param id The ID of the consumer.
     * @returns any The consumer.
     */
    getConsumer(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a consumer
     * Use this API to get a single consumer by its ID.
     * @param id The ID of the consumer.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete a consumer
     * Use this API to delete a consumer.
     * @param id The ID of the consumer
     * @returns void
     */
    deleteConsumer(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete a consumer
     * Use this API to delete a consumer.
     * @param id The ID of the consumer
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update a consumer
     * Use this API to update a consumer.
     * @param id The ID of the consumer.
     * @param requestBody The consumer.
     * @returns any Updated a consumer. Returns the newly saved consumer in the response body.
     */
    updateConsumer(
        id: string,
        requestBody: Consumer,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update a consumer
     * Use this API to update a consumer.
     * @param id The ID of the consumer.
     * @param requestBody The consumer.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateConsumerApiRequestOptions(
        id: string,
        requestBody: Consumer,
    ): ApiRequestOptions;

}