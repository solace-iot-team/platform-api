/* eslint-disable */


export type RuntimeMappingDTO = {
    id?: string;
    messagingServiceId?: string;
    auditEntityType?: RuntimeMappingDTO.auditEntityType;
    identifier?: string;
    attributes?: string;
    scanId?: string;
}

export namespace RuntimeMappingDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeMappingDTO';

    export enum auditEntityType {
        all = 'all',
        kafkaConsumerGroup = 'kafkaConsumerGroup',
        kafkaTopic = 'kafkaTopic',
        solaceQueue = 'solaceQueue',
        solaceTopic = 'solaceTopic',
    }


}