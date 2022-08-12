/* eslint-disable */


export type SchemaObject = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    applicationDomainId: string;
    name: string;
    shared?: boolean;
    contentType: string;
    schemaType: string;
    readonly numberOfVersions?: number;
    readonly eventVersionRefCount?: number;
    readonly type?: string;
}

export namespace SchemaObject {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SchemaObject';


}