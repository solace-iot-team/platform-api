/* eslint-disable */

import type { ApplicationDomainImportDTO } from '../models/ApplicationDomainImportDTO';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ApplicationDomainsService {

    /**
     * Gets the application domain objects
     * Use this API to retrieve a list of application domains that match the given parameters.
     * @param pageSize The number of application domains to get per page.
     * @param pageNumber The page number to get.
     * @param name Name to be used to match the application domain.
     * @param ids Match only application domains with the given IDs separated by commas.
     * @param include Specify extra data to be included, options are: stats
     * @returns any Retrieve a list of application domains and the accompanying metadata.
     */
    getApplicationDomains(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        include?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the application domain objects
     * Use this API to retrieve a list of application domains that match the given parameters.
     * @param pageSize The number of application domains to get per page.
     * @param pageNumber The page number to get.
     * @param name Name to be used to match the application domain.
     * @param ids Match only application domains with the given IDs separated by commas.
     * @param include Specify extra data to be included, options are: stats
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationDomainsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        ids?: Array<string>,
        include?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Creates an application domain object
     * To help keep your event-driven architecture organized, use application domains to create namespaces for your applications, events and schemas.
     * @param requestBody Application domains have a name and topic domain.
     * @returns any Created. The newly saved application domain object is returned in the response body.
     */
    createApplicationDomain(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an application domain object
     * To help keep your event-driven architecture organized, use application domains to create namespaces for your applications, events and schemas.
     * @param requestBody Application domains have a name and topic domain.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationDomainApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an application domain object
     * Use this API to retrieve a single application domain by its ID.
     * @param id The ID of the application domain object.
     * @param include Specify extra data to be included, options are: stats
     * @returns any The application domain object.
     */
    getApplicationDomain(
        id: string,
        include?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an application domain object
     * Use this API to retrieve a single application domain by its ID.
     * @param id The ID of the application domain object.
     * @param include Specify extra data to be included, options are: stats
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationDomainApiRequestOptions(
        id: string,
        include?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Deletes an application domain object
     * Use this API to delete an application domain. This action also deletes all applications, events, and schemas in the application domain. You cannot undo this operation.
     * @param id The ID of the application domain object.
     * @returns void
     */
    deleteApplicationDomain(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an application domain object
     * Use this API to delete an application domain. This action also deletes all applications, events, and schemas in the application domain. You cannot undo this operation.
     * @param id The ID of the application domain object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationDomainApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an application domain object
     * Use this API to update an application domain. You only need to specify the fields that need to be updated.
     * @param id The ID of the application domain object.
     * @param requestBody The application domain object.
     * @returns any The updated application domain object.
     */
    updateApplicationDomain(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an application domain object
     * Use this API to update an application domain. You only need to specify the fields that need to be updated.
     * @param id The ID of the application domain object.
     * @param requestBody The application domain object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationDomainApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * (Beta) Import application domains and their entities
     * Use this API to import application domains and their nested entities. Please note that this endpoint is in beta and could be subject to change in the future
     * @param requestBody Application domain import file
     * @returns any Successfully registered import job with location identified in the response header
     */
    importApplicationDomains(
        requestBody: ApplicationDomainImportDTO,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * (Beta) Import application domains and their entities
     * Use this API to import application domains and their nested entities. Please note that this endpoint is in beta and could be subject to change in the future
     * @param requestBody Application domain import file
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    importApplicationDomainsApiRequestOptions(
        requestBody: ApplicationDomainImportDTO,
    ): ApiRequestOptions;

}