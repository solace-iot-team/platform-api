
import fetch, { RequestInit, HeadersInit, Response } from "node-fetch";
import fs from 'fs';
import yaml from "js-yaml";
import _ from 'lodash';

import * as sinon from 'sinon';
import * as __requestLib from '../lib/generated/openapi/core/request';

import { ApiRequestOptions } from "./generated/openapi/core/ApiRequestOptions";
import { v4 } from "uuid";
import { ApiResult } from "./generated/openapi/core/ApiResult";
import { ApiError } from "./generated/openapi";

export type Developer = {
    userName: string,
    email: string,
    firstName: string,
    lastName: string
};

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
export class TestLogger {
    private static do_log: boolean = true;
    public static setLogging = (do_log: boolean) => { TestLogger.do_log = do_log; }
    public static logResponse = (msg: string, response: PlatformResponseHelper) => {
        if(TestLogger.do_log) console.log(`[response] - ${msg}:\n${response.toJson()}`);
    }
    public static cloneWithHidenSecrets = (config: any) => _.transform(config, (r:any, v:any, k:string) => {
        if(_.isObject(v)) {
            r[k] = TestLogger.cloneWithHidenSecrets(v)
        } else if(typeof k === 'string') {
            let _k = k.toLowerCase();
            if( _k.includes('token')        ||
                _k.includes('pwd')          ||
                _k.includes('service_id')   ||
                _k.includes('portal_url')   ||
                _k.includes('admin_user')   ||
                _k.includes('password')     ) {
                    r[k] = '***';
            } else {
                r[k] = v;
            }
        } else {
            r[k] = v;
        }            
    })
    public static logTestEnv = (component: string, testEnv: any) => {
        if(!TestLogger.do_log) return;
        let te = TestLogger.cloneWithHidenSecrets(testEnv);
        console.log(`[${component}] - testEnv=${JSON.stringify(te, null, 2)}`);
    }
    public static logMessage = (component: string, msg: string) => {
        if(TestLogger.do_log) console.log(`[${component}] - ${msg}`);
    }
    public static getLoggingApiRequestOptions = (options: ApiRequestOptions): string => {
        let logOptions:any = TestLogger.cloneWithHidenSecrets(options);
        if(logOptions.path.includes('token')) {
            logOptions.body = "***";
        }
        return JSON.stringify(logOptions, null, 2);
    }
    public static getLoggingApiResult = (result: ApiResult): string => {
        let logResult:any = TestLogger.cloneWithHidenSecrets(result);
        if(logResult && logResult.url && logResult.url.includes('token')) {
            logResult.body = "***";
        }
        return JSON.stringify(logResult, null, 2);
    }
    public static logApiRequestOptions = (id: string, options: ApiRequestOptions) => {
        if(!TestLogger.do_log) return;
        console.log(`[${id}]: ApiRequestOptions=\n${TestLogger.getLoggingApiRequestOptions(options)}\n`);
    }
    public static logApiResult = (id: string, result: ApiResult) => {
        if(!TestLogger.do_log) return;
        console.log(`[${id}]: ApiResult=\n${TestLogger.getLoggingApiResult(result)}\n`);
    }
    public static logApiError = (id: string, apiError: ApiError) => {
        if(!TestLogger.do_log) return;
        console.log(`[${id}]: ApiError=\n${JSON.stringify(apiError, null, 2)}\n`);
    }
    public static createTestFailMessage = (message: string): string => {
        return `[${TestContext.getItId()}]: ${message}\napiRequestOptions=${TestLogger.getLoggingApiRequestOptions(TestContext.getApiRequestOptions())}\napiResult=${TestLogger.getLoggingApiResult(TestContext.getApiResult())}\napiError=${JSON.stringify(TestContext.getApiError(), null, 2)}\n`;
    }
    public static createNotApiErrorMesssage = (message: string): string => {
        return `[${TestContext.getItId()}]: error is not an instance of ApiError, error=${message}`;
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
    constructor(platformProtocol: string, platformHost: string, platformPort: string, platformAdminUser: string, platformAdminPassword: any) {
        this.baseUrl = getBaseUrl(platformProtocol, platformHost, platformPort);
        let pw : string = null;
        if (typeof platformAdminPassword === 'string' || platformAdminPassword instanceof String){
          pw = platformAdminPassword as string;
        } else {
          pw = platformAdminPassword.password;
        }
        
        this.headers = {
            Authorization: getRequestAuthHeader(platformAdminUser, pw)
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

export class AsyncAPIHelper {
	// getContentType(apiSpec: string): string {
	// 	try {
	// 		var o = JSON.parse(apiSpec);
	// 		if (o && typeof o === "object") {
	// 			return "application/json";
	// 		} else {
	// 			return "application/x-yaml";
	// 		}
	// 	}
	// 	catch (e) {
	// 		return "application/x-yaml";
	// 	 }
	// }

	public static loadYamlFileAsJsonString(apiSpecPath: string): string {
        const b: Buffer = fs.readFileSync(apiSpecPath);
        const obj = yaml.load(b.toString());
        return JSON.stringify(obj);
	}
	// JSONtoYAML(apiSpec: string): string{
	// 	if (this.getContentType(apiSpec)=="application/json"){
	// 		var o = JSON.parse(apiSpec);
	// 		return YAML.dump(o);
	// 	} else {
	// 		throw new ErrorResponseInternal(500, "Invalid JSON");
	// 	}
		
	// }
}


export function _getObjectDifferences(object: any, base: any): any {
	function changes(object: any, base: any): any {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
    let _changes = changes(object, base);
        // check for empty keys

	return changes(object, base);
}
export function getObjectDifferences(object: any, base: any): any {
    let leftDiff: any = _getObjectDifferences(object, base);
    let rightDiff: any = _getObjectDifferences(base, object);
    // warning: overrides arrays
    return _.merge(leftDiff, rightDiff);
}

export type ExpectDiff = {
    diff: any,
    message: string
}
export function getExpectEqualDiff(expected: any, received: any): ExpectDiff {
    let diff = getObjectDifferences(expected, received);
    let message = `\nexpected response=${JSON.stringify(expected, null, 2)}, \nactual response=${JSON.stringify(received, null, 2)}, \ndiff=${JSON.stringify(diff, null, 2)}`;
    return { diff: diff, message: message };
}
export function getExpectContainedDiff(containedObject: any, object: any): ExpectDiff {
    let compositeObject = _.merge(_.cloneDeep(containedObject), object);
    let diff = getObjectDifferences(compositeObject, object);
    let message = `\nexpected response contained=${JSON.stringify(containedObject, null, 2)}, \nactual response=${JSON.stringify(object, null, 2)}, \ndiff not contained in response=${JSON.stringify(diff, null, 2)}`;
    return { diff: diff, message: message };
}

export class TestContext {

    private static itId: string;
    private static apiRequestOptions: ApiRequestOptions;
    private static apiResult: ApiResult;
    private static apiError: ApiError;

    public static newItId() {
        TestContext.itId = v4().replace(/-/g, '_');
    }
    public static getItId(): string {
        return TestContext.itId;
    }
    public static setApiRequestOptions(options: ApiRequestOptions) {
        TestContext.apiRequestOptions = options;
    }
    public static getApiRequestOptions(): ApiRequestOptions {
        return TestContext.apiRequestOptions;
    }
    public static setApiResult(result: ApiResult) {
        TestContext.apiResult = result;
    }
    public static getApiResult(): ApiResult {
        return TestContext.apiResult;
    }
    public static setApiError(error: ApiError) {
        TestContext.apiError = error;
    }
    public static getApiError(): ApiError {
        return TestContext.apiError;
    }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Stubbing global request from openapi
let requestStub = sinon.stub(__requestLib, 'request')
.callsFake(
  async(options: ApiRequestOptions): Promise<ApiResult> => {
    TestContext.setApiRequestOptions(options);
    TestContext.setApiResult(undefined);
    TestContext.setApiError(undefined);
    TestLogger.logApiRequestOptions(TestContext.getItId(), TestContext.getApiRequestOptions());    
    try {
      TestContext.setApiResult(await (__requestLib.request as any).wrappedMethod(options));
      TestLogger.logApiResult(TestContext.getItId(), TestContext.getApiResult());
    } catch(e) {
      TestContext.setApiError(e);
      TestLogger.logApiError(TestContext.getItId(), TestContext.getApiError());
      throw e;
    }
    return TestContext.getApiResult();  
});

