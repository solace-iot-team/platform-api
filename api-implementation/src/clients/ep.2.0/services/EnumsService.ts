/* eslint-disable */

import type { TopicAddressEnumVersion } from '../models/TopicAddressEnumVersion';
import type { VersionedObjectStateChangeRequest } from '../models/VersionedObjectStateChangeRequest';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface EnumsService {

    /**
     * Get a list of enumerations
     * Use this API to get a list of enumerations based on certain criteria.
     * @param pageSize The number of enumerations to get per page.
     * @param pageNumber The page number to get.
     * @param ids The IDs of the enumerations.
     * @param applicationDomainId The application domain ID of the enumerations.
     * @param applicationDomainIds Match only enumerations in the given application domain ids.
     * @param names The names of the enumerations.
     * @param shared Match only with shared or unshared enumerations.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns any Get a list of enumerations and the accompanying metadata.
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
     * Get a list of enumerations
     * Use this API to get a list of enumerations based on certain criteria.
     * @param pageSize The number of enumerations to get per page.
     * @param pageNumber The page number to get.
     * @param ids The IDs of the enumerations.
     * @param applicationDomainId The application domain ID of the enumerations.
     * @param applicationDomainIds Match only enumerations in the given application domain ids.
     * @param names The names of the enumerations.
     * @param shared Match only with shared or unshared enumerations.
     * @param sort Sort based on the provided parameters. <br> The value can be either a standalone field name (`?sort=<field>`) or a field and direction, delimited by a colon (`?sort=<field>:<asc|desc>`). If the direction is not specified, the default is ascending.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
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
     * Create an enumeration
     * An enumeration is a bounded variable with a limited set of literal values. Use this API to create an enumeration to define acceptable values for a level in a topic address or topic domain.
     * @param requestBody Enumeration description.
     * @returns any Created an enumeration. The newly saved enumeration is returned in the response body.
     */
    createEnum(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create an enumeration
     * An enumeration is a bounded variable with a limited set of literal values. Use this API to create an enumeration to define acceptable values for a level in a topic address or topic domain.
     * @param requestBody Enumeration description.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Get an enumeration
     * Use this API to get a single enumeration by its ID.
     * @param id The ID of the enumeration.
     * @returns any The enumeration.
     */
    getEnum(
        id: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an enumeration
     * Use this API to get a single enumeration by its ID.
     * @param id The ID of the enumeration.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Delete an enumeration
     * Use this API to delete an enumeration. The enumeration must not have any versions or else it cannot be deleted.
     * @param id The ID of the enumeration.
     * @returns void
     */
    deleteEnum(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an enumeration
     * Use this API to delete an enumeration. The enumeration must not have any versions or else it cannot be deleted.
     * @param id The ID of the enumeration.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an enumeration
     * Use this API to update an enumeration object. You only need to specify the fields that need to be updated.
     * @param id The ID of the enumeration.
     * @param requestBody Enumeration updates.
     * @returns any Updated an enumeration. The newly saved enumeration is returned in the response body.
     */
    updateEnum(
        id: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update an enumeration
     * Use this API to update an enumeration object. You only need to specify the fields that need to be updated.
     * @param id The ID of the enumeration.
     * @param requestBody Enumeration updates.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get a list of enumeration versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getenumversions">another endpoint.</a><br><br>*Use this API to get a list of enumeration versions based on certain criteria.
     * @param enumId The ID of the enumeration.
     * @param pageNumber The page number to get.
     * @param pageSize The number of enumeration versions to get per page.
     * @param ids The ids of the enumeration versions.
     * @param versions The versions of the enumeration version.
     * @param displayName The display name of the enumeration versions.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns any Get a list of enumeration versions and the accompanying metadata.
     */
    getEnumVersionsForEnum(
        enumId: string,
        pageNumber: number,
        pageSize: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
        customAttributes?: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get a list of enumeration versions
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getenumversions">another endpoint.</a><br><br>*Use this API to get a list of enumeration versions based on certain criteria.
     * @param enumId The ID of the enumeration.
     * @param pageNumber The page number to get.
     * @param pageSize The number of enumeration versions to get per page.
     * @param ids The ids of the enumeration versions.
     * @param versions The versions of the enumeration version.
     * @param displayName The display name of the enumeration versions.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionsForEnumApiRequestOptions(
        enumId: string,
        pageNumber: number,
        pageSize: number,
        ids?: Array<string>,
        versions?: Array<string>,
        displayName?: string,
        customAttributes?: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Create an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createenumversion">another endpoint.</a><br><br>*Create an enumeration version.
     * @param enumId
     * @param requestBody Enumeration version description with its values.
     * @returns any Created an enumeration version and its values. The newly saved enumeration version is returned in the response body.
     */
    createEnumVersionForEnum(
        enumId: string,
        requestBody: any,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Create an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/createenumversion">another endpoint.</a><br><br>*Create an enumeration version.
     * @param enumId
     * @param requestBody Enumeration version description with its values.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumVersionForEnumApiRequestOptions(
        enumId: string,
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Get an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getenumversion">another endpoint.</a><br><br>*Use this API to get a single enumeration version by its ID.
     * @param enumId The ID of the enumeration.
     * @param id The ID of the enumeration version.
     * @returns any The enumeration version.
     */
    getEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/getenumversion">another endpoint.</a><br><br>*Use this API to get a single enumeration version by its ID.
     * @param enumId The ID of the enumeration.
     * @param id The ID of the enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Delete an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteenumversion">another endpoint.</a><br><br>*Use this API to delete an enumeration version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param enumId The ID of the enumeration.
     * @param id The ID of the enumeration version.
     * @returns void
     */
    deleteEnumVersionForEnum(
        enumId: string,
        id: string,
    ): Promise<void>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Delete an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/deleteenumversion">another endpoint.</a><br><br>*Use this API to delete an enumeration version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param enumId The ID of the enumeration.
     * @param id The ID of the enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateenumversion">another endpoint.</a><br><br>*Use this API to update an enumeration version. You only need to specify the fields that need to be updated.
     * @param enumId The ID of the parent enumeration.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns any The updated enumeration version.
     */
    updateEnumVersionForEnum(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateenumversion">another endpoint.</a><br><br>*Use this API to update an enumeration version. You only need to specify the fields that need to be updated.
     * @param enumId The ID of the parent enumeration.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

    /**
     * @deprecated
     * Update the state of an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateenumversionstate">another endpoint.</a><br><br>*Use this API to update the state of an enumeration version. You only need to specify the target stateId field.
     * @param enumId The ID of the parent enumeration.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns any The updated state of the enumeration version.
     */
    updateEnumVersionStateForEnum(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Update the state of an enumeration version
     * *Deprecation Date: 2022-11-01<br>Removal Date: 2023-12-01<br>Reason: Replaced by <a href="/cloud/reference/updateenumversionstate">another endpoint.</a><br><br>*Use this API to update the state of an enumeration version. You only need to specify the target stateId field.
     * @param enumId The ID of the parent enumeration.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionStateForEnumApiRequestOptions(
        enumId: string,
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

    /**
     * Get a list of enumeration versions
     * Use this API to get a list of enumeration versions that match the given parameters.
     * @param pageSize The number of enumeration versions to get per page.
     * @param pageNumber The page number to get.
     * @param enumIds Match only enumeration versions of these enumeration IDs, separated by commas.
     * @param ids Match only enumeration versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
     * @returns any Get a list of enumeration versions and the accompanying metadata.
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
     * Get a list of enumeration versions
     * Use this API to get a list of enumeration versions that match the given parameters.
     * @param pageSize The number of enumeration versions to get per page.
     * @param pageNumber The page number to get.
     * @param enumIds Match only enumeration versions of these enumeration IDs, separated by commas.
     * @param ids Match only enumeration versions with the given IDs, separated by commas.
     * @param customAttributes Returns the entities that match the custom attribute filter.<br>To filter by custom attribute name and value, use the format: `customAttributes=<custom-attribute-name>==<custom-attribute-value>`. <br>To filter by custom attribute name, use the format: `customAttributes=<custom-attribute-name>`. <br>The filter supports the `AND` operator for multiple custom attribute definitions (not multiple values for a given definition). Use `;` (`semicolon`) to separate multiple queries with `AND` operation. <br>Note: the filter supports custom attribute values containing only the characters `[a-zA-Z0-9_\-\. ]`.
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
     * Create an enumeration version
     * Create an enumeration version.
     * @param requestBody Enumeration version description with its values.
     * @returns any Created an enumeration version and its values. The newly saved enumeration version is returned in the response body.
     */
    createEnumVersion(
        requestBody: any,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Create an enumeration version
     * Create an enumeration version.
     * @param requestBody Enumeration version description with its values.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    createEnumVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions;

    /**
     * Delete an enumeration version
     * Use this API to delete an enumeration version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param id The ID of the enumeration version.
     * @returns void
     */
    deleteEnumVersion(
        id: string,
    ): Promise<void>;

    /**
     * **used to get the request options without making a http request**
     * Delete an enumeration version
     * Use this API to delete an enumeration version. The version must not be in use by any events else it cannot be deleted. This also deletes the version's values.
     * @param id The ID of the enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    deleteEnumVersionApiRequestOptions(
        id: string,
    ): ApiRequestOptions;

    /**
     * Update an enumeration version
     * Use this API to update an enumeration version. You only need to specify the fields that need to be updated.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns any The updated enumeration version.
     */
    updateEnumVersion(
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update an enumeration version
     * Use this API to update an enumeration version. You only need to specify the fields that need to be updated.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionApiRequestOptions(
        id: string,
        requestBody: TopicAddressEnumVersion,
    ): ApiRequestOptions;

    /**
     * Get an enumeration version
     * Use this API to get a single enumeration version by its ID.
     * @param versionId The ID of the enumeration version.
     * @returns any The enumeration version.
     */
    getEnumVersion(
        versionId: string,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get an enumeration version
     * Use this API to get a single enumeration version by its ID.
     * @param versionId The ID of the enumeration version.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getEnumVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions;

    /**
     * Update the state of an enumeration version
     * Use this API to update the state of an enumeration version. You only need to specify the target stateId field.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The state object.
     * @returns any The updated state of the enumeration version.
     */
    updateEnumVersionState(
        id: string,
        requestBody: VersionedObjectStateChangeRequest,
    ): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Update the state of an enumeration version
     * Use this API to update the state of an enumeration version. You only need to specify the target stateId field.
     * @param id The ID of the enumeration version to update.
     * @param requestBody The state object.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    updateEnumVersionStateApiRequestOptions(
        id: string,
        requestBody: VersionedObjectStateChangeRequest,
    ): ApiRequestOptions;

}