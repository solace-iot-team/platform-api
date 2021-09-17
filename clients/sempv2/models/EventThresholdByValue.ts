/* eslint-disable */


export type EventThresholdByValue = {
    /**
     * The clear threshold for the absolute value of this counter or rate. Falling below this value will trigger a corresponding event.
     */
    clearValue?: number;
    /**
     * The set threshold for the absolute value of this counter or rate. Exceeding this value will trigger a corresponding event.
     */
    setValue?: number;
}

export namespace EventThresholdByValue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventThresholdByValue';


}