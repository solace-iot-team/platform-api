/* eslint-disable */


import type { BasePolicyDTO } from './BasePolicyDTO';

/**
 * Solace class of service policy
 */
export type SolaceClassOfServicePolicy = (BasePolicyDTO & {
    /**
     * Toggles between the use of a queue and direct messaging.
     */
    guaranteedMessaging?: boolean,
    accessType?: SolaceClassOfServicePolicy.accessType,
    /**
     * Duration in seconds of how long a message can live in a queue
     */
    maximumTimeToLive?: number,
    /**
     * Toggles between one or more queues for each event API version in the current event API product version
     */
    queuePerEventApi?: boolean,
    /**
     * Total number of MBs available for the queue to use
     */
    spoolSize?: number,
});

export namespace SolaceClassOfServicePolicy {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolaceClassOfServicePolicy';

    export enum accessType {
        exclusive = 'exclusive',
        nonexclusive = 'non-exclusive',
    }


}