/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SempError } from './SempError';
import type { SempPaging } from './SempPaging';
import type { SempRequest } from './SempRequest';

export interface SempMeta {
    error?: SempError;
    paging?: SempPaging;
    request: SempRequest;
    /**
     * The HTTP response code, one of 200 (success), 4xx (client error), or 5xx (server error).
     */
    responseCode: number;
}
