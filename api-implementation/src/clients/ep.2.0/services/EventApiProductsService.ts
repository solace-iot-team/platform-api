/* eslint-disable */

import type { EventApiProduct } from '../models/EventApiProduct';
import type { EventApiProductResponse } from '../models/EventApiProductResponse';
import type { EventApiProductVersion } from '../models/EventApiProductVersion';
import type { EventApiProductVersionResponse } from '../models/EventApiProductVersionResponse';
import type { EventApiProductVersionsResponse } from '../models/EventApiProductVersionsResponse';
import type { GatewayMessagingService } from '../models/GatewayMessagingService';
import type { GatewayMessagingServiceResponse } from '../models/GatewayMessagingServiceResponse';
import type { StateChangeRequestResponse } from '../models/StateChangeRequestResponse';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApiProductsService {

    /**
     * Get an Event API Product
     * Use this API to get a single Event API Product by its ID.
     * @param id The ID of the Event API Product.
     * @returns EventApiProductResponse The Event API Product.
     */
    getEventApiProduct(
        id: string,
    ): Promise<EventApiProductResponse>;

    /**
     * **used to get the request options without making a http request**
     * Get an Event API Product
     * Use this API to get a single Event API Product by its ID.
     * @param id The ID of the Event API Product.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete an Event API Product
     * Use this API to delete an Event API Product.
     * @param id The ID of the Event API Product.
     * @returns void
     */
    deleteEventApiProduct(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an Event API Product
     * Use this API to delete an Event API Product.
     * @param id The ID of the Event API Product.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an Event API Product
     * Use this API to update an Event API Product. You only need to specify the fields that need to be updated.
     * @param id The ID of the Event API Product to update.
     * @param requestBody The Event API Product
     * @returns EventApiProductResponse The updated Event API Product.
     */
    updateEventApiProduct(
        id: string,
        requestBody: EventApiProduct,
    ): Promise<EventApiProductResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update an Event API Product
     * Use this API to update an Event API Product. You only need to specify the fields that need to be updated.
     * @param id The ID of the Event API Product to update.
     * @param requestBody The Event API Product
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductApiRequestOptions(
        id: string,
        requestBody: EventApiProduct,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get a list of Event API Product versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiproductversions">another endpoint.</a><br><br>*Use this API to get a list of Event API Product versions under a particular Event API Product matching the given parameters.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param displayName Match Event API Product versions with the given display name.
     * @param id The ID of the Event API Product version.
     * @param ids Match Event API Product versions with the given IDs separated by commas.
     * @param version Match Event API Product versions with the given version.
     * @param stateId Match Event API Product versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiProductVersionsResponse Get a list of Event API Product versions.
     */
    getEventApiProductVersionsForEventApiProduct(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): Promise<EventApiProductVersionsResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get a list of Event API Product versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiproductversions">another endpoint.</a><br><br>*Use this API to get a list of Event API Product versions under a particular Event API Product matching the given parameters.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param displayName Match Event API Product versions with the given display name.
     * @param id The ID of the Event API Product version.
     * @param ids Match Event API Product versions with the given IDs separated by commas.
     * @param version Match Event API Product versions with the given version.
     * @param stateId Match Event API Product versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionsForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Create an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createeventapiproductversion">another endpoint.</a><br><br>*Use this API to create an Event API Product version.
     * @param eventApiProductId The ID of the parent Event API Product
     * @param requestBody Event API Product version
     * @returns EventApiProductVersionResponse Created an Event API Product version. Returns the newly saved Event API Product version in the response body.
     */
    createEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Create an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createeventapiproductversion">another endpoint.</a><br><br>*Use this API to create an Event API Product version.
     * @param eventApiProductId The ID of the parent Event API Product
     * @param requestBody Event API Product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiproductversion">another endpoint.</a><br><br>*Use this API to get a single Event API Product version using the parent ID and the version's ID.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version.
     * @returns EventApiProductVersionResponse The Event API Product version.
     */
    getEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/geteventapiproductversion">another endpoint.</a><br><br>*Use this API to get a single Event API Product version using the parent ID and the version's ID.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Delete an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteeventapiproductversion">another endpoint.</a><br><br>*Use this API to delete an Event API Product version.
     * @param eventApiProductId The ID of the parent Event API Product
     * @param id The ID of the Event API Product version
     * @returns void
     */
    deleteEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<void>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Delete an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteeventapiproductversion">another endpoint.</a><br><br>*Use this API to delete an Event API Product version.
     * @param eventApiProductId The ID of the parent Event API Product
     * @param id The ID of the Event API Product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiproductversion">another endpoint.</a><br><br>*Use this API to update an Event API Product version. You only need to specify the fields that need to be updated.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version to update.
     * @param requestBody The Event API Product version.
     * @returns EventApiProductVersionResponse The updated Event API Product version.
     */
    updateEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiproductversion">another endpoint.</a><br><br>*Use this API to update an Event API Product version. You only need to specify the fields that need to be updated.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version to update.
     * @param requestBody The Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update the state of an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiproductversionstate">another endpoint.</a><br><br>*Use this API to update the state of an Event API Product version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version to update.
     * @param requestBody The Event API Product version.
     * @returns VersionedObjectStateChangeRequest The updated state of the Event API Product version.
     */
    updateEventApiProductVersionStateForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<VersionedObjectStateChangeRequest>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update the state of an Event API Product version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateeventapiproductversionstate">another endpoint.</a><br><br>*Use this API to update the state of an Event API Product version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiProductId The ID of the parent Event API Product.
     * @param id The ID of the Event API Product version to update.
     * @param requestBody The Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionStateForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Get a list of Event API Product versions
     * Use this API to get a list of Event API Product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiProductIds Match only Event API Product versions of these Event API Product IDs, separated by commas.
     * @param ids Match Event API Product versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match Event API Product versions with the given state ID.
     * @param messagingServiceId Match Event API Product versions with the given messagingServiceId.
     * @param clientAppId Match Event API Product versions with the given clientAppId.
     * @param shared Match Event API Product versions with the parent objects shared setting.
     * @param latest Only return the latest version of Event API Products.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiProductVersionsResponse Get a list of Event API Product versions.
     */
    getEventApiProductVersions(
        pageSize: number,
        pageNumber: number,
        eventApiProductIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        messagingServiceId?: string,
        clientAppId?: string,
        shared?: boolean,
        latest?: boolean,
        customAttributes?: string,
    ): Promise<EventApiProductVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get a list of Event API Product versions
     * Use this API to get a list of Event API Product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiProductIds Match only Event API Product versions of these Event API Product IDs, separated by commas.
     * @param ids Match Event API Product versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match Event API Product versions with the given state ID.
     * @param messagingServiceId Match Event API Product versions with the given messagingServiceId.
     * @param clientAppId Match Event API Product versions with the given clientAppId.
     * @param shared Match Event API Product versions with the parent objects shared setting.
     * @param latest Only return the latest version of Event API Products.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        eventApiProductIds?: Array<string>,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
        messagingServiceId?: string,
        clientAppId?: string,
        shared?: boolean,
        latest?: boolean,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Create an Event API Product version
     * Use this API to create an Event API Product version.
     * @param requestBody Event API Product version
     * @returns EventApiProductVersionResponse Created an Event API Product version. Returns the newly saved Event API Product version in the response body.
     */
    createEventApiProductVersion(
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Create an Event API Product version
     * Use this API to create an Event API Product version.
     * @param requestBody Event API Product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiProductVersionApiRequestOptions(
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Get an Event API Product version
     * Use this API to get a single Event API Product version by its ID.
     * @param versionId The ID of the Event API Product version.
     * @param include A list of additional entities to include in the response.
     * @param clientAppId Match Event API Product versions with the given clientAppId.
     * @returns EventApiProductVersionResponse The Event API Product version.
     */
    getEventApiProductVersion(
        versionId: string,
        include?: string,
        clientAppId?: string,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Get an Event API Product version
     * Use this API to get a single Event API Product version by its ID.
     * @param versionId The ID of the Event API Product version.
     * @param include A list of additional entities to include in the response.
     * @param clientAppId Match Event API Product versions with the given clientAppId.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionApiRequestOptions(
        versionId: string,
        include?: string,
        clientAppId?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Delete an Event API Product version by ID
     * Use this API to delete an Event API Product version by ID.
     * @param versionId The ID of the Event API Product version
     * @returns void
     */
    deleteEventApiProductVersion(
        versionId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Delete an Event API Product version by ID
     * Use this API to delete an Event API Product version by ID.
     * @param versionId The ID of the Event API Product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Update an Event API Product version by version ID
     * Use this API to update an Event API Product version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns EventApiProductVersionResponse The updated Event API Product version.
     */
    updateEventApiProductVersion(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Update an Event API Product version by version ID
     * Use this API to update an Event API Product version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionApiRequestOptions(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * Update the state of an Event API Product version by ID
     * Use this API to update the state of an Event API Product version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns StateChangeRequestResponse The updated state of the Event API Product version.
     */
    updateEventApiProductVersionState(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): Promise<StateChangeRequestResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update the state of an Event API Product version by ID
     * Use this API to update the state of an Event API Product version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionStateApiRequestOptions(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * Update an Event API Product version to be published
     * Use this API to publish Event API Product version. Cannot unset once it is published
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns StateChangeRequestResponse Updated the state of the Event API Product version to Published.
     */
    publishEventApiProductVersion(
        versionId: string,
        requestBody?: EventApiProductVersion,
    ): Promise<StateChangeRequestResponse>;

    /**
     * **used to get the request options without making a http request**
     * Update an Event API Product version to be published
     * Use this API to publish Event API Product version. Cannot unset once it is published
     * @param versionId The ID of the Event API Product version.
     * @param requestBody The Event API Product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    publishEventApiProductVersionApiRequestOptions(
        versionId: string,
        requestBody?: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Create an association between a gateway messaging service and an Event API Product version
     * Use this API to associate an Event API Product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the Event API Product version to associate.
     * @param requestBody Gateway messaging service Id and supported Protocols
     * @returns GatewayMessagingServiceResponse Associated GatewayMessagingService to Event API Product version.
     */
    associateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): Promise<GatewayMessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Create an association between a gateway messaging service and an Event API Product version
     * Use this API to associate an Event API Product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the Event API Product version to associate.
     * @param requestBody Gateway messaging service Id and supported Protocols
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    associateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): ApiRequestOptions;

    /**
     * (Beta) Delete an association between a gateway messaging service and an Event API Product version
     * Use this API to disassociate an Event API Product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the Event API Product version to disassociate.
     * @param memAssociationId The MEM association ID to dissociate from.
     * @returns void
     */
    disassociateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Delete an association between a gateway messaging service and an Event API Product version
     * Use this API to disassociate an Event API Product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the Event API Product version to disassociate.
     * @param memAssociationId The MEM association ID to dissociate from.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    disassociateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Delete an association between a gateway messaging service and an Event API Product version by association ID
     * Use this API to disassociate an Event API Product version and gateway messaging service by association ID.
     * @param memAssociationId The association ID to perform the disassociation for
     * @returns void
     */
    disassociateGatewayMessagingServiceFromEventApiProductVersionById(
        memAssociationId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Delete an association between a gateway messaging service and an Event API Product version by association ID
     * Use this API to disassociate an Event API Product version and gateway messaging service by association ID.
     * @param memAssociationId The association ID to perform the disassociation for
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    disassociateGatewayMessagingServiceFromEventApiProductVersionByIdApiRequestOptions(
        memAssociationId: string,
    ): ApiRequestOptions;

}