import L from '../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';

import EnvironmentsService from './environments.service';
import { Service } from "../../../src/clients/solacecloud"
import { AllService, MsgVpnClientUsername, MsgVpnClientUsernameResponse, MsgVpnAclProfile, MsgVpnAclProfileResponse, MsgVpnAclProfilePublishException, MsgVpnAclProfilePublishExceptionResponse, MsgVpnAclProfileSubscribeExceptionResponse, MsgVpnAclProfileSubscribeException } from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Sempv2Client } from '../../../src/sempv2-client';

import parser from '@asyncapi/parser';

enum Direction {
	Publish = "Publish",
	Subscribe = "Subscribe"
}
class BrokerService {

	async provisionApp(app: App) {
		var environmentNames: string[] = [];

		var apiProductPromises: Promise<APIProduct>[] = [];
		app.apiProducts.forEach((productName: string) => {
			L.info(productName);
			apiProductPromises.push(ApiProductsService.byName(productName));
		});

		Promise.all(apiProductPromises).then(async (products: APIProduct[]) => {
			products.forEach((product: APIProduct) => {
				product.environments.forEach((e: string) => {
					environmentNames.push(e);
				})
				L.info(`env: ${product.environments}`);
			});
			environmentNames = Array.from(new Set(environmentNames));

			try {
				const services = await this.getServices(environmentNames);
				var a = await this.createACLs(app, services);
				L.info(`created acl profile ${app.name}`);
				var b = await this.createClientUsernames(app, services);
				L.info(`created client username ${app.name}`);
				var c = await this.createClientACLExceptions(app, services, products);
			} catch {
				L.error("Provisioninig error");
			}
		});
	}

	async deprovisionApp(app: App) {
		var environmentNames: string[] = [];

		var apiProductPromises: Promise<APIProduct>[] = [];
		app.apiProducts.forEach((productName: string) => {
			L.info(productName);
			apiProductPromises.push(ApiProductsService.byName(productName));
		});

		Promise.all(apiProductPromises).then(async (products: APIProduct[]) => {
			products.forEach((product: APIProduct) => {
				product.environments.forEach((e: string) => {
					environmentNames.push(e);
				})
				L.info(`env: ${product.environments}`);
			});
			environmentNames = Array.from(new Set(environmentNames));

			try {
				const services = await this.getServices(environmentNames);
				var b = await this.deleteClientUsernames(app, services);
				var a = await this.deleteACLs(app, services);
			} catch {
				L.error("De-Provisioninig error");
			}
		});

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

	private createACLs(app: App, services: Service[]) {
		return new Promise<any>(async (resolve, reject) => {
			var allACLResponses: Promise<MsgVpnAclProfileResponse>[] = [];
			for (var service of services) {

				var sempv2Client = this.getSEMPv2Client(service);
				var aclProfile: MsgVpnAclProfile = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientConnectDefaultAction: MsgVpnAclProfile.clientConnectDefaultAction.ALLOW,
					publishTopicDefaultAction: MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW,
					subscribeTopicDefaultAction: MsgVpnAclProfile.subscribeTopicDefaultAction.DISALLOW,
					msgVpnName: service.msgVpnName

				};
				try {
					var getResponse = await AllService.getMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
					L.info("ACL Looked up");
					var responseUpd = await AllService.updateMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey, aclProfile);
					L.info("ACL updated");
				} catch (e) {

					try {
						let response = await AllService.createMsgVpnAclProfile(service.msgVpnName, aclProfile);
						L.info("created  ACL");
					} catch (e) {
						reject(e);
					}
				}
			};
			resolve();
		});
	}

	private deleteACLs(app: App, services: Service[]) {
		return new Promise<any>(async (resolve, reject) => {
			var allACLResponses: Promise<MsgVpnAclProfileResponse>[] = [];
			for (var service of services) {

				var sempv2Client = this.getSEMPv2Client(service);
				var aclProfile: MsgVpnAclProfile = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientConnectDefaultAction: MsgVpnAclProfile.clientConnectDefaultAction.ALLOW,
					publishTopicDefaultAction: MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW,
					subscribeTopicDefaultAction: MsgVpnAclProfile.subscribeTopicDefaultAction.DISALLOW,
					msgVpnName: service.msgVpnName

				};
				try {
					var getResponse = await AllService.deleteMsgVpnAclProfile(service.msgVpnName, app.credentials.secret.consumerKey);
					L.info("ACL Looked up");
				} catch (e) {

					reject(e);
				}
			};
			resolve();
		});
	}

	private createClientUsernames(app: App, services: Service[]): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			for (var service of services) {
				var sempV2Client = this.getSEMPv2Client(service);
				var clientUsername: MsgVpnClientUsername = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientUsername: app.credentials.secret.consumerKey,
					password: app.credentials.secret.consumerSecret,
					clientProfileName: "default",
					msgVpnName: service.msgVpnName,
					enabled: true

				};
				try {
					var getResponse = await AllService.getMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
					L.info("Client Username Looked up");
					var responseUpd = await AllService.updateMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey, clientUsername);
					L.info("Client Username updated");
				} catch (e) {

					try {
						let response = await AllService.createMsgVpnClientUsername(service.msgVpnName, clientUsername);
						L.info("created  Client Username");
					} catch (e) {
						reject(e);
					}
				}
			}
			resolve();
		});
	}

	private deleteClientUsernames(app: App, services: Service[]): Promise<any> {
		return new Promise<any>(async (resolve, reject) => {
			for (var service of services) {
				var sempV2Client = this.getSEMPv2Client(service);
				var clientUsername: MsgVpnClientUsername = {
					aclProfileName: app.credentials.secret.consumerKey,
					clientUsername: app.credentials.secret.consumerKey,
					password: app.credentials.secret.consumerSecret,
					clientProfileName: "default",
					msgVpnName: service.msgVpnName,
					enabled: true

				};
				try {
					var getResponse = await AllService.deleteMsgVpnClientUsername(service.msgVpnName, app.credentials.secret.consumerKey);
				} catch (e) {
					reject(e);
				}
			}
			resolve();
		});
	}
	private createClientACLExceptions(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
		return new Promise<any>(async (resolve, reject) => {
			L.info(` services: ${services}`);
			var publishExceptions: string[] = [];
			var subscribeExceptions: string[] = [];
			// compile list of event destinations sub / pub separately
			for (var product of apiProducts) {
				publishExceptions = this.getResources(product.pubResources).concat(publishExceptions);
				subscribeExceptions = this.getResources(product.subResources).concat(subscribeExceptions);
				var strs: string[] = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Subscribe);
				for (var s of strs) {
					subscribeExceptions.push(s);
				}
				strs = await this.getResourcesFromAsyncAPIs(product.apis, Direction.Publish);
				for (var s of strs) {
					publishExceptions.push(s);
				}
			}
			L.info(publishExceptions);
			L.info(subscribeExceptions);
			try {
				var q = await this.addPublishTopicExceptions(app, services, publishExceptions);
			} catch { }
			var r = await this.addSubscribeTopicExceptions(app, services, subscribeExceptions);
		});
	}

	private addPublishTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			for (var service of services) {
				var sempV2Client = this.getSEMPv2Client(service);
				for (var exception of exceptions) {
					var aclException: MsgVpnAclProfilePublishException = {
						aclProfileName: app.credentials.secret.consumerKey,
						msgVpnName: service.msgVpnName,
						publishExceptionTopic: exception,
						topicSyntax: MsgVpnAclProfilePublishException.topicSyntax.SMF
					};
					L.info("createMsgVpnAclProfilePublishException");
					L.info(aclException);
					try {
						var getResponse = await AllService.getMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfilePublishException.topicSyntax.SMF, exception);
						L.info("ACL Looked up");
					} catch (e) {

						try {
							let response = await AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
							L.info("created  PublishException");
						} catch (e) {
							reject(e);
						}
					}
				}

			}
			resolve();
		});

	}
	private addSubscribeTopicExceptions(app: App, services: Service[], exceptions: string[]): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			for (var service of services) {
				var sempV2Client = this.getSEMPv2Client(service);
				for (var exception of exceptions) {
					var aclException: MsgVpnAclProfileSubscribeException = {
						aclProfileName: app.credentials.secret.consumerKey,
						msgVpnName: service.msgVpnName,
						subscribeExceptionTopic: exception,
						topicSyntax: MsgVpnAclProfileSubscribeException.topicSyntax.SMF
					};
					L.info("createMsgVpnAclProfileSubscribeException");
					L.info(aclException);
					try {
						var getResponse = await AllService.getMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, exception);
						L.info("ACL Looked up");
					} catch {

						try {
							let response = await AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
							L.info("created  SubscribeException");
						} catch (e) {
							reject(e);
						}
					}
				}

			}
			resolve();
		});

	}

	private getResourcesFromAsyncAPIs(apis: string[], direction: Direction): Promise<string[]> {
		return new Promise<string[]>(
			(resolve, reject) => {
				var apiPromises: Promise<string>[] = [];
				apis.forEach((api: string) => {
					apiPromises.push(ApisService.byName(api));
				});
				Promise.all(apiPromises).then(async (specs) => {
					var parserPromises: Promise<any>[] = [];
					var resources: string[] = [];
					specs.forEach((specification: string) => {
						var p: Promise<any> = parser.parse(specification);
						parserPromises.push(p);

						p.then(
							(spec) => {
								spec.channelNames().forEach((s: string) => {

									var channel = spec.channel(s);

									if (direction == Direction.Subscribe && channel.hasSubscribe()) {
										L.info(`Subscribe ${s}`)
										resources.push(this.scrubDestination(s));
									}
									if (direction == Direction.Publish && channel.hasPublish()) {
										L.info(`Publish ${s}`)
										resources.push(this.scrubDestination(s));
									}
								});
							}
						).catch((e) => {
							L.error(e);
							reject(e);
						});
					});
					Promise.all(parserPromises).then((vals) => {
						resolve(resources);
					});


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

	private getSEMPv2Client(service: Service): Sempv2Client {
		var sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
		var sempv2Client = new Sempv2Client(sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
			sempProtocol.username,
			sempProtocol.password);
		return sempv2Client;
	}


}
export default new BrokerService();