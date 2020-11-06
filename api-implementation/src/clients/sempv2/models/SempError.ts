/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface SempError {
    /**
     * The error code which uniquely identifies the error that has occurred.
     */
    code: number;
    /**
     * The verbose description of the problem.
     */
    description: string;
    /**
     * The terse status string associated with `code`.
     */
    status: string;
}
