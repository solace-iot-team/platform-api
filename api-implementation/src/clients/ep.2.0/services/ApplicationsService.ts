/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ApplicationsService {

    /**
     * Gets the application objects
     * Use this API to retrieve a list of applications that match the given parameters.
     * @param pageSize The number of applications to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the application to match on.
     * @param applicationDomainId Match only applications in the given application domain.
     * @param ids Match only applications with the given IDs separated by commas.
     * @param applicationType Match only applications with the given applicationType.
     * @param sort
     * @returns any Retrieve a list of applications and the accompanying metadata.
     */
    getApplications(
        pageSize: number,
        pageNumber: number,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        applicationType?: string,
        sort?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the application objects
     * Use this API to retrieve a list of applications that match the given parameters.
     * @param pageSize The number of applications to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param name Name of the application to match on.
     * @param applicationDomainId Match only applications in the given application domain.
     * @param ids Match only applications with the given IDs separated by commas.
     * @param applicationType Match only applications with the given applicationType.
     * @param sort
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        applicationType?: string,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * Creates an application object
     * To model your event-driven architecture, applications are a fundamental building block for modelling the producers and consumers of events. Use this API to create applications and model the events they produce and consume.
     * @param requestBody Applications have a name and live within an application domain. Events can be added to the application as produced or consumed.
     * @returns any Created an application. Returns the newly saved application object in the response body.
     */
    createApplication(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an application object
     * To model your event-driven architecture, applications are a fundamental building block for modelling the producers and consumers of events. Use this API to create applications and model the events they produce and consume.
     * @param requestBody Applications have a name and live within an application domain. Events can be added to the application as produced or consumed.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an application object
     * Use this API to retrieve a single application by its ID.
     * @param id The ID of the application object.
     * @returns any The application object.
     */
    getApplication(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an application object
     * Use this API to retrieve a single application by its ID.
     * @param id The ID of the application object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an application object
     * Use this API to delete an application.
     * @param id The ID of the application
     * @returns void
     */
    deleteApplication(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an application object
     * Use this API to delete an application.
     * @param id The ID of the application
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an application object
     * Use this API to update an application. You only need to specify the fields that need to be updated.
     * @param id The ID of the application object to update.
     * @param requestBody The application object.
     * @returns any The updated application object.
     */
    updateApplication(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an application object
     * Use this API to update an application. You only need to specify the fields that need to be updated.
     * @param id The ID of the application object to update.
     * @param requestBody The application object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Gets the application version objects
     * Use this API to retrieve a list of application versions that match the given parameters.
     * @param pageSize The number of applications to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only application versions with the given IDs separated by commas.
     * @returns any Retrieve a list of application versions and the accompanying metadata.
     */
    getApplicationVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the application version objects
     * Use this API to retrieve a list of application versions that match the given parameters.
     * @param pageSize The number of applications to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only application versions with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Retrieves an application version object
     * Use this API to retrieve a single application version by its ID.
     * @param versionId The ID of the application version object.
     * @returns any The application version object.
     */
    getApplicationVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an application version object
     * Use this API to retrieve a single application version by its ID.
     * @param versionId The ID of the application version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Gets application version objects
     * Use this API to retrieve a list of application versions that match the given parameters.
     * @param applicationId The ID of the parent application.
     * @param displayName Match application versions with the given display name.
     * @param ids Match application versions with the given IDs separated by commas.
     * @param version Match application version objects with the given version.
     * @returns any Retrieve a list of application versions.
     */
    getApplicationVersionsForApplication(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets application version objects
     * Use this API to retrieve a list of application versions that match the given parameters.
     * @param applicationId The ID of the parent application.
     * @param displayName Match application versions with the given display name.
     * @param ids Match application versions with the given IDs separated by commas.
     * @param version Match application version objects with the given version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionsForApplicationApiRequestOptions(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
    ): ApiRequestOptions;

    /**
     * Creates an application version object
     * Creates an application version object
     * @param applicationId The ID of the parent application
     * @param requestBody App version request body description
     * @returns any Created an application version. Returns the newly saved application version object in the response body.
     */
    createApplicationVersionForApplication(
        applicationId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an application version object
     * Creates an application version object
     * @param applicationId The ID of the parent application
     * @param requestBody App version request body description
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an application version object
     * Use this API to retrieve a single application version by its ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @returns any The application version object.
     */
    getApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an application version object
     * Use this API to retrieve a single application version by its ID.
     * @param applicationId The ID of the parent application.
     * @param id The ID of the application version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an application version object
     * Use this API to delete an application version.
     * @param applicationId The ID of the parent application
     * @param id The ID of the application version
     * @returns void
     */
    deleteApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an application version object
     * Use this API to delete an application version.
     * @param applicationId The ID of the parent application
     * @param id The ID of the application version
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an application version object
     * Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param applicationId The ID of the parent application object.
     * @param id The ID of the application version object to update.
     * @param requestBody The application version object.
     * @returns any The updated application version object.
     */
    updateApplicationVersionForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an application version object
     * Use this API to update an application version. You only need to specify the fields that need to be updated.
     * @param applicationId The ID of the parent application object.
     * @param id The ID of the application version object to update.
     * @param requestBody The application version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Updates the state of an application version object
     * Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param applicationId The ID of the parent application object.
     * @param id The ID of the application version object to update.
     * @param requestBody The application version object.
     * @returns any The updated state of the application version object.
     */
    updateApplicationVersionStateForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an application version object
     * Use this API to update the state of an application version. You only need to specify the target stateId field.
     * @param applicationId The ID of the parent application object.
     * @param id The ID of the application version object to update.
     * @param requestBody The application version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateApplicationVersionStateForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

}