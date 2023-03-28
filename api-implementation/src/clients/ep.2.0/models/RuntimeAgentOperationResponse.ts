/* eslint-disable */


import type { RuntimeAgentOperationDTO } from './RuntimeAgentOperationDTO';

export type RuntimeAgentOperationResponse = {
    data?: RuntimeAgentOperationDTO;
    meta?: Record<string, any>;
}

export namespace RuntimeAgentOperationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentOperationResponse';


}