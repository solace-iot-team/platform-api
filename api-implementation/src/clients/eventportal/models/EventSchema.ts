/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface EventSchema {
    readonly createdTime?: number;
    readonly updatedTime?: number;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name?: string;
    readonly version?: string;
    shared?: boolean;
    description?: string;
    revisionComment?: string;
    contentType?: EventSchema.contentType;
    content?: string;
    readonly eventIds?: Array<string>;
    applicationDomainId?: string;
    readonly revisionNumber?: number;
    readonly type?: string;
}

export namespace EventSchema {

    export enum contentType {
        JSON = 'JSON',
        AVRO = 'AVRO',
        XML = 'XML',
        TEXT = 'Text',
        BINARY = 'Binary',
    }


}
