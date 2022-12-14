/* eslint-disable */


export type Audit = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    readonly messagingServiceId?: string;
    readonly auditEntityType?: string;
    readonly messagingServiceName?: string;
    readonly identifier?: string;
    readonly status?: string;
    readonly multipleParent?: boolean;
    readonly designerMappingId?: string;
    readonly runtimeMappingId?: string;
    type?: string;
}

export namespace Audit {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Audit';


}