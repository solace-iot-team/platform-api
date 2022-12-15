/* eslint-disable */

import type { EventManagementAgent } from '../models/EventManagementAgent';
import type { EventManagementAgentResponse } from '../models/EventManagementAgentResponse';
import type { EventManagementAgentsResponse } from '../models/EventManagementAgentsResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventManagementAgentsService {

    /**
     * (Beta) Retrieves a list of EMAs
     * Use this API to retrieve a list of EMAs that match the given parameters.
     * @param pageSize The number of EMAs to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the EMAs.
     * @param createdBy Match only EMAs created by this user
     * @param eventManagementAgentRegionId Match only EMAs in the given EMA-Region
     * @param include Specify extra data to be included, options are: referencedByMessagingServiceIds
     * @returns EventManagementAgentsResponse The list of EMAs and the accompanying metadata.
     */
    getEventManagementAgents(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        createdBy?: string,
        eventManagementAgentRegionId?: string,
        include?: string,
    ): Promise<EventManagementAgentsResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves a list of EMAs
     * Use this API to retrieve a list of EMAs that match the given parameters.
     * @param pageSize The number of EMAs to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the EMAs.
     * @param createdBy Match only EMAs created by this user
     * @param eventManagementAgentRegionId Match only EMAs in the given EMA-Region
     * @param include Specify extra data to be included, options are: referencedByMessagingServiceIds
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventManagementAgentsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        createdBy?: string,
        eventManagementAgentRegionId?: string,
        include?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Creates an EMA object
     * Use this API to create an EMA object.
     * @param requestBody The EMA object.
     * @returns EventManagementAgentResponse Created an EMA. The newly saved object is returned in the response body.
     */
    createEventManagementAgent(
        requestBody: EventManagementAgent,
    ): Promise<EventManagementAgentResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Creates an EMA object
     * Use this API to create an EMA object.
     * @param requestBody The EMA object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventManagementAgentApiRequestOptions(
        requestBody: EventManagementAgent,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves an EMA object
     * Use this API to retrieve a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @param include Specify extra data to be included, options are: referencedByMessagingServiceIds
     * @returns EventManagementAgentResponse The EMA object.
     */
    getEventManagementAgent(
        id: string,
        include?: string,
    ): Promise<EventManagementAgentResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves an EMA object
     * Use this API to retrieve a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @param include Specify extra data to be included, options are: referencedByMessagingServiceIds
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventManagementAgentApiRequestOptions(
        id: string,
        include?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Deletes an EMA object
     * Use this API to delete an EMA.
     * @param id The ID of the EMA object.
     * @returns void
     */
    deleteEventManagementAgent(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Deletes an EMA object
     * Use this API to delete an EMA.
     * @param id The ID of the EMA object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventManagementAgentApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Updates an EMA object
     * Use this API to update an EMA. You only need to specify the fields that need to be updated.
     * @param id The ID of the EMA object to update.
     * @param requestBody The EMA object.
     * @returns EventManagementAgentResponse The updated EMA object.
     */
    updateEventManagementAgent(
        id: string,
        requestBody: EventManagementAgent,
    ): Promise<EventManagementAgentResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Updates an EMA object
     * Use this API to update an EMA. You only need to specify the fields that need to be updated.
     * @param id The ID of the EMA object to update.
     * @param requestBody The EMA object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventManagementAgentApiRequestOptions(
        id: string,
        requestBody: EventManagementAgent,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves the raw configs in string format for an EMA object
     * Use this API to retrieve the raw configs for a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @returns string The EMA config in yaml structure.
     */
    getEventManagementAgentConfigRaw(
        id: string,
    ): Promise<string>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves the raw configs in string format for an EMA object
     * Use this API to retrieve the raw configs for a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventManagementAgentConfigRawApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves the raw configs in file format for an EMA object
     * Use this API to retrieve the raw configs for a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @returns any The EMA config in a yaml file named application.yml.
     */
    getEventManagementAgentConfigFile(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves the raw configs in file format for an EMA object
     * Use this API to retrieve the raw configs for a single EMA by its ID.
     * @param id The ID of the EMA object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventManagementAgentConfigFileApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

}