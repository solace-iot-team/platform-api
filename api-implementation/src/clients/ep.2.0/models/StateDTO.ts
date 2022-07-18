/* eslint-disable */


export type StateDTO = {
    id?: string;
    description?: string;
    name?: string;
    stateOrder?: number;
    type?: string;
}

export namespace StateDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StateDTO';


}