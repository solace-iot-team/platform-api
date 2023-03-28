/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EnvironmentsService {

    /**
     * Get a list of environments
     * Use this API to get a list of all environments.
     * @param pageSize The number of environments to get per page.
     * @param pageNumber The page number to get.
     * @param sort
     * @param like
     * @returns any Get a list of environments and the accompanying metadata.
     */
    getEnvironments(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        like?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of environments
     * Use this API to get a list of all environments.
     * @param pageSize The number of environments to get per page.
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
     * Get an environment
     * Use this API to get a single environment by its ID.
     * @param id The ID of the environment.
     * @returns any The environment.
     */
    getEnvironment(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an environment
     * Use this API to get a single environment by its ID.
     * @param id The ID of the environment.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnvironmentApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}