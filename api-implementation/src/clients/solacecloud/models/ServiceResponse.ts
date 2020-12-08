/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Service } from './Service';

export interface ServiceResponse {
    data: Service;
    meta: {
        currentTime?: number,
    };
}
