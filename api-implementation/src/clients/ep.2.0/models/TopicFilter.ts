/* eslint-disable */


/**
 * List of variable that contains address node name and filters
 */
export type TopicFilter = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * name of address node
     */
    name?: string;
    /**
     * Different filter values separated by comma
     */
    filterValue?: string;
    eventVersionIds: Array<string>;
    type?: string;
}

export namespace TopicFilter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicFilter';


}