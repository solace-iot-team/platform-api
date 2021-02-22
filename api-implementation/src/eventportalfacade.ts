import L from '../server/common/logger';

import APIListItem = Components.Schemas.APIListItem;
import APIDomain = Components.Schemas.APIDomain;
import API = Components.Schemas.API;
import { ApiError, AsyncApiService, Application, ApplicationDomainsResponse, ApplicationDomainsService, ApplicationResponse, ApplicationsService, OpenAPI, GenerateAsyncAPIRequest } from "./clients/eventportal";
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import C from 'cls-hooked';

class EventPortalFacade {
	constructor() {
		//OpenAPI.TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmciOiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18YcuNk4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnxbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRQe0-3svIPw';
	}

	private getToken(): string {
		var namespace = C.getNamespace('platform-api');
		var token: string = null;
		namespace.run(function () {
			token = namespace.get('cloud-token');
		});
		L.info(`token is ${token}`);
		return token;
	}
	public async validate(token: string): Promise<boolean> {
		OpenAPI.TOKEN = token;
		try {
			var result: Promise<any> = await ApplicationDomainsService.list(100, 1);
			if (result != null){
				return true;
			} else {
				return false;
			}

		} catch (e) {
			return false;
		 }
	}
	public async getApis(): Promise<APIListItem[]> {
		return new Promise<APIListItem[]>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			var result: Promise<any> = ApplicationDomainsService.list(100, 1);
			var apiList: APIListItem[] = [];

			var appDomainPromises: Promise<string>[] = [];

			result.then((value: ApplicationDomainsResponse) => {
				value.data.forEach((appDomain) => {
					appDomainPromises.push(new Promise<string>((resolve, reject) => {
						var apiPromises: Promise<any>[] = [];
						appDomain.applicationIds.forEach((applicationId) => {
							apiPromises.push(ApplicationsService.get1(applicationId));


						});
						Promise.all(apiPromises).then((apiResponses: ApplicationResponse[]) => {
							apiResponses.forEach((apiResponse: ApplicationResponse) => { apiList.push({ name: apiResponse.data.name, apiDomain: appDomain.name }); });
							resolve(appDomain.name);
						});
					}));
				});
				Promise.all(appDomainPromises).then((promises) => {
					resolve(apiList);
				});
			});
			result.catch((val: ApiError) => { reject(new ErrorResponseInternal(val.status, val.message)) });

		});
	}
	public async getAllApiDomains(): Promise<APIDomain[]> {
		OpenAPI.TOKEN = this.getToken();
		return this.getApiDomains(null);
	}

	public async getApiDomains(name: string): Promise<APIDomain[]> {
		return new Promise<APIDomain[]>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			L.info(`Looking up APIDomain ${name}`);
			var result: Promise<any> = ApplicationDomainsService.list(100, 1, name);
			var apiDomainList: APIDomain[] = [];

			var appDomainPromises: Promise<string>[] = [];

			result.then((value: ApplicationDomainsResponse) => {

				if (value.data.length < 1) {
					L.info(`Resolving ${value.data.length}`);
					resolve(null);
				} else {
					value.data.forEach((appDomain) => {
						appDomainPromises.push(new Promise<string>((resolve, reject) => {
							var apiPromises: Promise<any>[] = [];
							appDomain.applicationIds.forEach((applicationId) => {
								apiPromises.push(ApplicationsService.get1(applicationId));


							});
							L.info(`appDomain ${appDomain.name}`)
							Promise.all(apiPromises).then((apiResponses: ApplicationResponse[]) => {
								var d: APIDomain = {
									name: appDomain.name,
									createdTime: appDomain.createdTime,
									updatedTime: appDomain.updatedTime,
									createdBy: appDomain.createdBy,
									changedBy: appDomain.changedBy,
									id: appDomain.id,
									description: appDomain.description,
									topicDomain: appDomain.topicDomain,
									enforceUniqueTopicNames: appDomain.enforceUniqueTopicNames,
									type: appDomain.type,
									apis: []
								};
								apiResponses.forEach((apiResponse: ApplicationResponse) => { d.apis.push(apiResponse.data.name) });
								apiDomainList.push(d);
								resolve(appDomain.name);
							});
						}));
					});
					Promise.all(appDomainPromises).then((promises) => {
						resolve(apiDomainList);
					});
				}
			});
			result.catch((val: ApiError) => { reject(new ErrorResponseInternal(val.status, val.message)) });

		});
	}
	public async getApi(name: string): Promise<API> {
		return new Promise<API>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			var result: Promise<any> = ApplicationsService.list2(100, 1, name);
			result.then(
				(value: ApplicationResponse) => {
					var app: Application = value.data[0];
					if (!app) {
						reject(new ErrorResponseInternal(404, `Entity ${name} does not exist`))
					}
					var output: API = {
						name: app.name,
						createdTime: app.createdTime,
						updatedTime: app.updatedTime,
						createdBy: app.createdBy,
						changedBy: app.changedBy,
						id: app.id,
						version: app.version,
						description: app.description,
						apiDomainName: app.applicationDomainId,
						revisionNumber: app.revisionNumber,
						apiClass: app.applicationClass
					};
					resolve(output);
				}
			).catch((val: ApiError) => {
				reject(new ErrorResponseInternal(val.status, val.message));
			});


		}

		);
	}
	public async getApiSpec(name: string, asyncAPIVersion?: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			if (!asyncAPIVersion) {
				asyncAPIVersion = "2.0.0";
			}
			var result: Promise<any> = ApplicationsService.list2(100, 1, name);
			result.then(
				(value: ApplicationResponse) => {
					var app: Application = value.data[0];
					if (!app) {
						reject(new ErrorResponseInternal(404, `Entity ${name} does not exist`));
					}
					var apiId = app.id;
					var asyncAPIRequestBody: GenerateAsyncAPIRequest = { asyncApiVersion: asyncAPIVersion };
					L.debug(`Requesting Async API ${apiId} spec ${JSON.stringify(asyncAPIRequestBody)}`);
					var asyncAPIResponse: Promise<any> = AsyncApiService.generateAsyncApi(apiId, asyncAPIRequestBody);
					asyncAPIResponse.then((v: any) => {
						L.debug(`Parsing API spec `);

						Object.keys(v.channels).forEach(e => {
							var x = e.match(/(?<=\{)[^}]*(?=\})/g);
							var parameters = {};
							if (x) {
								x.forEach(match => {
									parameters[match] = {
										description: match,
										schema: { type: "string" }
									};
								});
								v.channels[e].parameters = parameters;
							}
						});
						resolve(v);
					}).catch((e: ApiError) => { reject(new ErrorResponseInternal(e.status, e.message)) });
				}
			).catch((val: ApiError) => {
				reject(new ErrorResponseInternal(val.status, val.message));
			});

		}

		);
	}
}

export default new EventPortalFacade();
