/* eslint-disable */


import type { BasePolicyDTO } from './BasePolicyDTO';

export type SolacePolicy = (BasePolicyDTO & {
    /**
     * Toggles between the use of a queue and direct messaging.
     */
    guaranteedMessaging?: boolean,
    accessType?: SolacePolicy.accessType,
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

export namespace SolacePolicy {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SolacePolicy';

    export enum accessType {
        exclusive = 'exclusive',
        nonexclusive = 'non-exclusive',
    }


}