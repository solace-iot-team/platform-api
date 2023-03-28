/* eslint-disable */


import type { BasePolicyDTO } from './BasePolicyDTO';

/**
 * Solace class of service policy
 */
export type SolaceClassOfServicePolicy = (BasePolicyDTO & {
    /**
     * The mode that will be used for message delivery (ex: `guaranteed` uses a queue)
     */
    messageDeliveryMode: SolaceClassOfServicePolicy.messageDeliveryMode,
    accessType?: SolaceClassOfServicePolicy.accessType,
    /**
     * Duration in seconds of how long a message can live in a queue
     */
    maximumTimeToLive?: number,
    /**
     * The arrangement of queues on a broker used for message delivery (ex: `single` uses one queue per event API version in this event API product)
     */
    queueType: SolaceClassOfServicePolicy.queueType,
    /**
     * Total number of MBs available for the queue to use
     */
    maxMsgSpoolUsage?: number,
    /**
     * The type of payload
     */
    readonly type: string,
});

export namespace SolaceClassOfServicePolicy {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceClassOfServicePolicy';

    /**
     * The mode that will be used for message delivery (ex: `guaranteed` uses a queue)
     */
    export enum messageDeliveryMode {
        direct = 'direct',
        guaranteed = 'guaranteed',
    }

    export enum accessType {
        exclusive = 'exclusive',
        nonexclusive = 'non-exclusive',
    }

    /**
     * The arrangement of queues on a broker used for message delivery (ex: `single` uses one queue per event API version in this event API product)
     */
    export enum queueType {
        single = 'single',
        combined = 'combined',
    }


}