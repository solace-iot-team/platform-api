
import { OpenAPI } from './generated/openapi/core/OpenAPI';
import { ApiError } from './generated/openapi';

export function isInstanceOfApiError(error: any): boolean {
    let apiError: ApiError = error;
    if(apiError.status === undefined) return false;
    if(apiError.statusText === undefined) return false;
    if(apiError.url === undefined) return false;
    if(apiError.message === undefined) return false; 
    return true;
}


export class PlatformAPIClient {
    private base: string;
    private managementUser: string;
    private managementPwd: string;
    private apiUser: string;
    private apiPwd: string;
    private doUse: string = PlatformAPIClient.UseApiUser;

    private static UseManagementUser: string = "ManagementUser";
    private static UseApiUser: string = "ApiUser";

    getOpenApiUser = async(): Promise<string> => {
        return (this.doUse == PlatformAPIClient.UseApiUser ? this.apiUser : this.managementUser);
    }  
    getOpenApiPwd = async(): Promise<string> => {
        return (this.doUse == PlatformAPIClient.UseApiUser ? this.apiPwd : this.managementPwd);
    }  
    constructor(base: string, managementUser: string , managementPwd: string, apiUser: string, apiPwd: string) {
        this.base = base;
        this.managementUser = managementUser;
        this.managementPwd = managementPwd;
        this.apiUser = apiUser;
        this.apiPwd = apiPwd;
        OpenAPI.BASE = this.base;
        OpenAPI.USERNAME = this.getOpenApiUser;
        OpenAPI.PASSWORD = this.getOpenApiPwd;
    }
    useApiUser = () => {
        this.doUse = PlatformAPIClient.UseApiUser;
    }
    useManagementUser = () => {
        this.doUse = PlatformAPIClient.UseManagementUser;
    }
}

export type ApiPermissions = Array<{
    name: string,
    value: string,
  }>;