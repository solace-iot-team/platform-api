/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { About } from './About';
import type { AboutLinks } from './AboutLinks';
import type { SempMeta } from './SempMeta';

export type AboutResponse = {
    data?: About;
    links?: AboutLinks;
    meta: SempMeta;
}
