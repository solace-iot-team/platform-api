
import { OpenAPI } from './generated/openapi/core/OpenAPI';
import { ApiError, Credentials } from './generated/openapi';

export function isInstanceOfApiError(error: any): boolean {
    let apiError: ApiError = error;
    if(apiError.status === undefined) return false;
    if(apiError.statusText === undefined) return false;
    if(apiError.url === undefined) return false;
    if(apiError.message === undefined) return false; 
    return true;
}

enum AuthUser {
    ManagementUser,
    ApiUser    
}

export class PlatformAPIClient {    
    private static base: string;
    private static managementUser: string;
    private static managementPwd: string;
    private static apiUser: string;
    private static apiPwd: string;
    private static authUser: AuthUser = AuthUser.ApiUser;

    public static getOpenApiUser = async(): Promise<string> => {
        return (PlatformAPIClient.authUser === AuthUser.ApiUser ? PlatformAPIClient.apiUser : PlatformAPIClient.managementUser);
    }  
    public static getOpenApiPwd = async(): Promise<string> => {
        return (PlatformAPIClient.authUser === AuthUser.ApiUser ? PlatformAPIClient.apiPwd : PlatformAPIClient.managementPwd);
    }  
    public static initialize = (base: string, managementUser: string , managementPwd: string, apiUser: string, apiPwd: string) => {
        PlatformAPIClient.base = base;
        PlatformAPIClient.managementUser = managementUser;
        PlatformAPIClient.managementPwd = managementPwd;
        PlatformAPIClient.apiUser = apiUser;
        PlatformAPIClient.apiPwd = apiPwd;
        OpenAPI.BASE = base;
        OpenAPI.USERNAME = PlatformAPIClient.getOpenApiUser;
        OpenAPI.PASSWORD = PlatformAPIClient.getOpenApiPwd;

    }
    public static setApiUser = () => {
        PlatformAPIClient.authUser = AuthUser.ApiUser;
    }
    public static setManagementUser = () => {
        PlatformAPIClient.authUser = AuthUser.ManagementUser;
    }
}

export type ApiPermissions = Array<{
    name: string,
    value: string,
  }>;

// export function createConsumerKey(org:string, env: string, developer: string): string {
//     // let k = `key-${org}-${env}-${developer}`;
//     // if(k.length > 32) {
//     //     throw new Error(`key=${k}, len=${k.length}`);
//     // } 
//     // developer is alreay unique
//     return developer;
// }
// export function createConsumerSecret(org:string, env: string, developer: string): string {
//     return `secret-${org}-${env}-${developer}`;
// }

export function createDefaultCredentials() : Credentials {
    return {
        expiresAt: -1
    };
}