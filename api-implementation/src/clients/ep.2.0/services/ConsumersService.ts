/* eslint-disable */

import type { Consumer } from '../models/Consumer';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ConsumersService {

    /**
     * Gets the consumer objects
     * Use this API to retrieve a list of consumers that match the given parameters.
     * @param pageSize The number of consumers to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param applicationVersionIds Match only consumers with the given application version IDs, separated by commas.
     * @param ids Match only consumers with the given IDs separated by commas.
     * @returns any Retrieve a list of consumers and the accompanying metadata.
     */
    getConsumers(
        pageSize: number,
        pageNumber: number,
        applicationVersionIds?: Array<string>,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the consumer objects
     * Use this API to retrieve a list of consumers that match the given parameters.
     * @param pageSize The number of consumers to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
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
     * Creates a consumer object
     * Use this API to create a consumer.
     * @param requestBody The consumer object.
     * @returns any Created a consumer. Returns the newly saved consumer object in the response body.
     */
    createConsumer(
        requestBody: Consumer,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates a consumer object
     * Use this API to create a consumer.
     * @param requestBody The consumer object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createConsumerApiRequestOptions(
        requestBody: Consumer,
    ): ApiRequestOptions;

    /**
     * Retrieves a consumer object
     * Use this API to retrieve a single consumer by its ID.
     * @param id The ID of the consumer object.
     * @returns any The consumer object.
     */
    getConsumer(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a consumer object
     * Use this API to retrieve a single consumer by its ID.
     * @param id The ID of the consumer object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes a consumer object
     * Use this API to delete a consumer.
     * @param id The ID of the consumer
     * @returns void
     */
    deleteConsumer(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes a consumer object
     * Use this API to delete a consumer.
     * @param id The ID of the consumer
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteConsumerApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update a consumer object
     * Use this API to update a consumer.
     * @param id The ID of the consumer
     * @param requestBody The consumer object.
     * @returns any Updated a consumer. Returns the newly saved consumer object in the response body.
     */
    updateConsumer(
        id: string,
        requestBody: Consumer,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update a consumer object
     * Use this API to update a consumer.
     * @param id The ID of the consumer
     * @param requestBody The consumer object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateConsumerApiRequestOptions(
        id: string,
        requestBody: Consumer,
    ): ApiRequestOptions;

}