/* eslint-disable */


import type { RuntimeAgentRegionInternalDTO } from './RuntimeAgentRegionInternalDTO';

export type RuntimeAgentRegionInternalsResponse = {
    data?: Array<RuntimeAgentRegionInternalDTO>;
    meta?: Record<string, any>;
}

export namespace RuntimeAgentRegionInternalsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentRegionInternalsResponse';


}