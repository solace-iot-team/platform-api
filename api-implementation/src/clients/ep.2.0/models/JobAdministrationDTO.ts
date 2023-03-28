/* eslint-disable */


export type JobAdministrationDTO = {
    jobId?: string;
    orgId?: string;
    jobType?: string;
    status?: JobAdministrationDTO.status;
    loggingReason?: string;
    jobDetails?: string;
    createdTime?: string;
    updatedTime?: string;
    createdBy?: string;
    changedBy?: string;
    type?: string;
}

export namespace JobAdministrationDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'JobAdministrationDTO';

    export enum status {
        in_progress = 'in_progress',
        error = 'error',
        validation_error = 'validation_error',
        success = 'success',
    }


}