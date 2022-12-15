/* eslint-disable */


import type { AuditDetail } from './AuditDetail';

export type AuditDetailResponse = {
    data?: AuditDetail;
    meta?: Record<string, any>;
}

export namespace AuditDetailResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AuditDetailResponse';


}