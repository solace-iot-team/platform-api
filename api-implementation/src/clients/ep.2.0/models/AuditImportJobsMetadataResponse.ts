/* eslint-disable */


import type { AuditImportJobMetadata } from './AuditImportJobMetadata';
import type { meta } from './meta';

export type AuditImportJobsMetadataResponse = {
    data?: Array<AuditImportJobMetadata>;
    meta?: meta;
}

export namespace AuditImportJobsMetadataResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditImportJobsMetadataResponse';


}