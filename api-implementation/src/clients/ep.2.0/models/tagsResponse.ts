/* eslint-disable */


import type { meta } from './meta';
import type { Tag } from './Tag';

export type tagsResponse = {
    data?: Array<Tag>;
    meta?: meta;
}

export namespace tagsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'tagsResponse';


}