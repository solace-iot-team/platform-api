/* eslint-disable */


export type TagEntityAssociationsObject = {
    tagId: string;
    entityType: string;
    entitiesToAssociate?: Array<string>;
    entitiesToDisassociate?: Array<string>;
}

export namespace TagEntityAssociationsObject {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TagEntityAssociationsObject';


}