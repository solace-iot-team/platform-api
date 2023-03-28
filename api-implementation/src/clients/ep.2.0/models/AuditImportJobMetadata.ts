/* eslint-disable */


import type { BulkAuditImportDTO } from './BulkAuditImportDTO';

export type AuditImportJobMetadata = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    jobId?: string;
    jobType?: string;
    status?: AuditImportJobMetadata.status;
    messagingServiceId?: string;
    payload?: BulkAuditImportDTO;
    id?: string;
    type?: string;
}

export namespace AuditImportJobMetadata {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditImportJobMetadata';

    export enum status {
        in_progress = 'in_progress',
        error = 'error',
        validation_error = 'validation_error',
        success = 'success',
    }


}