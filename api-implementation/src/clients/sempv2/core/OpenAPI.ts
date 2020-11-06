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
    BASE: 'http://www.solace.com/SEMP/v2/config',
    VERSION: '2.13',
    WITH_CREDENTIALS: false,
    TOKEN: '',
};