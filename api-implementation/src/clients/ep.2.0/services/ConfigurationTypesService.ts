/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ConfigurationTypesService {

    /**
     * (Beta) Get a list of configuration types
     * Use this API to get a list of configuration types that match the given parameters.
     * @param pageSize The number of configuration types to get per page.
     * @param pageNumber The page number to get.
     * @param ids Match only configuration types with the given IDs separated by commas.
     * @param names Match only configuration types with the given names separated by commas.
     * @param associatedEntityTypes Match only configuration types with the given associated entity type values separated by commas.
     * @param brokerType Match only configuration types with the given broker type.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns any Get a list of configuration types and the accompanying metadata.
     */
    getConfigurationTypes(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        names?: Array<string>,
        associatedEntityTypes?: Array<string>,
        brokerType?: string,
        sort?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a list of configuration types
     * Use this API to get a list of configuration types that match the given parameters.
     * @param pageSize The number of configuration types to get per page.
     * @param pageNumber The page number to get.
     * @param ids Match only configuration types with the given IDs separated by commas.
     * @param names Match only configuration types with the given names separated by commas.
     * @param associatedEntityTypes Match only configuration types with the given associated entity type values separated by commas.
     * @param brokerType Match only configuration types with the given broker type.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConfigurationTypesApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        names?: Array<string>,
        associatedEntityTypes?: Array<string>,
        brokerType?: string,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Get a configuration type
     * Use this API to get a single configuration type by its ID.
     * @param id The ID of the configuration type.
     * @returns any The configuration type.
     */
    getConfigurationType(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a configuration type
     * Use this API to get a single configuration type by its ID.
     * @param id The ID of the configuration type.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getConfigurationTypeApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}