import { RequestInit } from "node-fetch";
import { LoggingHelper, PlatformRequestHelper, PlatformResponseHelper } from "./test.helpers";

export class PlatformManagementHelper {

    private platformManagementRequest: PlatformRequestHelper;
    private apiPath: string = "organizations"
    private logging: LoggingHelper = null;

    constructor(platformManagementRequest: PlatformRequestHelper, logging: LoggingHelper) {
        this.platformManagementRequest = platformManagementRequest;
        this.logging = logging;
    }
    private _logResponse = (msg: string, response: PlatformResponseHelper) => { 
        this.logging.logResponse(`platformManagement:${msg}`, response);
    }
    createOrg = async (orgName: string): Promise<boolean> => {
        let body = {
          name: orgName
        }
        let request: RequestInit = {
          method: "POST",
          body: JSON.stringify(body)
        };
        let response: PlatformResponseHelper = await this.platformManagementRequest.fetch(this.apiPath, request);
        this.logging.logResponse(`create org: ${orgName}`, response);
        return true;
    }
    deleteOrg = async (orgName: string): Promise<boolean> => {
        let apiPath: string = this.apiPath + "/" + orgName;
        let request: RequestInit = {
            method: "DELETE"
        };
        // console.log(`deleting ${orgName}...`);
        let response: PlatformResponseHelper = await this.platformManagementRequest.fetch(apiPath, request); 
        // console.log(`apiPath=${apiPath}`);
        // console.log(`deleting org=${JSON.stringify(org, null, 2)}`);
        // response = await this.platformRequest.fetch(apiPath, request);         
        // console.log("why am i not seeing this?");
        this._logResponse(`delete org '${orgName}'` , response);
        return true;
    }
    deleteAllOrgs = async(): Promise<boolean> => {
        let request: RequestInit = null;
        let response: PlatformResponseHelper = null;
        request = {
            method: "GET"
          };
        response = await this.platformManagementRequest.fetch(this.apiPath, request);
        this._logResponse("get all orgs", response);
        if(response.status == 200) {
            let orgs = response.body;
            let num = orgs ? orgs.length : 0;
            for (let i=0; i < num; i++) {
                let success = await this.deleteOrg(orgs[i].name);
                // let org = orgs[i];
                // let apiPath: string = this.apiPath + "/" + org.name;
                // console.log(`apiPath=${apiPath}`);
                // console.log(`deleting org=${JSON.stringify(org, null, 2)}`);
            }


            // await orgs.forEach(async(org) => {
            //     let apiPath: string = this.apiPath + "/" + org.name;
            //     request = {
            //         method: "DELETE"
            //     };
            //     console.log(`apiPath=${apiPath}`);
            //     console.log(`deleting org=${JSON.stringify(org, null, 2)}`);
            //     response = await this.platformManagementRequest.fetch(apiPath, request); 
                
            //     console.log("why am i not seeing this?");
                
            //     this._logResponse(`delete org '${org.name}'` , response);
            // });
        }
        return true;
    }
}

