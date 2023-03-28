/* eslint-disable */


import type { TopicFilter } from './TopicFilter';

/**
 * List of filters that contains eventVersionId name and variables
 */
export type Filter = {
    eventVersionId?: string;
    /**
     * List of variable that contains address node name and filters
     */
    topicFilters?: Array<TopicFilter>;
    id?: string;
    /**
     * The type of payload
     */
    readonly type: string;
}

export namespace Filter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Filter';


}