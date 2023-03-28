/* eslint-disable */


import type { RuntimeAgentRegionInternalDTO } from './RuntimeAgentRegionInternalDTO';

export type RuntimeAgentRegionInternalResponse = {
    data?: RuntimeAgentRegionInternalDTO;
    meta?: Record<string, any>;
}

export namespace RuntimeAgentRegionInternalResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentRegionInternalResponse';


}