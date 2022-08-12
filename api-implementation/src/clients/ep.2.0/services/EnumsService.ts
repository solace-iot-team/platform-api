/* eslint-disable */

import type { EnumVersion } from '../models/EnumVersion';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EnumsService {

    /**
     * Lists enums
     * Use this API to list enums based on certain criteria.
     * @param pageSize The number of enums to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids The IDs of the enums.
     * @param applicationDomainId The application domain ID of the enums.
     * @param applicationDomainIds Match only enums in the given application domain ids.
     * @param names The names of the enums.
     * @param shared Match only with shared or unshared enums.
     * @param sort Sort based on the provided parameters.
     * @returns any Retrieve a list of enums and the accompanying metadata.
     */
    getEnums(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        names?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Lists enums
     * Use this API to list enums based on certain criteria.
     * @param pageSize The number of enums to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids The IDs of the enums.
     * @param applicationDomainId The application domain ID of the enums.
     * @param applicationDomainIds Match only enums in the given application domain ids.
     * @param names The names of the enums.
     * @param shared Match only with shared or unshared enums.
     * @param sort Sort based on the provided parameters.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        applicationDomainId?: string,
        applicationDomainIds?: Array<string>,
        names?: Array<string>,
        shared?: boolean,
        sort?: string,
    ): ApiRequestOptions;

    /**
     * Creates an enum object
     * description
     * @param requestBody Enum object description.
     * @returns any Created an enum. The newly saved enum object is returned in the response body.
     */
    createEnum(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an enum object
     * description
     * @param requestBody Enum object description.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an enum object
     * Use this API to retrieve a single enum by its ID.
     * @param id The ID of the enum object.
     * @returns any The enum object.
     */
    getEnum(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an enum object
     * Use this API to retrieve a single enum by its ID.
     * @param id The ID of the enum object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Deletes an enum
     * Use this API to delete an enum. The enum must not have any versions or else it cannot be deleted.
     * @param id The ID of the enum.
     * @returns void
     */
    deleteEnum(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an enum
     * Use this API to delete an enum. The enum must not have any versions or else it cannot be deleted.
     * @param id The ID of the enum.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an enum object
     * description
     * @param id The ID of the enum.
     * @param requestBody Enum updates.
     * @returns any Updated an enum. The newly saved enum object is returned in the response body.
     */
    updateEnum(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an enum object
     * description
     * @param id The ID of the enum.
     * @param requestBody Enum updates.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Gets the enumeration version objects
     * Use this API to retrieve a list of enumeration versions that match the given parameters.
     * @param pageSize The number of enumerations to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only enumeration versions with the given IDs separated by commas.
     * @returns any Retrieve a list of enumeration versions and the accompanying metadata.
     */
    getEnumVersions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the enumeration version objects
     * Use this API to retrieve a list of enumeration versions that match the given parameters.
     * @param pageSize The number of enumerations to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids Match only enumeration versions with the given IDs separated by commas.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
    ): ApiRequestOptions;

    /**
     * Lists enums
     * Use this API to list enum versions based on certain criteria.
     * @param enumId
     * @param pageSize The number of enum versions to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids The ids of the enum versions.
     * @param versions The versions of the enum version.
     * @param displayName The display name of the enum versions.
     * @returns any Retrieve a list of enums and the accompanying metadata.
     */
    getEnumVersionsForEnum(
        enumId: string,
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Lists enums
     * Use this API to list enum versions based on certain criteria.
     * @param enumId
     * @param pageSize The number of enum versions to get per page. Min: 1 Max: 100
     * @param pageNumber The page number to get. Min: 1
     * @param ids The ids of the enum versions.
     * @param versions The versions of the enum version.
     * @param displayName The display name of the enum versions.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionsForEnumApiRequestOptions(
        enumId: string,
        pageSize: number,
        pageNumber: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
    ): ApiRequestOptions;

    /**
     * Creates an enum version object
     * description
     * @param enumId
     * @param requestBody Enum object description with its values.
     * @returns any Created an enum version and its values. The newly saved enum version object is returned in the response body.
     */
    createEnumVersionForEnum(
        enumId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an enum version object
     * description
     * @param enumId
     * @param requestBody Enum object description with its values.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumVersionForEnumApiRequestOptions(
        enumId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Retrieves an enumeration version object
     * Use this API to retrieve a single enumeration version by its ID.
     * @param versionId The ID of the enumeration version object.
     * @returns any The enumeration version object.
     */
    getEnumVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an enumeration version object
     * Use this API to retrieve a single enumeration version by its ID.
     * @param versionId The ID of the enumeration version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Retrieves an enum version object
     * Use this API to retrieve a single enum version by its ID.
     * @param id The ID of the enum version object.
     * @param enumId
     * @returns any The enum version object.
     */
    getEnumVersionForEnum(
        id: string,
        enumId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Retrieves an enum version object
     * Use this API to retrieve a single enum version by its ID.
     * @param id The ID of the enum version object.
     * @param enumId
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionForEnumApiRequestOptions(
        id: string,
        enumId: string,
    ): ApiRequestOptions;

    /**
     * Deletes an enum version
     * Use this API to delete an enum version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param enumId The ID of the enum object.
     * @param id The ID of the enum version object.
     * @returns void
     */
    deleteEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an enum version
     * Use this API to delete an enum version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param enumId The ID of the enum object.
     * @param id The ID of the enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an enum version object
     * Use this API to update an enum version. You only need to specify the fields that need to be updated.
     * @param enumId The ID of the parent enum object.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns any The updated application version object.
     */
    updateEnumVersionForEnum(
        enumId: string,
        id: string,
        requestBody: EnumVersion,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an enum version object
     * Use this API to update an enum version. You only need to specify the fields that need to be updated.
     * @param enumId The ID of the parent enum object.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: EnumVersion,
    ): ApiRequestOptions;

    /**
     * Updates the state of an enum version object
     * Use this API to update the state of an enum version. You only need to specify the target stateId field.
     * @param enumId The ID of the parent enum object.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns any The updated state of the enum version object.
     */
    updateEnumVersionStateForEnum(
        enumId: string,
        id: string,
        requestBody: EnumVersion,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an enum version object
     * Use this API to update the state of an enum version. You only need to specify the target stateId field.
     * @param enumId The ID of the parent enum object.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionStateForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: EnumVersion,
    ): ApiRequestOptions;

}