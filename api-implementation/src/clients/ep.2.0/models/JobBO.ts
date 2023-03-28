/* eslint-disable */


import type { JobType } from './JobType';

export type JobBO = {
    id?: string;
    jobType?: JobType;
    status?: JobBO.status;
    details?: string;
    results?: Array<string>;
    error?: Array<string>;
    orgId?: string;
    createdTime?: number;
    updatedTime?: number;
    changedBy?: string;
    createdBy?: string;
}

export namespace JobBO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'JobBO';

    export enum status {
        in_progress = 'in_progress',
        error = 'error',
        validation_error = 'validation_error',
        success = 'success',
    }


}