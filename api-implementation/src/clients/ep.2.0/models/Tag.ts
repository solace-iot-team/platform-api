/* eslint-disable */


export type Tag = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    readonly name: string;
    /**
     * The type of this payload, tag.
     */
    readonly type?: string;
}

export namespace Tag {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Tag';


}