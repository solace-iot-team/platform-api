/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Broker } from './Broker';
import type { BrokerLinks } from './BrokerLinks';
import type { SempMeta } from './SempMeta';

export type BrokerResponse = {
    data?: Broker;
    links?: BrokerLinks;
    meta: SempMeta;
}
