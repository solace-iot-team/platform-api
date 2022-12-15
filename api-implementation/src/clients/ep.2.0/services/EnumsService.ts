/* eslint-disable */

import type { TopicAddressEnumVersion } from '../models/TopicAddressEnumVersion';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EnumsService {

    /**
     * Lists enums
     * Use this API to list enums based on certain criteria.
     * @param pageSize The number of enums to get per page.
     * @param pageNumber The page number to get.
     * @param ids The IDs of the enums.
     * @param applicationDomainId The application domain ID of the enums.
     * @param applicationDomainIds Match only enums in the given application domain ids.
     * @param names The names of the enums.
     * @param shared Match only with shared or unshared enums.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
        customAttributes?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Lists enums
     * Use this API to list enums based on certain criteria.
     * @param pageSize The number of enums to get per page.
     * @param pageNumber The page number to get.
     * @param ids The IDs of the enums.
     * @param applicationDomainId The application domain ID of the enums.
     * @param applicationDomainIds Match only enums in the given application domain ids.
     * @param names The names of the enums.
     * @param shared Match only with shared or unshared enums.
     * @param sort Sort based on the provided parameters. <br> The value can either be a standalone field name (`?sort=<field>`) or a field and direction, which must be delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
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
        customAttributes?: string,
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
     * @param pageSize The number of enumerations to get per page.
     * @param pageNumber The page number to get.
     * @param enumIds Match only enumeration versions of these enum IDs, separated by commas.
     * @param ids Match only enumeration versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns any Retrieve a list of enumeration versions and the accompanying metadata.
     */
    getEnumVersions(
        pageSize: number,
        pageNumber: number,
        enumIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the enumeration version objects
     * Use this API to retrieve a list of enumeration versions that match the given parameters.
     * @param pageSize The number of enumerations to get per page.
     * @param pageNumber The page number to get.
     * @param enumIds Match only enumeration versions of these enum IDs, separated by commas.
     * @param ids Match only enumeration versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionsApiRequestOptions(
        pageSize: number,
        pageNumber: number,
        enumIds?: Array<string>,
        ids?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * Creates an enum version object
     * description
     * @param requestBody Enum object description with its values.
     * @returns any Created an enum version and its values. The newly saved enum version object is returned in the response body.
     */
    createEnumVersion(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Creates an enum version object
     * description
     * @param requestBody Enum object description with its values.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Deletes an enum version
     * Use this API to delete an enum version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param id The ID of the enum version object.
     * @returns void
     */
    deleteEnumVersion(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Deletes an enum version
     * Use this API to delete an enum version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param id The ID of the enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Updates an enum version object
     * Use this API to update an enum version. You only need to specify the fields that need to be updated.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns any The updated application version object.
     */
    updateEnumVersion(
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates an enum version object
     * Use this API to update an enum version. You only need to specify the fields that need to be updated.
     * @param id The ID of the enum version object to update.
     * @param requestBody The enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionApiRequestOptions(
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Lists enums
     * Use this API to list enum versions based on certain criteria.
     * @param enumId The ID of the enum object.
     * @param pageNumber The page number to get.
     * @param pageSize The number of enum versions to get per page.
     * @param ids The ids of the enum versions.
     * @param versions The versions of the enum version.
     * @param displayName The display name of the enum versions.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns any Retrieve a list of enums and the accompanying metadata.
     */
    getEnumVersionsForEnum(
        enumId: string,
        pageNumber: number,
        pageSize?: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Lists enums
     * Use this API to list enum versions based on certain criteria.
     * @param enumId The ID of the enum object.
     * @param pageNumber The page number to get.
     * @param pageSize The number of enum versions to get per page.
     * @param ids The ids of the enum versions.
     * @param versions The versions of the enum version.
     * @param displayName The display name of the enum versions.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter only supports custom attribute values containing characters in `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionsForEnumApiRequestOptions(
        enumId: string,
        pageNumber: number,
        pageSize?: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
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
     * @deprecated
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
     * Updates the state of an enum version object
     * Use this API to update the state of an enum version. You only need to specify the target stateId field.
     * @param id The ID of the enum version object to update.
     * @param requestBody The state object.
     * @returns any The updated state of the enum version object.
     */
    updateEnumVersionState(
        id: string,
        requestBody: VersionedObjectStateChangeRequest,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Updates the state of an enum version object
     * Use this API to update the state of an enum version. You only need to specify the target stateId field.
     * @param id The ID of the enum version object to update.
     * @param requestBody The state object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionStateApiRequestOptions(
        id: string,
        requestBody: VersionedObjectStateChangeRequest,
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
     * @deprecated
     * Retrieves an enum version object
     * Use this API to retrieve a single enum version by its ID.
     * @param enumId The ID of the enum object.
     * @param id The ID of the enum version object.
     * @returns any The enum version object.
     */
    getEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Retrieves an enum version object
     * Use this API to retrieve a single enum version by its ID.
     * @param enumId The ID of the enum object.
     * @param id The ID of the enum version object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * @deprecated
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
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
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
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * @deprecated
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
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

}