/* eslint-disable */


import type { ConfigSyncLocalDatabaseRow } from './ConfigSyncLocalDatabaseRow';
import type { ConfigSyncLocalDatabaseRowCollections } from './ConfigSyncLocalDatabaseRowCollections';
import type { ConfigSyncLocalDatabaseRowLinks } from './ConfigSyncLocalDatabaseRowLinks';
import type { SempMeta } from './SempMeta';

export type ConfigSyncLocalDatabaseRowResponse = {
    collections?: ConfigSyncLocalDatabaseRowCollections;
    data?: ConfigSyncLocalDatabaseRow;
    links?: ConfigSyncLocalDatabaseRowLinks;
    meta: SempMeta;
}

export namespace ConfigSyncLocalDatabaseRowResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigSyncLocalDatabaseRowResponse';


}