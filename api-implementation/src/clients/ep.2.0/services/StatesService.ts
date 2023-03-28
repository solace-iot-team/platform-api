/* eslint-disable */

import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface StatesService {

    /**
     * Get a list of lifecycle states
     * Use this API to get a list of lifecycle states that match the given parameters.
     * @returns any Get a list of lifecycle states and the accompanying metadata.
     */
    getStates(): Promise<any>;

    /**
     * **used to get the request options without making a http request**
     * Get a list of lifecycle states
     * Use this API to get a list of lifecycle states that match the given parameters.
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getStatesApiRequestOptions(): ApiRequestOptions;

}