/* eslint-disable */


import type { EventManagementAgent } from './EventManagementAgent';

export type EventManagementAgentResponse = {
    data?: EventManagementAgent;
    meta?: Record<string, any>;
}

export namespace EventManagementAgentResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventManagementAgentResponse';


}