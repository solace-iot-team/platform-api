/* eslint-disable */


export type EventThresholdByPercent = {
    /**
     * The clear threshold for the value of this counter as a percentage of its maximum value. Falling below this value will trigger a corresponding event.
     */
    clearPercent?: number;
    /**
     * The set threshold for the value of this counter as a percentage of its maximum value. Exceeding this value will trigger a corresponding event.
     */
    setPercent?: number;
}

export namespace EventThresholdByPercent {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventThresholdByPercent';


}