/* eslint-disable */


import type { Tag } from './Tag';

export type TagResponse = {
    data?: Tag;
    meta?: Record<string, any>;
}

export namespace TagResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TagResponse';


}