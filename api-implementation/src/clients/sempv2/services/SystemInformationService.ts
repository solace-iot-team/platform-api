/* eslint-disable */

import type { SempMetaOnlyResponse } from '../models/SempMetaOnlyResponse';
import type { SystemInformationResponse } from '../models/SystemInformationResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface SystemInformationService {

    /**
     * @deprecated
     * Get a System Information object.
     * Get a System Information object.
     *
     * A SEMP client authorized with a minimum access scope/level of "global/none" is required to perform this operation.
     *
     * This has been deprecated since 2.2.
     * @returns SystemInformationResponse The System Information object's attributes, and the request metadata.
     * @returns SempMetaOnlyResponse The error response.
     */
    getSystemInformation(): Promise<SystemInformationResponse | SempMetaOnlyResponse>;

    /**
     * @deprecated
     * **used to get the request options without making a http request**
     * Get a System Information object.
     * Get a System Information object.
     *
     * A SEMP client authorized with a minimum access scope/level of "global/none" is required to perform this operation.
     *
     * This has been deprecated since 2.2.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getSystemInformationApiRequestOptions(): ApiRequestOptions;

}