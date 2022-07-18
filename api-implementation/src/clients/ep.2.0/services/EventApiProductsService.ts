/* eslint-disable */

import type { EventApiProductsResponse } from '../models/EventApiProductsResponse';
import type { EventApiProductVersionsResponse } from '../models/EventApiProductVersionsResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApiProductsService {

    /**
     * Gets the event API product(s) objects
     * Use this API to retrieve a list of event API product(s) that match the given parameters.
     * @param pageSize The number of event API product(s) to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event API product to match on.
     * @param ids
     * @param applicationDomainId
     * @param applicationDomainIds
     * @param shared
     * @param sort
     * @returns EventApiProductsResponse The list of event API product(s) and the accompanying metadata.
     */
    listEventApiProducts(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared: boolean,
        sort?: string,
    ): Promise<EventApiProductsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Gets the event API product(s) objects
     * Use this API to retrieve a list of event API product(s) that match the given parameters.
     * @param pageSize The number of event API product(s) to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the event API product to match on.
     * @param ids
     * @param applicationDomainId
     * @param applicationDomainIds
     * @param shared
     * @param sort
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    listEventApiProductsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared: boolean,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * Gets event API product version objects
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions objects with the given version.
     * @param stateId Match event API product versions objects with the given stateId.
     * @returns EventApiProductVersionsResponse Retrieve a list of event API product versions.
     */
    listApiProductVersion(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Gets event API product version objects
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions objects with the given version.
     * @param stateId Match event API product versions objects with the given stateId.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    listApiProductVersionApiRequestOptions(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): ApiRequestOptions;

}