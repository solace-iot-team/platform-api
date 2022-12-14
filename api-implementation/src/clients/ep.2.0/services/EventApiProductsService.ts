/* eslint-disable */

import type { EventApiProduct } from '../models/EventApiProduct';
import type { EventApiProductResponse } from '../models/EventApiProductResponse';
import type { EventApiProductsResponse } from '../models/EventApiProductsResponse';
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
     * Retrieves a list of event API products
     * Use this API to retrieve a list of event API products that match the given parameters.
     * @param pageSize The number of event API products to get per page.
     * @param pageNumber The page number to get.
     * @param brokerType Match only event API products with the given broken type.
     * @param name Name of the event API product to match on.
     * @param ids Match only event API products with the given IDs separated by commas.
     * @param applicationDomainId Match only event API products in the given application domain.
     * @param applicationDomainIds Match only event API products in the given application domains.
     * @param shared Match only with shared or unshared event API products.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiProductsResponse The list of event API products and the accompanying metadata.
     */
    getEventApiProducts(
        pageSize: number,
        pageNumber: number,
        brokerType?: string,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
        customAttributes?: string,
    ): Promise<EventApiProductsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API products
     * Use this API to retrieve a list of event API products that match the given parameters.
     * @param pageSize The number of event API products to get per page.
     * @param pageNumber The page number to get.
     * @param brokerType Match only event API products with the given broken type.
     * @param name Name of the event API product to match on.
     * @param ids Match only event API products with the given IDs separated by commas.
     * @param applicationDomainId Match only event API products in the given application domain.
     * @param applicationDomainIds Match only event API products in the given application domains.
     * @param shared Match only with shared or unshared event API products.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        brokerType?: string,
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Creates an event API product
     * Use this API to create an event API product.
     * @param requestBody The event API product
     * @returns EventApiProductResponse Created an event API product. The newly saved event API product is returned in the response body.
     */
    createEventApiProduct(
        requestBody: EventApiProduct,
    ): Promise<EventApiProductResponse>;

    /**
     * **used to get the request options without making a http request**
     * Creates an event API product
     * Use this API to create an event API product.
     * @param requestBody The event API product
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiProductApiRequestOptions(
        requestBody: EventApiProduct,
    ): ApiRequestOptions;

    /**
     * Retrieves an event API product
     * Use this API to retrieve a single event API product by its ID.
     * @param id The ID of the event API product.
     * @returns EventApiProductResponse The event API product.
     */
    getEventApiProduct(
        id: string,
    ): Promise<EventApiProductResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event API product
     * Use this API to retrieve a single event API product by its ID.
     * @param id The ID of the event API product.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an event API product
     * Use this API to delete an event API product.
     * @param id The ID of the event API product.
     * @returns void
     */
    deleteEventApiProduct(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an event API product
     * Use this API to delete an event API product.
     * @param id The ID of the event API product.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an event API product
     * Use this API to update an event API product. You only need to specify the fields that need to be updated.
     * @param id The ID of the event API product to update.
     * @param requestBody The event API product
     * @returns EventApiProductResponse The updated event API product.
     */
    updateEventApiProduct(
        id: string,
        requestBody: EventApiProduct,
    ): Promise<EventApiProductResponse>;

    /**
     * **used to get the request options without making a http request**
     * Updates an event API product
     * Use this API to update an event API product. You only need to specify the fields that need to be updated.
     * @param id The ID of the event API product to update.
     * @param requestBody The event API product
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductApiRequestOptions(
        id: string,
        requestBody: EventApiProduct,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiProductIds Match only event API product versions of these event API product IDs, separated by commas.
     * @param ids Match event API product versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API product versions with the given state ID.
     * @param messagingServiceId Match event API product versions with the given messagingServiceId.
     * @param clientAppId Match event API product versions with the given clientAppId.
     * @param shared Match event API product versions with the parent objects shared setting.
     * @param latest Only return the latest version of event API products.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiProductVersionsResponse Retrieve a list of event API product versions.
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
     * (Beta) Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param eventApiProductIds Match only event API product versions of these event API product IDs, separated by commas.
     * @param ids Match event API product versions with the given IDs, separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API product versions with the given state ID.
     * @param messagingServiceId Match event API product versions with the given messagingServiceId.
     * @param clientAppId Match event API product versions with the given clientAppId.
     * @param shared Match event API product versions with the parent objects shared setting.
     * @param latest Only return the latest version of event API products.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
     * (Beta) Creates an event API product version
     * Use this API to create an event API product version.
     * @param requestBody Event API product version
     * @returns EventApiProductVersionResponse Created an event API product version. Returns the newly saved event API product version in the response body.
     */
    createEventApiProductVersion(
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Creates an event API product version
     * Use this API to create an event API product version.
     * @param requestBody Event API product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiProductVersionApiRequestOptions(
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Retrieves an event API product version
     * Use this API to retrieve a single event API product version by its ID.
     * @param versionId The ID of the event API product version.
     * @param include A list of additional entities to include in the response.
     * @param clientAppId Match event API product versions with the given clientAppId.
     * @returns EventApiProductVersionResponse The event API product version.
     */
    getEventApiProductVersion(
        versionId: string,
        include: string,
        clientAppId?: string,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Retrieves an event API product version
     * Use this API to retrieve a single event API product version by its ID.
     * @param versionId The ID of the event API product version.
     * @param include A list of additional entities to include in the response.
     * @param clientAppId Match event API product versions with the given clientAppId.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionApiRequestOptions(
        versionId: string,
        include: string,
        clientAppId?: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Deletes an event API product version by ID
     * Use this API to delete an event API product version by ID.
     * @param versionId The ID of the event API product version
     * @returns void
     */
    deleteEventApiProductVersion(
        versionId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Deletes an event API product version by ID
     * Use this API to delete an event API product version by ID.
     * @param versionId The ID of the event API product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * (Beta) Updates an event API product version by version ID
     * Use this API to update an event API product version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the event API product version.
     * @param requestBody The event API product version.
     * @returns EventApiProductVersionResponse The updated event API product version.
     */
    updateEventApiProductVersion(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Updates an event API product version by version ID
     * Use this API to update an event API product version. You only need to specify the fields that need to be updated.
     * @param versionId The ID of the event API product version.
     * @param requestBody The event API product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionApiRequestOptions(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * Updates the state of an event API product version by ID
     * Use this API to update the state of an event API product version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the event API product version.
     * @param requestBody The event API product version.
     * @returns StateChangeRequestResponse The updated state of the event API product version.
     */
    updateEventApiProductVersionState(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): Promise<StateChangeRequestResponse>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an event API product version by ID
     * Use this API to update the state of an event API product version. You only need to specify the state ID field with the desired state ID.
     * @param versionId The ID of the event API product version.
     * @param requestBody The event API product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionStateApiRequestOptions(
        versionId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions under a particular event API product matching the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions with the given version.
     * @param stateId Match event API product versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns EventApiProductVersionsResponse Retrieve a list of event API product versions.
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
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions under a particular event API product matching the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions with the given version.
     * @param stateId Match event API product versions with the given state ID.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
     * Creates an event API product version
     * Use this API to create an event API product version.
     * @param eventApiProductId The ID of the parent event API product
     * @param requestBody Event API product version
     * @returns EventApiProductVersionResponse Created an event API product version. Returns the newly saved event API product version in the response body.
     */
    createEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Creates an event API product version
     * Use this API to create an event API product version.
     * @param eventApiProductId The ID of the parent event API product
     * @param requestBody Event API product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Disassociates a gateway messaging service from an event API product version by association ID
     * Use this API to disassociate an event API product version and gateway messaging service by association ID.
     * @param memAssociationId The association ID to perform the disassociation for
     * @returns void
     */
    disassociateGatewayMessagingServiceFromEventApiProductVersionById(
        memAssociationId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Disassociates a gateway messaging service from an event API product version by association ID
     * Use this API to disassociate an event API product version and gateway messaging service by association ID.
     * @param memAssociationId The association ID to perform the disassociation for
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    disassociateGatewayMessagingServiceFromEventApiProductVersionByIdApiRequestOptions(
        memAssociationId: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Retrieves an event API product version
     * Use this API to retrieve a single event API product version using the parent ID and the version's ID.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version.
     * @returns EventApiProductVersionResponse The event API product version.
     */
    getEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Retrieves an event API product version
     * Use this API to retrieve a single event API product version using the parent ID and the version's ID.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Deletes an event API product version
     * Use this API to delete an event API product version.
     * @param eventApiProductId The ID of the parent event API product
     * @param id The ID of the event API product version
     * @returns void
     */
    deleteEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
    ): Promise<void>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Deletes an event API product version
     * Use this API to delete an event API product version.
     * @param eventApiProductId The ID of the parent event API product
     * @param id The ID of the event API product version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Updates an event API product version
     * Use this API to update an event API product version. You only need to specify the fields that need to be updated.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version to update.
     * @param requestBody The event API product version.
     * @returns EventApiProductVersionResponse The updated event API product version.
     */
    updateEventApiProductVersionForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Updates an event API product version
     * Use this API to update an event API product version. You only need to specify the fields that need to be updated.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version to update.
     * @param requestBody The event API product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Updates the state of an event API product version
     * Use this API to update the state of an event API product version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version to update.
     * @param requestBody The event API product version.
     * @returns VersionedObjectStateChangeRequest The updated state of the event API product version.
     */
    updateEventApiProductVersionStateForEventApiProduct(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): Promise<VersionedObjectStateChangeRequest>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Updates the state of an event API product version
     * Use this API to update the state of an event API product version. You only need to specify the state ID field with the desired state ID.
     * @param eventApiProductId The ID of the parent event API product.
     * @param id The ID of the event API product version to update.
     * @param requestBody The event API product version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEventApiProductVersionStateForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        id: string,
        requestBody: EventApiProductVersion,
    ): ApiRequestOptions;

    /**
     * (Beta) Associate gateway messaging service to event API product version
     * Use this API to associate an event API product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the event API product version to associate.
     * @param requestBody Gateway messaging service Id and supported Protocols
     * @returns GatewayMessagingServiceResponse Associated GatewayMessagingService to event API product version.
     */
    associateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): Promise<GatewayMessagingServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Associate gateway messaging service to event API product version
     * Use this API to associate an event API product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the event API product version to associate.
     * @param requestBody Gateway messaging service Id and supported Protocols
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    associateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): ApiRequestOptions;

    /**
     * (Beta) Disassociate gateway messaging service from event API product version
     * Use this API to disassociate an event API product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the event API product version to disassociate.
     * @param memAssociationId The MEM association ID to dissociate from.
     * @returns void
     */
    disassociateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Disassociate gateway messaging service from event API product version
     * Use this API to disassociate an event API product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the event API product version to disassociate.
     * @param memAssociationId The MEM association ID to dissociate from.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    disassociateGatewayMessagingServiceToEapVersionApiRequestOptions(
        eventApiProductVersionId: string,
        memAssociationId: string,
    ): ApiRequestOptions;

}