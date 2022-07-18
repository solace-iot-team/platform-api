/* eslint-disable */


import type { ErrorResponse } from './ErrorResponse';
import type { InvalidNonStateReference } from './InvalidNonStateReference';

export type InvalidStateReference = (ErrorResponse & {
    targetStateId?: string,
    inboundInvalidNonStateReferences?: Array<InvalidNonStateReference>,
    inboundInvalidStateReferences?: Array<InvalidStateReference>,
    outboundInvalidStateReferences?: Array<InvalidStateReference>,
    errorType?: string,
});

export namespace InvalidStateReference {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'InvalidStateReference';


}