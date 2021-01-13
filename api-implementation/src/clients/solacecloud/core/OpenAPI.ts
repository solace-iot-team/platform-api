/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
interface Config {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN: string | (() => Promise<string>);
}

export const OpenAPI: Config = {
    BASE: 'https://api.solace.cloud/api/v0',
    VERSION: '0.0.1',
    WITH_CREDENTIALS: false,
    TOKEN: '',
};