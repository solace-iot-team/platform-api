/* eslint-disable */


export type TopicAddressEnum = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    applicationDomainId: string;
    name: string;
    shared?: boolean;
    readonly numberOfVersions?: number;
    readonly eventVersionRefCount?: number;
    readonly type?: string;
}

export namespace TopicAddressEnum {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnum';


}