/* eslint-disable */


export type AuditDetail = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    readonly runtimeAttributes?: string;
    readonly designerAttributes?: string;
    readonly parentId?: string;
    readonly versionId?: string;
    readonly entityId?: string;
    readonly scanId?: string;
    readonly status?: string;
    readonly identifier?: string;
    type?: string;
}

export namespace AuditDetail {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditDetail';


}