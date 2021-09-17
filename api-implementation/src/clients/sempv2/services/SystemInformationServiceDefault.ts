/* eslint-disable */

import type { SempMetaOnlyResponse } from '../models/SempMetaOnlyResponse';
import type { SystemInformationResponse } from '../models/SystemInformationResponse';
import type { SystemInformationService } from './SystemInformationService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class SystemInformationServiceDefault implements SystemInformationService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getSystemInformation(): Promise<SystemInformationResponse | SempMetaOnlyResponse> {
        const options = this.getSystemInformationApiRequestOptions(
        );
        const result = await __request(options);
        return result.body;
    }

    public getSystemInformationApiRequestOptions(): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/systemInformation`,
        };
    }

}