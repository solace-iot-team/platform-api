/* eslint-disable */


export type MessagingServiceOperation = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The ID of the messaging service.
     */
    messagingServiceId?: string;
    scanTypes?: Array<'KAFKA_ALL' | 'KAFKA_BROKER_CONFIGURATION' | 'KAFKA_CLUSTER_CONFIGURATION' | 'KAFKA_CONSUMER_GROUPS' | 'KAFKA_CONSUMER_GROUPS_CONFIGURATION' | 'KAFKA_FEATURES' | 'KAFKA_PRODUCERS' | 'KAFKA_TOPIC_CONFIGURATION' | 'KAFKA_TOPIC_CONFIGURATION_FULL' | 'KAFKA_TOPIC_LISTING' | 'KAFKA_TOPIC_OVERRIDE_CONFIGURATION' | 'SOLACE_ALL' | 'SOLACE_QUEUE_CONFIG' | 'SOLACE_QUEUE_LISTING' | 'SOLACE_SUBSCRIPTION_CONFIG'>;
    destinations?: Array<'EVENT_PORTAL' | 'FILE_WRITER'>;
    readonly type?: string;
}

export namespace MessagingServiceOperation {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceOperation';


}