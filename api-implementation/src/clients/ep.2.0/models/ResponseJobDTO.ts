/* eslint-disable */


import type { JobDTO } from './JobDTO';

export type ResponseJobDTO = {
    data?: JobDTO;
    meta?: Record<string, any>;
}

export namespace ResponseJobDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ResponseJobDTO';


}