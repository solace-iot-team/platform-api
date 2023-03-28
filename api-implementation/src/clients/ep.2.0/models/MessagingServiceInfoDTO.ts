/* eslint-disable */


export type MessagingServiceInfoDTO = {
    name?: string;
    eventMeshId?: string;
    id?: string;
    type?: string;
}

export namespace MessagingServiceInfoDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceInfoDTO';


}