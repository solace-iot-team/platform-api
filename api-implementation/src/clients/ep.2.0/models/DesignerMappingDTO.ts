/* eslint-disable */


export type DesignerMappingDTO = {
    id?: string;
    messagingServiceId?: string;
    auditEntityType?: DesignerMappingDTO.auditEntityType;
    identifier?: string;
    attributes?: string;
    entityId?: string;
    versionId?: string;
    parentId?: string;
}

export namespace DesignerMappingDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DesignerMappingDTO';

    export enum auditEntityType {
        all = 'all',
        kafkaConsumerGroup = 'kafkaConsumerGroup',
        kafkaTopic = 'kafkaTopic',
        solaceQueue = 'solaceQueue',
        solaceTopic = 'solaceTopic',
    }


}