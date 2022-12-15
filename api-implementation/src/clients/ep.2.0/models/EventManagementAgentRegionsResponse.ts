/* eslint-disable */


import type { EventManagementAgentRegion } from './EventManagementAgentRegion';
import type { meta } from './meta';

export type EventManagementAgentRegionsResponse = {
    data?: Array<EventManagementAgentRegion>;
    meta?: meta;
}

export namespace EventManagementAgentRegionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventManagementAgentRegionsResponse';


}