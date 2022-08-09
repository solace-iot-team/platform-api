/* eslint-disable */

import type { EventApiProduct } from '../models/EventApiProduct';
import type { EventApiProductResponse } from '../models/EventApiProductResponse';
import type { EventApiProductsResponse } from '../models/EventApiProductsResponse';
import type { EventApiProductVersion } from '../models/EventApiProductVersion';
import type { EventApiProductVersionResponse } from '../models/EventApiProductVersionResponse';
import type { EventApiProductVersionsResponse } from '../models/EventApiProductVersionsResponse';
import type { GatewayMessagingService } from '../models/GatewayMessagingService';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EventApiProductsService {

    /**
     * Retrieves a list of event API products
     * Use this API to retrieve a list of event API products that match the given parameters.
     * @param pageSize The number of event API products to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param brokerType Match only event API products with the given broken type.
     * @param name Name of the event API product to match on.
     * @param ids Match only event API products with the given IDs separated by commas.
     * @param applicationDomainId Match only event API products in the given application domain.
     * @param applicationDomainIds Match only event API products in the given application domains.
     * @param shared Match only with shared or unshared event API products.
     * @param sort The name of the field to sort on.
     * @returns EventApiProductsResponse The list of event API products and the accompanying metadata.
     */
    getEventApiProducts(
        pageSize: number,
        pageNumber: number,
        brokerType?: 'solace' | 'kafka',
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): Promise<EventApiProductsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API products
     * Use this API to retrieve a list of event API products that match the given parameters.
     * @param pageSize The number of event API products to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param brokerType Match only event API products with the given broken type.
     * @param name Name of the event API product to match on.
     * @param ids Match only event API products with the given IDs separated by commas.
     * @param applicationDomainId Match only event API products in the given application domain.
     * @param applicationDomainIds Match only event API products in the given application domains.
     * @param shared Match only with shared or unshared event API products.
     * @param sort The name of the field to sort on.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        brokerType?: 'solace' | 'kafka',
        name?: string,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        shared?: boolean,
        sort?: string,
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
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API product versions with the given state ID.
     * @returns EventApiProductVersionsResponse Retrieve a list of event API product versions.
     */
    getEventApiProductVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions that match the given parameters.
     * @param pageSize The number of results to return in one page of results.
     * @param pageNumber The page number to get results from based on the page size.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param include A list of additional entities to include in the response.
     * @param stateId Match event API product versions with the given state ID.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        include?: string,
        stateId?: string,
    ): ApiRequestOptions;

    /**
     * Retrieves an event API product version
     * Use this API to retrieve a single event API product version by its ID.
     * @param versionId The ID of the event API product version.
     * @param include A list of additional entities to include in the response.
     * @returns EventApiProductVersionResponse The event API product version.
     */
    getEventApiProductVersion(
        versionId: string,
        include: string,
    ): Promise<EventApiProductVersionResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an event API product version
     * Use this API to retrieve a single event API product version by its ID.
     * @param versionId The ID of the event API product version.
     * @param include A list of additional entities to include in the response.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionApiRequestOptions(
        versionId: string,
        include: string,
    ): ApiRequestOptions;

    /**
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions under a particular event API product matching the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions with the given version.
     * @param stateId Match event API product versions with the given state ID.
     * @returns EventApiProductVersionsResponse Retrieve a list of event API product versions.
     */
    getEventApiProductVersionsForEventApiProduct(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): Promise<EventApiProductVersionsResponse>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves a list of event API product versions
     * Use this API to retrieve a list of event API product versions under a particular event API product matching the given parameters.
     * @param eventApiProductId The ID of the parent event API product.
     * @param displayName Match event API product versions with the given display name.
     * @param id The ID of the event API product version.
     * @param ids Match event API product versions with the given IDs separated by commas.
     * @param version Match event API product versions with the given version.
     * @param stateId Match event API product versions with the given state ID.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEventApiProductVersionsForEventApiProductApiRequestOptions(
        eventApiProductId: string,
        displayName?: string,
        id?: string,
        ids?: Array<string>,
        version?: string,
        stateId?: string,
    ): ApiRequestOptions;

    /**
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
     * Associate gateway messaging service to event API product version
     * Use this API to associate an event API product version and gateway messaging service.
     * @param eventApiProductVersionId The ID of the event API product version to associate.
     * @param requestBody Gateway messaging service Id and supported Protocols
     * @returns GatewayMessagingService Associated GatewayMessagingService to event API product version.
     */
    associateGatewayMessagingServiceToEapVersion(
        eventApiProductVersionId: string,
        requestBody: GatewayMessagingService,
    ): Promise<GatewayMessagingService>;

    /**
     * **used to get the request options without making a http request**
     * Associate gateway messaging service to event API product version
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
     * Disassociate gateway messaging service from event API product version
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
     * Disassociate gateway messaging service from event API product version
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