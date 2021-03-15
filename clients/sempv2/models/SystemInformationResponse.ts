/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SempMeta } from './SempMeta';
import type { SystemInformation } from './SystemInformation';
import type { SystemInformationLinks } from './SystemInformationLinks';

export type SystemInformationResponse = {
    data?: SystemInformation;
    links?: SystemInformationLinks;
    meta: SempMeta;
}
