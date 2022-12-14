/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EnvironmentsService {

    /**
     * Gets the environment objects
     * Use this API to list all environments.
     * @param pageSize The number of events to get per page.
     * @param pageNumber The page number to get.
     * @param sort
     * @param like
     * @returns any Retrieve a list of environments and the accompanying metadata.
     */
    getEnvironments(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        like?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the environment objects
     * Use this API to list all environments.
     * @param pageSize The number of events to get per page.
     * @param pageNumber The page number to get.
     * @param sort
     * @param like
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnvironmentsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        like?: string,
    ): ApiRequestOptions;

    /**
     * Retrieves an environment object
     * Use this API to retrieve a single environment by its ID.
     * @param id The ID of the environment object.
     * @returns any The environment object.
     */
    getEnvironment(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an environment object
     * Use this API to retrieve a single environment by its ID.
     * @param id The ID of the environment object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnvironmentApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}