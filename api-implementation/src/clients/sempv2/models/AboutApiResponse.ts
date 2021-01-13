/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AboutApi } from './AboutApi';
import type { AboutApiLinks } from './AboutApiLinks';
import type { SempMeta } from './SempMeta';

export interface AboutApiResponse {
    data?: AboutApi;
    links?: AboutApiLinks;
    meta: SempMeta;
}
