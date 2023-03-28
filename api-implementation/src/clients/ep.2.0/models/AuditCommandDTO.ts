/* eslint-disable */


export type AuditCommandDTO = {
    auditOperationType?: AuditCommandDTO.auditOperationType;
    auditEntityType?: AuditCommandDTO.auditEntityType;
    sourceId?: string;
    synchronous?: boolean;
}

export namespace AuditCommandDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditCommandDTO';

    export enum auditOperationType {
        audit = 'audit',
        deleteAll = 'deleteAll',
        designerMapping = 'designerMapping',
        designerUpdate = 'designerUpdate',
        runtimeMapping = 'runtimeMapping',
        runtimeUpdate = 'runtimeUpdate',
    }

    export enum auditEntityType {
        all = 'all',
        kafkaConsumerGroup = 'kafkaConsumerGroup',
        kafkaTopic = 'kafkaTopic',
        solaceQueue = 'solaceQueue',
        solaceTopic = 'solaceTopic',
    }


}