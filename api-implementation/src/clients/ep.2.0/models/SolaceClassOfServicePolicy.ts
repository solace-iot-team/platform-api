/* eslint-disable */


import type { BasePolicyDTO } from './BasePolicyDTO';

/**
 * Solace class of service policy
 */
export type SolaceClassOfServicePolicy = (BasePolicyDTO & {
    /**
     * The type of message delivery mode in the current event API product version
     */
    messageDeliveryMode: SolaceClassOfServicePolicy.messageDeliveryMode,
    accessType?: SolaceClassOfServicePolicy.accessType,
    /**
     * Duration in seconds of how long a message can live in a queue
     */
    maximumTimeToLive?: number,
    /**
     * The type of queue to be used in the current event API product version
     */
    queueType: SolaceClassOfServicePolicy.queueType,
    /**
     * Total number of MBs available for the queue to use
     */
    maxMsgSpoolUsage?: number,
});

export namespace SolaceClassOfServicePolicy {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceClassOfServicePolicy';

    /**
     * The type of message delivery mode in the current event API product version
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
     * The type of queue to be used in the current event API product version
     */
    export enum queueType {
        single = 'single',
        combined = 'combined',
    }


}