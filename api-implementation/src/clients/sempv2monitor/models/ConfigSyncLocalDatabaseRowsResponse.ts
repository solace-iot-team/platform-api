/* eslint-disable */


import type { ConfigSyncLocalDatabaseRow } from './ConfigSyncLocalDatabaseRow';
import type { ConfigSyncLocalDatabaseRowCollections } from './ConfigSyncLocalDatabaseRowCollections';
import type { ConfigSyncLocalDatabaseRowLinks } from './ConfigSyncLocalDatabaseRowLinks';
import type { SempMeta } from './SempMeta';

export type ConfigSyncLocalDatabaseRowsResponse = {
    collections?: Array<ConfigSyncLocalDatabaseRowCollections>;
    data?: Array<ConfigSyncLocalDatabaseRow>;
    links?: Array<ConfigSyncLocalDatabaseRowLinks>;
    meta: SempMeta;
}

export namespace ConfigSyncLocalDatabaseRowsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigSyncLocalDatabaseRowsResponse';


}