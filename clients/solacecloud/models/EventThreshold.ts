/* eslint-disable */


export type EventThreshold = {
    /**
     * The clear threshold for the value of this counter as a percentage of its maximum value. Falling below this value will trigger a corresponding event. This attribute may not be returned in a GET.
     */
    clearPercent?: number;
    /**
     * The clear threshold for the absolute value of this counter. Falling below this value will trigger a corresponding event. This attribute may not be returned in a GET.
     */
    clearValue?: number;
    /**
     * The set threshold for the value of this counter as a percentage of its maximum value. Exceeding this value will trigger a corresponding event. This attribute may not be returned in a GET.
     */
    setPercent?: number;
    /**
     * The set threshold for the absolute value of this counter. Exceeding this value will trigger a corresponding event. This attribute may not be returned in a GET.
     */
    setValue?: number;
}

export namespace EventThreshold {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventThreshold';


}