/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface StatesService {

    /**
     * Gets the State objects
     * Use this API to retrieve a list of Lifeycle States that match the given parameters.
     * @returns any Retrieve a list of lifecycle states and the accompanying metadata.
     */
    listStates(): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Gets the State objects
     * Use this API to retrieve a list of Lifeycle States that match the given parameters.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    listStatesApiRequestOptions(): ApiRequestOptions;

}