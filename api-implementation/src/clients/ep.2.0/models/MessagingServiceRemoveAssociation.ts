/* eslint-disable */


export type MessagingServiceRemoveAssociation = {
    /**
     * The target association to be removed from the messaging service.
     */
    association?: MessagingServiceRemoveAssociation.association;
}

export namespace MessagingServiceRemoveAssociation {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceRemoveAssociation';

    /**
     * The target association to be removed from the messaging service.
     */
    export enum association {
        RUNTIME_AGENT = 'RUNTIME_AGENT',
        EVENT_MESH = 'EVENT_MESH',
        EVENT_MANAGEMENT_AGENT = 'EVENT_MANAGEMENT_AGENT',
    }


}