
import fetch, { RequestInit, HeadersInit, Response } from "node-fetch";

export interface UserRegistry {
    org1_admin_user: string,
    org2_admin_user: string
}
export function getOptionalEnvVarValue(envVar: string): string {
    const value: string = (process.env[envVar] === undefined) ? null : process.env[envVar];
    return value;
}
export function getMandatoryEnvVarValue(scriptName: string, envVar: string): string {
    const value: string = (process.env[envVar] === undefined) ? null : process.env[envVar];
    if (value == null) throw new Error(`>>> ERROR: ${scriptName} - missing env var: ${envVar}`);
    return value;
}
export function getBaseUrl(platformProtocol: string, platformHost: string, platformPort: string): string {
    return `${platformProtocol}://${platformHost}:${platformPort}/v1`;
}
export function getRequestAuthHeader(usr: string, pwd: string): string {
    return "Basic " + Buffer.from(usr + ":" + pwd).toString("base64");
}
export class LoggingHelper {
    private do_log: boolean = false;
    constructor(do_log: boolean) {
        this.do_log = do_log;
    }
    setLogging = (do_log: boolean) => { this.do_log = do_log; }
    logResponse = (msg: string, response: PlatformResponseHelper) => {
        if(this.do_log) console.log(`[response] - ${msg}:\n${response.toJson()}`);
    }
    logMessage = (component: string, msg: string) => {
        if(this.do_log) console.log(`[${component}] - ${msg}`);
    }
}
export class PlatformResponseHelper {
    public status;
    public statusText;
    public url;
    public body;
    constructor(fetchResponse: Response, body: string) {
        this.status = fetchResponse.status;
        this.statusText = fetchResponse.statusText;
        this.url = fetchResponse.url;
        this.body = body;
    }
    public static create = async(fetchResponse: Response) => {
        let isContentTypeJson: boolean = (fetchResponse.headers.has('content-type') && fetchResponse.headers.get('content-type').toLowerCase().includes('json') ? true : false);
        let bodyText: string = await fetchResponse.text();
        let bodyJson: string = null;
        if (isContentTypeJson && bodyText) {
            try {
                bodyJson = JSON.parse(bodyText);
            } catch (err) {
                throw new Error(`error parsing response text as json: ${err}, text=${bodyText}`);
            }
        } else {
            bodyJson = JSON.parse(JSON.stringify({ raw: bodyText }));
        }
        return new PlatformResponseHelper(fetchResponse, bodyJson);
    }
    toJson = (): string => {
        return JSON.stringify(this, null, 2);
    }
}
export class PlatformRequestHelper {
    public static ContentTypeApplicationJson = "application/json";
    public static ContentTypeTextPlain = "text/plain";

    private baseUrl: string;
    private headers: HeadersInit;
    constructor(platformProtocol: string, platformHost: string, platformPort: string, platformAdminUser: string, platformAdminPassword: string) {
        this.baseUrl = getBaseUrl(platformProtocol, platformHost, platformPort);
        this.headers = {
            Authorization: getRequestAuthHeader(platformAdminUser, platformAdminPassword)
            // "Content-Type": "application/json"
        }
    }
    fetch = async(apiPath: string, requestInit: RequestInit, contentType: string = PlatformRequestHelper.ContentTypeApplicationJson): Promise<PlatformResponseHelper> => {
        let uri = this.baseUrl + "/" + apiPath;
        requestInit.headers = this.headers;
        requestInit.headers["Content-Type"] = contentType;
        let fetchResponse: Response = await fetch(uri, requestInit);
        let response: PlatformResponseHelper = await PlatformResponseHelper.create(fetchResponse);
        return response;
    } 
}

