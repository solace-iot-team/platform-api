/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ConfigurationsService {

    /**
     * (Beta) Get a list of configurations
     * Use this API to get a list of configurations that match the given parameters.
     * @param pageSize The number of configurations to get per page.
     * @param pageNumber The page number to get.
     * @param messagingServiceIds Match only configurations with the given messaging service IDs separated by commas.
     * @param ids Match only configurations with the given IDs separated by commas.
     * @param configurationTypeIds Match only configurations with the given configuration type IDs separated by commas.<br>Refer <a href="./cloud/reference/getConfigurationTypes">here</a> for details on configuration types.
     * @param entityTypes Match only configurations with the given entity type values separated by commas.
     * @param entityIds Match only configurations with the given entity IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns any Get a list of configurations and the accompanying metadata.
     */
    getConfigurations(
        pageSize: number,
        pageNumber: number,
        messagingServiceIds?: Array<string>,
        ids?: Array<string>,
        configurationTypeIds?: Array<string>,
        entityTypes?: Array<string>,
        entityIds?: Array<string>,
        sort?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a list of configurations
     * Use this API to get a list of configurations that match the given parameters.
     * @param pageSize The number of configurations to get per page.
     * @param pageNumber The page number to get.
     * @param messagingServiceIds Match only configurations with the given messaging service IDs separated by commas.
     * @param ids Match only configurations with the given IDs separated by commas.
     * @param configurationTypeIds Match only configurations with the given configuration type IDs separated by commas.<br>Refer <a href="./cloud/reference/getConfigurationTypes">here</a> for details on configuration types.
     * @param entityTypes Match only configurations with the given entity type values separated by commas.
     * @param entityIds Match only configurations with the given entity IDs separated by commas.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConfigurationsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        messagingServiceIds?: Array<string>,
        ids?: Array<string>,
        configurationTypeIds?: Array<string>,
        entityTypes?: Array<string>,
        entityIds?: Array<string>,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Get a configuration
     * Use this API to get a single configuration by its ID.
     * @param id The ID of the configuration.
     * @returns any The configuration.
     */
    getConfiguration(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a configuration
     * Use this API to get a single configuration by its ID.
     * @param id The ID of the configuration.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConfigurationApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}