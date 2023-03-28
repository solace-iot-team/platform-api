/* eslint-disable */


import type { Audit } from './Audit';

export type AuditImportDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    auditIds?: Array<string>;
    properties?: Record<string, string>;
    auditImportAction?: AuditImportDTO.auditImportAction;
    readonly audits?: Array<Audit>;
    id?: string;
    type?: string;
}

export namespace AuditImportDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditImportDTO';

    export enum auditImportAction {
        updateExistingParent = 'updateExistingParent',
        updateExistingVersion = 'updateExistingVersion',
        createNewParent = 'createNewParent',
        createNewVersion = 'createNewVersion',
    }


}