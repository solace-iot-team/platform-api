/* eslint-disable */


import type { OrgDTO } from './OrgDTO';

export type ResponseOrgDTO = {
    data?: OrgDTO;
    meta?: Record<string, any>;
}

export namespace ResponseOrgDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ResponseOrgDTO';


}