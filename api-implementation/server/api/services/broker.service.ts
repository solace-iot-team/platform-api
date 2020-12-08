import L from '../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import ApiProductsService from './apiProducts.service';
import EnvironmentsService from './environments.service';
import { Service } from "../../../src/clients/solacecloud"
import { AllService, MsgVpnClientUsername, MsgVpnClientUsernameResponse, MsgVpnAclProfile, MsgVpnAclProfileResponse, MsgVpnAclProfilePublishException, MsgVpnAclProfilePublishExceptionResponse, MsgVpnAclProfileSubscribeExceptionResponse, MsgVpnAclProfileSubscribeException } from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import EventPortalFacade from '../../../src/eventportalfacade';
import { Sempv2Client } from '../../../src/sempv2-client';

enum Direction {
	Publish = "Publish",
	Subscribe = "Subscribe"
}
class BrokerService {

	provisionApp(app: App) {
		var environmentNames: string[] = [];

		var apiProductPromises: Promise<APIProduct>[] = [];
		app.apiProducts.forEach((productName: string) => {
			L.info(productName);
			apiProductPromises.push(ApiProductsService.byName(productName));
		});
		Promise.all(apiProductPromises).then((products: APIProduct[]) => {
			products.forEach((product: APIProduct) => {
				product.environments.forEach((e: string) => {
					environmentNames.push(e);
				})
				L.info(`env: ${product.environments}`);
			});
			environmentNames = Array.from(new Set(environmentNames));
			this.getServices(environmentNames).then((services: Service[]) => this.createACLs(app, services)
				.then((values) => this.createClientUsernames(app, services))
				.then((values) => this.createClientACLExceptions(app, services, products)))
				.catch((e) => { L.error(e) });
		}).catch((e) => {
			L.error(e);
		});
	}
	deprovisionApp() {

	}

	private getServices(environmentNames: string[]): Promise<Service[]> {
		return new Promise<Service[]>((resolve, reject) => {
			L.info(`all-env: ${environmentNames}`);
			var returnServices: Service[] = [];
			var servicePromises: Promise<Service>[] = [];
			var environmentPromises: Promise<Environment>[] = [];
			environmentNames.forEach((envName: string) => {
				L.info(envName);
				var ep = EnvironmentsService.byName(envName);
				environmentPromises.push(ep);
				ep.then((env: Environment) => {
					L.info(env.serviceId);
					var r = SolaceCloudFacade.getServiceByEnvironment(env);
					servicePromises.push(r);
					r.then((service: Service) => {
						returnServices.push(service);
					}).catch((e) => {
						L.error(e);
						reject(e)
					});

				}).catch((e) => {
					L.error(e);
					reject(e)
				});
			});
			Promise.all(environmentPromises).then((proms) => {
				Promise.all(servicePromises).then((p) => {
					L.info("return services resolve")
					resolve(returnServices);
				}).catch((e) => {
					L.error(e);
					reject(e)
				})

			});

		});

	}

	private createACLs(app: App, services: Service[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			var aclUsernameResponses: Promise<MsgVpnAclProfileResponse>[] = [];
			services.forEach((service: Service) => {
				var sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
				L.info();
				L.info(sempProtocol.username);
				L.info(sempProtocol.password);
				var sempv2Client = new Sempv2Client(sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
					sempProtocol.username,
					sempProtocol.password);
				var aclProfile: MsgVpnAclProfile = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientConnectDefaultAction: MsgVpnAclProfile.clientConnectDefaultAction.ALLOW,
					publishTopicDefaultAction: MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW,
					subscribeTopicDefaultAction: MsgVpnAclProfile.subscribeTopicDefaultAction.DISALLOW,
					msgVpnName: service.msgVpnName

				};

				var response = AllService.createMsgVpnAclProfile(service.msgVpnName, aclProfile);
				aclUsernameResponses.push(response);
			});
			Promise.all(aclUsernameResponses).then((responses) => resolve()).catch((e) => reject(e));
		});
	}

	private createClientUsernames(app: App, services: Service[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			var clientUsernameResponses: Promise<MsgVpnClientUsernameResponse>[] = [];
			services.forEach((service: Service) => {
				var sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
				L.info();
				L.info(sempProtocol.username);
				L.info(sempProtocol.password);
				var sempv2Client = new Sempv2Client(sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
					sempProtocol.username,
					sempProtocol.password);
				var clientUsername: MsgVpnClientUsername = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientUsername: app.credentials.secret.consumerKey,
					password: app.credentials.secret.consumerSecret,
					clientProfileName: "default",
					msgVpnName: service.msgVpnName,
					enabled: true

				};
				var response = AllService.createMsgVpnClientUsername(service.msgVpnName, clientUsername);
				clientUsernameResponses.push(response);
			});
			Promise.all(clientUsernameResponses).then((responses) => resolve()).catch((e) => reject(e));
		});
	}

	private createClientACLExceptions(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
		return new Promise<any>((resolve, reject) => {
			L.info(` services: ${services}`);
			var publishExceptions: string[] = [];
			var subscribeExceptions: string[] = [];
			// compile list of event destinations sub / pub separately
			var asyncAPIPromisesSubscribe: Promise<string[]>[] = [];
			var asyncAPIPromisesPublish: Promise<string[]>[] = [];
			apiProducts.forEach((product: APIProduct) => {
				publishExceptions = this.getResources(product.pubResources).concat(publishExceptions);
				subscribeExceptions = this.getResources(product.subResources).concat(subscribeExceptions);
				asyncAPIPromisesSubscribe.push(this.getResourcesFromAsyncAPIs(product.apis, Direction.Subscribe));
				asyncAPIPromisesPublish.push(this.getResourcesFromAsyncAPIs(product.apis, Direction.Publish));
			});
			Promise.all(asyncAPIPromisesSubscribe).then((values) => {
				values.forEach((value) => {
					subscribeExceptions = subscribeExceptions.concat(value);
				});
			}).then((s) => Promise.all(asyncAPIPromisesPublish).then((values) => {
				values.forEach((value) => {
					publishExceptions = publishExceptions.concat(value);
				})
			}
			).then((values) => {
				publishExceptions = Array.from(new Set(publishExceptions));
				subscribeExceptions = Array.from(new Set(subscribeExceptions));
			})).then((values) => {
				this.addPublishTopicExceptions(app, services, publishExceptions).then(
					(p)=> this.addSubscribeTopicExceptions(app, services, subscribeExceptions).then((p)=>resolve())
				).catch((e)=> reject(e));
			});

		});
	}

	private addPublishTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			var promises: Promise<MsgVpnAclProfilePublishExceptionResponse>[] = [];
			services.forEach((service: Service) => {
				exceptions.forEach((exception: string) => {
					var aclException: MsgVpnAclProfilePublishException = {
						aclProfileName: app.credentials.secret.consumerKey,
						msgVpnName: service.msgVpnName,
						publishExceptionTopic: exception,
						topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
					};
					L.info(aclException);
					var p = AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
					promises.push(p);
				})

			});
			Promise.all(promises).then((p)=> resolve()).catch((e)=> reject(e));
		});

	}
	private addSubscribeTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			var promises: Promise<MsgVpnAclProfileSubscribeExceptionResponse>[] = [];
			services.forEach((service: Service) => {
				exceptions.forEach((exception: string) => {
					var aclException: MsgVpnAclProfileSubscribeException = {
						aclProfileName: app.credentials.secret.consumerKey,
						msgVpnName: service.msgVpnName,
						subscribeExceptionTopic: exception,
						topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
					};
					var p = AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
					promises.push(p);
				})

			});
			Promise.all(promises).then((p)=> resolve()).catch((e)=> reject(e));
		});

	}

	private getResourcesFromAsyncAPIs(apis: string[], direction: Direction): Promise<string[]> {
		return new Promise<string[]>(
			(resolve, reject) => {
				var apiPromises: Promise<string>[] = [];
				apis.forEach((api: string) => {
					apiPromises.push(EventPortalFacade.getApiSpec(api));
				});
				Promise.all(apiPromises).then((specs) => {
					var resources: string[] = [];
					specs.forEach((spec) => {
						const chnlsMap = new Map(Object.entries(spec["channels"]));
						chnlsMap.forEach((chnlObj, chnlName) => {
							if (direction == Direction.Subscribe && chnlObj["subscribe"]) {
								resources.push(this.scrubDestination(chnlName));
							}
							if (direction == Direction.Publish && chnlObj["publish"]) {
								resources.push(this.scrubDestination(chnlName));
							}
						});

					});
					resolve(resources);
				});
			}
		);
	}
	private getResources(resources: string[]): string[] {
		var returnResources: string[] = [];
		resources.forEach((resource: string) => returnResources.push(this.scrubDestination(resource)))
		L.info(returnResources);
		return returnResources;
	}

	private scrubDestination(destination: string) {
		return destination.replace(/\{[^\/]*\}(?!$)/g, "*").replace(/\{[^\/]*\}$/, ">");
	}


}
export default new BrokerService();