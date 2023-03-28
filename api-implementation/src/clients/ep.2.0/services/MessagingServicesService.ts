/* eslint-disable */

import type { MessagingService } from '../models/MessagingService';
import type { MessagingServiceOperation } from '../models/MessagingServiceOperation';
import type { MessagingServiceOperationResponse } from '../models/MessagingServiceOperationResponse';
import type { MessagingServiceRemoveAssociation } from '../models/MessagingServiceRemoveAssociation';
import type { MessagingServiceResponse } from '../models/MessagingServiceResponse';
import type { MessagingServicesResponse } from '../models/MessagingServicesResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface MessagingServicesService {

    /**
     * (Beta) Get a list of messaging services
     * Use this API to get a list of messaging services that match the given parameters.
     * @param pageSize The number of messaging services to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the messaging services.
     * @param messagingServiceType Match only messaging services of the given type
     * @param runtimeAgentId Match only messaging services in the given runtimeAgentId
     * @param eventMeshId Match only messaging services in the given eventMeshId
     * @param eventManagementAgentId
     * @returns MessagingServicesResponse The list of messaging services and the accompanying metadata.
     */
    getMessagingServices(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        messagingServiceType?: string,
        runtimeAgentId?: string,
        eventMeshId?: string,
        eventManagementAgentId?: string,
    ): Promise<MessagingServicesResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a list of messaging services
     * Use this API to get a list of messaging services that match the given parameters.
     * @param pageSize The number of messaging services to get per page.
     * @param pageNumber The page number to get.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param ids The IDs of the messaging services.
     * @param messagingServiceType Match only messaging services of the given type
     * @param runtimeAgentId Match only messaging services in the given runtimeAgentId
     * @param eventMeshId Match only messaging services in the given eventMeshId
     * @param eventManagementAgentId
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServicesApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        sort?: string,
        ids?: Array<string>,
        messagingServiceType?: string,
        runtimeAgentId?: string,
        eventMeshId?: string,
        eventManagementAgentId?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Create a messaging service
     * Use this API to create a messaging service.
     * @param requestBody The messaging service.
     * @returns MessagingServiceResponse Created a messaging service. The newly saved messaging service is returned in the response body.
     */
    createMessagingService(
        requestBody: MessagingService,
    ): Promise<MessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Create a messaging service
     * Use this API to create a messaging service.
     * @param requestBody The messaging service.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createMessagingServiceApiRequestOptions(
        requestBody: MessagingService,
    ): ApiRequestOptions;

    /**
     * (Beta) Get a messaging service
     * Use this API to get a single messaging service by its ID.
     * @param id The ID of the messaging service.
     * @returns MessagingServiceResponse The messaging service.
     */
    getMessagingService(
        id: string,
    ): Promise<MessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a messaging service
     * Use this API to get a single messaging service by its ID.
     * @param id The ID of the messaging service.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getMessagingServiceApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Delete a messaging service
     * Use this API to delete a messaging service.
     * @param id The ID of the messaging service.
     * @returns void
     */
    deleteMessagingService(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Delete a messaging service
     * Use this API to delete a messaging service.
     * @param id The ID of the messaging service.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteMessagingServiceApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Update a messaging service
     * Use this API to update a messaging service. You only need to specify the fields that need to be updated. However, if you want to update anything under subObjects (i.e. anything inside messagingServiceConnections object), you need to provide the original messagingServiceConnections with the updated fields instead of just providing the changed fields.
     * @param id The ID of the messaging service to update.
     * @param requestBody The messaging service.
     * @returns MessagingServiceResponse The updated messaging service.
     */
    updateMessagingService(
        id: string,
        requestBody: MessagingService,
    ): Promise<MessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Update a messaging service
     * Use this API to update a messaging service. You only need to specify the fields that need to be updated. However, if you want to update anything under subObjects (i.e. anything inside messagingServiceConnections object), you need to provide the original messagingServiceConnections with the updated fields instead of just providing the changed fields.
     * @param id The ID of the messaging service to update.
     * @param requestBody The messaging service.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateMessagingServiceApiRequestOptions(
        id: string,
        requestBody: MessagingService,
    ): ApiRequestOptions;

    /**
     * (Beta) Initiate a scan request to run against a messaging service
     * Use this API to make a scan request on a messaging service.
     * @param messagingServiceId The ID of the messaging service.
     * @param requestBody The messaging service.
     * @returns MessagingServiceOperationResponse Requested a scan on the messaging service. The operation object with ID set as ID of the created scan Object is returned in the response body.
     */
    scanStartMessagingService(
        messagingServiceId: string,
        requestBody: MessagingServiceOperation,
    ): Promise<MessagingServiceOperationResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Initiate a scan request to run against a messaging service
     * Use this API to make a scan request on a messaging service.
     * @param messagingServiceId The ID of the messaging service.
     * @param requestBody The messaging service.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    scanStartMessagingServiceApiRequestOptions(
        messagingServiceId: string,
        requestBody: MessagingServiceOperation,
    ): ApiRequestOptions;

    /**
     * (Beta) Remove an association between an messaging service and the requested entity
     * Use this API to remove the association between a messaging service and either of EVENT_MESH or EVENT_MANAGEMENT_AGENT.
     * @param id The ID of the messaging service.
     * @param requestBody The association object with the value matching either EVENT_MESH or EVENT_MANAGEMENT_AGENT.
     * @returns MessagingServiceResponse The updated messaging service, e.g. if the API request body had {"association": "EVENT_MESH"} then the resulting object would not have eventMeshId attribute.
     */
    removeAssociationMessagingService(
        id: string,
        requestBody: MessagingServiceRemoveAssociation,
    ): Promise<MessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Remove an association between an messaging service and the requested entity
     * Use this API to remove the association between a messaging service and either of EVENT_MESH or EVENT_MANAGEMENT_AGENT.
     * @param id The ID of the messaging service.
     * @param requestBody The association object with the value matching either EVENT_MESH or EVENT_MANAGEMENT_AGENT.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    removeAssociationMessagingServiceApiRequestOptions(
        id: string,
        requestBody: MessagingServiceRemoveAssociation,
    ): ApiRequestOptions;

}