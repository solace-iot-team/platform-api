/* eslint-disable */

import type { StatesService } from './StatesService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class StatesServiceDefault implements StatesService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getStates(): Promise<any> {
        const options = this.getStatesApiRequestOptions(
        );
        const result = await __request(options);
        return result.body;
    }

    public getStatesApiRequestOptions(): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/states`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

}