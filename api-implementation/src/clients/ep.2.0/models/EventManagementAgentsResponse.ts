/* eslint-disable */


import type { EventManagementAgent } from './EventManagementAgent';
import type { meta } from './meta';

export type EventManagementAgentsResponse = {
    data?: Array<EventManagementAgent>;
    meta?: meta;
}

export namespace EventManagementAgentsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventManagementAgentsResponse';


}