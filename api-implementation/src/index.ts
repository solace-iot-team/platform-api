#!/usr/bin/env node

import { OpenAPI } from './clients/eventportal/core/OpenAPI';

import { ApplicationDomainsService, ApplicationDomainsResponse, ApplicationsResponse, ApplicationsService, ApplicationResponse } from './clients/eventportal';
import { Sempv2Client } from './sempv2-client';
import { AllService } from './clients/sempv2';
import { APIDomainsResponseItem } from './model/apis';
import { EventPortalFacade } from './eventportalfacade';

OpenAPI.TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmciOiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18YcuNk4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnxbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRQe0-3svIPw';

// var result: Promise<any> = ApplicationDomainsService.list(100, 1);
// var apiList: APIDomainsResponseItem[] = [];

// result.then((value: ApplicationDomainsResponse) => {
// 	value.data.forEach((appDomain) => {
// 		//console.log(appDomain.name);
// 		var apiPromises: Promise<any>[] = [];
// 		appDomain.applicationIds.forEach((applicationId) => {
// 			console.log("in loop " + appDomain.name);
// 			apiPromises.push(ApplicationsService.get1(applicationId));

// 			Promise.all(apiPromises).then((apiResponses: ApplicationResponse[]) => {
// 				apiResponses.forEach((apiResponse: ApplicationResponse) => { apiList.push(new APIDomainsResponseItem(apiResponse.data.name, appDomain.name)); });
// 				console.log("******************************");
// 				console.log(apiList);

// 			});

// 		});
// 	});
// });
var eventPortalFacade = new EventPortalFacade();
//var l: Promise<APIDomainsResponseItem[]> = eventPortalFacade.getApis();
//l.then((val)=>{console.log(val)}); 

var apis: Promise<any> = ApplicationsService.list2(100, 1, 'My Application', 'roegjk48bm1');
apis.then((value: ApplicationsResponse) => {
	value.data.forEach((app) => { console.log("app: " + app.name); });

});

var sempv2Client = new Sempv2Client("https://mrroej09bghi1.messaging.solace.cloud:943/SEMP/v2/config", "boomi-webinar-admin", "s8he7f32s797oiathu3qatqq0b");

var about: Promise<any> = AllService.getAboutApi();
about.then((value) => { console.log(value); });
