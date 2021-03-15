/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Service } from './Service';

export type ServiceResponse = {
    data: Service;
    meta: {
        currentTime?: number,
    };
}
