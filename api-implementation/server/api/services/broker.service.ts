import L from '../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Environment = Components.Schemas.Environment;
import Permissions = Components.Schemas.Permissions;
import Endpoint = Components.Schemas.Endpoint;
import Protocol = Components.Schemas.Protocol;

import ApiProductsService from './apiProducts.service';
import ApisService from './apis.service';

import EnvironmentsService from './environments.service';
import { Service } from "../../../src/clients/solacecloud"
import { ApiError, AllService, MsgVpnClientUsername, MsgVpnClientUsernameResponse, MsgVpnAclProfile, MsgVpnAclProfileResponse, MsgVpnAclProfilePublishException, MsgVpnAclProfilePublishExceptionResponse, MsgVpnAclProfileSubscribeExceptionResponse, MsgVpnAclProfileSubscribeException, MsgVpnQueue } from '../../../src/clients/sempv2';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Sempv2Client } from '../../../src/sempv2-client';

import parser from '@asyncapi/parser';
import { resolve } from 'path';
import { prototype } from 'module';
import { ErrorResponseInternal } from '../middlewares/error.handler';

enum Direction {
	Publish = "Publish",
	Subscribe = "Subscribe"
}

interface ProtocolMapping {
	name: string,
	protocolKeys: SolaceProtocolIdentifiers
}

interface SolaceProtocolIdentifiers {
	name: string
	protocol: string
}

class BrokerService {


	getPermissions(app: App): Promise<Permissions> {
		return new Promise<Permissions>((resolve, reject) => {
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
					var c: Permissions = await this.getClientACLExceptions(app, products);
					resolve(c);

				} catch (e){
					L.error("Get permissions error");
					reject(new ErrorResponseInternal(500, e));
				}
			});
		});
	}
	provisionApp(app: App): Promise<any> {
		return new Promise<any>((resolve, reject) => {
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
					//var d = await this.createQueues(app, services, products);
					var c = await this.createClientACLExceptions(app, services, products);
					resolve(null);
				} catch (e) {
					L.error(`Provisioning error ${e}`);
					reject(new ErrorResponseInternal(500, e));
				}
			});
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

	private getServiceByEnv(envName: string): Promise<Service> {
		return new Promise<Service>((resolve, reject) => {
			L.info(envName);
			var ep = EnvironmentsService.byName(envName);
			ep.then((env: Environment) => {
				L.info(env.serviceId);
				var r = SolaceCloudFacade.getServiceByEnvironment(env);

				r.then((service: Service) => {
					resolve(service);
				}).catch((e) => {
					L.error(e);
					reject(e)
				});

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
			L.info("******** createClientACLExceptions");
			L.info(publishExceptions);
			L.info(subscribeExceptions);
			L.info("******** createClientACLExceptions");
			try {
				var q = await this.addPublishTopicExceptions(app, services, publishExceptions);
				var r = await this.addSubscribeTopicExceptions(app, services, subscribeExceptions);
				resolve();
			} catch (e) { 

				
				reject(new ErrorResponseInternal(400, e));
			}
		});
	}
	private createQueues(app: App, services: Service[], apiProducts: APIProduct[]): Promise<void> {
		return new Promise<any>(async (resolve, reject) => {
			L.info(`createQueueSubscriptions services: ${services}`);
			var subscribeExceptions: string[] = [];
			// compile list of event destinations sub / pub separately
			for (var product of apiProducts) {
				var strs: string[] = await this.getRDPSubscriptionsFromAsyncAPIs(product.apis);
				for (var s of strs) {
					subscribeExceptions.push(s);
				}
			}
			// loop over services
			for (var service of services) {
				//create queues
				var sempV2Client = this.getSEMPv2Client(service);
				try {
					var q = AllService.getMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey);
					var newQ: MsgVpnQueue = {

					}
					AllService.updateMsgVpnQueue(service.msgVpnName, app.credentials.secret.consumerKey, newQ);
				} catch (e: any) {

				}


			}
			// attach subscriptions
			L.info(subscribeExceptions);
			resolve();
		});
	}

	public getClientACLExceptions(app: App, apiProducts: APIProduct[]): Promise<Permissions> {
		return new Promise<Permissions>(async (resolve, reject) => {

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
			var permissions: Permissions = {
				publish: publishExceptions,
				subscribe: subscribeExceptions
			}
			resolve(permissions);
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
	
						var getResponse = await AllService.getMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfilePublishException.topicSyntax.SMF, encodeURIComponent( exception));
						L.info("ACL Looked up");
					} catch (e) {
						L.info(`addPublishTopicExceptions lookup  failed ${e}`);
						try {
							let response = await AllService.createMsgVpnAclProfilePublishException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
							L.info("created  PublishException");
						} catch (e) {
							L.info(`addPublishTopicExceptions add failed ${e}`);
							reject(e);
						}
					}
				}

			}
			L.info("addPublishTopicExceptions resolved");
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
						var getResponse = await AllService.getMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, MsgVpnAclProfileSubscribeException.topicSyntax.SMF, encodeURIComponent( exception));
						L.info("addSubscribeTopicExceptions: exception exists");
					} catch (e){
						L.info(`addSubscribeTopicExceptions lookup  failed ${JSON.stringify(e)}`);
						try {
							let response = await AllService.createMsgVpnAclProfileSubscribeException(service.msgVpnName, app.credentials.secret.consumerKey, aclException);
							L.info("created  SubscribeException");
						} catch (e) {
							L.info(`addSubscribeTopicExceptions add failed ${e}`);
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
	private getRDPSubscriptionsFromAsyncAPIs(apis: string[]): Promise<string[]> {
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

									if (channel.hasSubscribe() && (channel.subscribe().hasBinding('http') || channel.subscribe().hasBinding('https'))) {
										L.info(`getRDPSubscriptionsFromAsyncAPIs subscribe ${s}`)
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

	public async getMessagingProtocols(app: App): Promise<Endpoint[]> {

		return new Promise<Endpoint[]>((resolve, reject) => {
			var endpoints: Endpoint[] = [];

			var apiProductPromises: Promise<APIProduct>[] = [];
			app.apiProducts.forEach((productName: string) => {
				L.info(productName);
				apiProductPromises.push(ApiProductsService.byName(productName));
			});

			Promise.all(apiProductPromises).then(async (products: APIProduct[]) => {
				for (var product of products) {
					L.info(`getMessagingProtocols ${product.name}`);
					for (var envName of product.environments) {
						const service = await this.getServiceByEnv(envName);
						for (var protocol of product.protocols) {
							L.info(`getMessagingProtocols ${protocol.name}`);
							var keys = this.getProtocolMappings().find(element => element.name == protocol.name).protocolKeys;
							L.info(`getMessagingProtocols ${keys.name} ${keys.protocol}`);
							var endpoint = service.messagingProtocols.find(mp => mp.name == keys.name).endPoints.find(ep => ep.transport == keys.protocol);
							L.info(endpoint);
							var newEndpoint: Endpoint = {
								compressed: endpoint.compressed == 'yes' ? 'yes' : 'no',
								environment: envName,
								secure: endpoint.secured == 'yes' ? 'yes' : 'no',
								protocol: protocol,
								transport: endpoint.transport,
								uri: endpoint.uris[0]
							};
							endpoints.push(newEndpoint);
						}
					}
				}
				resolve(endpoints);

			});

		});

	}

	private getBindingsFromAsyncAPIs(apis: string[]): Promise<string[]> {
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
									var bindingProtocols: string[] = [];
									if (channel.hasSubscribe()) {
										bindingProtocols = bindingProtocols.concat(channel.getSubscribe().bindingProtocols());

									}
									if (channel.hasPublish()) {
										bindingProtocols = bindingProtocols.concat(channel.getPublish().bindingProtocols());
									}
									resources = resources.concat(bindingProtocols);
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

	private getProtocolMappings(): ProtocolMapping[] {
		var map: ProtocolMapping[] = [];
		var mqtt: ProtocolMapping = {
			name: 'mqtt',
			protocolKeys: {
				name: 'MQTT',
				protocol: "TCP"
			}
		};
		map.push(mqtt);

		var mqtts: ProtocolMapping = {
			name: 'secure-mqtt',
			protocolKeys: {
				name: 'MQTT',
				protocol: "SSL"
			}
		};
		map.push(mqtts);

		var amqp: ProtocolMapping = {
			name: 'amqp',
			protocolKeys: {
				name: 'AMQP',
				protocol: "AMQP"
			}
		};
		map.push(amqp);

		var amqps: ProtocolMapping = {
			name: 'amqps',
			protocolKeys: {
				name: 'AMQP',
				protocol: "AMQPS"
			}
		};
		map.push(amqps);

		var http: ProtocolMapping = {
			name: 'http',
			protocolKeys: {
				name: 'REST',
				protocol: "HTTP"
			}
		};
		map.push(http);

		var https: ProtocolMapping = {
			name: 'https',
			protocolKeys: {
				name: 'REST',
				protocol: "HTTPS"
			}
		};
		map.push(https);

		var smf: ProtocolMapping = {
			name: 'smf',
			protocolKeys: {
				name: 'SMF',
				protocol: "TCP"
			}
		};
		map.push(smf);

		var smfs: ProtocolMapping = {
			name: 'https',
			protocolKeys: {
				name: 'SMF',
				protocol: "TLS"
			}
		};
		map.push(smfs);

		var jms: ProtocolMapping = {
			name: 'jms',
			protocolKeys: {
				name: 'JMS',
				protocol: "TCP"
			}
		};
		map.push(jms);
		return map;
	}

}
export default new BrokerService();