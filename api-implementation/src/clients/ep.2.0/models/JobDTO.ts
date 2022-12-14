/* eslint-disable */


export type JobDTO = {
    id?: string;
    status?: JobDTO.status;
    jobType?: string;
    error?: any;
    results?: any;
    type?: string;
}

export namespace JobDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'JobDTO';

    export enum status {
        in_progress = 'in_progress',
        error = 'error',
        validation_error = 'validation_error',
        success = 'success',
    }


}