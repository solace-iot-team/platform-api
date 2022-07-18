/* eslint-disable */


export type SolacePolicy = {
    /**
     * Id value of the object
     */
    readonly id?: string;
    /**
     * Toggles on/off a queue.
     */
    guaranteedMessaging?: boolean;
    accessType?: SolacePolicy.accessType;
    /**
     * Count in seconds of how long a message can live in a queue
     */
    maximumTimeToLive?: number;
    /**
     * Indication whether a different queue exists for each eAPI version under the EAP
     */
    queuePerEventApi?: boolean;
    /**
     * Count of the number of MBs available for the queue to use
     */
    spoolSize?: number;
    readonly type: string;
}

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