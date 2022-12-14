/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';
import type { EventApiProductRegistration } from './EventApiProductRegistration';
import type { Filter } from './Filter';
import type { Plan } from './Plan';
import type { SolaceMessagingService } from './SolaceMessagingService';

export type EventApiProductVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    eventApiProductId: string;
    description?: string;
    version?: string;
    summary?: string;
    customAttributes?: Array<CustomAttribute>;
    displayName?: string;
    /**
     * List of IDs of associated event API versions
     */
    eventApiVersionIds?: Array<string>;
    stateId?: string;
    eventApiProductRegistrations?: Array<EventApiProductRegistration>;
    plans?: Array<Plan>;
    /**
     * Solace Messaging Services
     */
    solaceMessagingServices?: Array<SolaceMessagingService>;
    /**
     * List of filters that contains eventVersionId name and variables
     */
    filters?: Array<Filter>;
    /**
     * Approval type
     */
    approvalType: EventApiProductVersion.approvalType;
    /**
     * The type of payload
     */
    readonly type?: string;
}

export namespace EventApiProductVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductVersion';

    /**
     * Approval type
     */
    export enum approvalType {
        automatic = 'automatic',
        manual = 'manual',
    }


}