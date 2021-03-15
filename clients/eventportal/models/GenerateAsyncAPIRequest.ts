/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AsyncAPIServer } from './AsyncAPIServer';

export type GenerateAsyncAPIRequest = {
    asyncApiVersion: string;
    serverDTOList?: Array<AsyncAPIServer>;
    id?: string;
    type?: string;
}
