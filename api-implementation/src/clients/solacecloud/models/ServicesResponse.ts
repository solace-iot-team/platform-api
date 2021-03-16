/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Service } from './Service';

export type ServicesResponse = {
    data: Array<Service>;
    meta: {
        currentTime?: number,
        pages?: {
            'next-page'?: number,
            'total-pages'?: number,
        },
        pageNumber?: number,
        count?: number,
        pageSize?: number,
    };
}
