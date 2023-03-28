/* eslint-disable */


import type { TagEntityAssociationsObject } from './TagEntityAssociationsObject';

export type TagAssociationsObject = {
    tags: Array<TagEntityAssociationsObject>;
}

export namespace TagAssociationsObject {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TagAssociationsObject';


}