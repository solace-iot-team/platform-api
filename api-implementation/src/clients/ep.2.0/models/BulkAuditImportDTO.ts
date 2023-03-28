/* eslint-disable */


import type { AuditImportDTO } from './AuditImportDTO';

export type BulkAuditImportDTO = {
    auditImports?: Array<AuditImportDTO>;
}

export namespace BulkAuditImportDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BulkAuditImportDTO';


}