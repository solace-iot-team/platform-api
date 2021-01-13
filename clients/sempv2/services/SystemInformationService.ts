/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SempMetaOnlyResponse } from '../models/SempMetaOnlyResponse';
import type { SystemInformationResponse } from '../models/SystemInformationResponse';
import { request as __request } from '../core/request';

export class SystemInformationService {

    /**
     * @deprecated
     * Get a System Information object.
     * Get a System Information object.
     *
     * A SEMP client authorized with a minimum access scope/level of "global/none" is required to perform this operation.
     *
     * This has been deprecated since 2.2.
     * @result SystemInformationResponse The System Information object's attributes, and the request metadata.
     * @result SempMetaOnlyResponse The error response.
     * @throws ApiError
     */
    public static async getSystemInformation(): Promise<SystemInformationResponse | SempMetaOnlyResponse> {
        const result = await __request({
            method: 'GET',
            path: `/systemInformation`,
        });
        return result.body;
    }

}