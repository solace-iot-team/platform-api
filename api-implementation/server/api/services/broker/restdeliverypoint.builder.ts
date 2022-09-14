import L from '../../../common/logger';

import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import WebHook = Components.Schemas.WebHook;
import ACLManager from './aclmanager';
import QueueManager from './queuemanager';
import { Service } from '../../../../src/clients/solacecloud/models/Service';
import MsgVpnRestDeliveryPoint = Components.Schemas.MsgVpnRestDeliveryPoint;
import MsgVpnRestDeliveryPointRestConsumer = Components.Schemas.MsgVpnRestDeliveryPointRestConsumer;
import MsgVpnRestDeliveryPointQueueBinding = Components.Schemas.MsgVpnRestDeliveryPointQueueBinding;
import MsgVpnRestDeliveryPointQueueBindingHeader = Components.Schemas.MsgVpnRestDeliveryPointQueueBindingHeader;
import MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName = Components.Schemas.MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName;
import MsgVpnRestDeliveryPointRestConsumerAuthenticationSchema = Components.Schemas.MsgVpnRestDeliveryPointRestConsumerAuthenticationScheme;
import MsgVpnRestDeliveryPointRestConsumerHttpMethod = Components.Schemas.MsgVpnRestDeliveryPointRestConsumerHttpMethod;
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { GuaranteedMessagingReceiveSendProfile } from './clientprofilemanager';

export class RestdDeliveryPointBuilder {
    public async build(app: App, services: Service[], apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnRestDeliveryPoint[]> {
        const rdps: MsgVpnRestDeliveryPoint[] = [];
        if (!app.webHooks) {
          return rdps;
        }
        const subscribeExceptions: string[] = [];
        let useTls: boolean = false;
        for (const product of apiProducts) {
          const strs: string[] = await ACLManager.getSubscriptionsFromAsyncAPIs(product.apis);
          for (const s of strs) {
            subscribeExceptions.push(s);
          }
        }
        if (subscribeExceptions.length < 1) {
          return;
        }
        const objectName: string = app.internalName;
        // loop over services
        for (const service of services) {
          L.info(`createRDP for service: ${service.serviceId}`);
          const restConsumerName = `Consumer`;
          let rdpUrl: URL;
          let webHooks: WebHook[] = [];
          webHooks = app.webHooks.filter(w => w.environments == null || w.environments.find(e => e == service['environment']));
          if (webHooks.length > 1) {
            const msg: string = `Invalid webhook configuration for ${service['environment']}, found ${webHooks.length} matching configurations`;
            L.warn(msg);
            throw new ErrorResponseInternal(400, msg);
          } else if (webHooks.length == 0) {
            L.info(`no webhook to provision for service ${service.name} (${service['environment']})`);
          } else {
            let webHook = webHooks[0];
            L.info(`createRDP provisioning to service: ${service.serviceId}`);
            try {
              L.debug(`webhook.uri ${webHook.uri}`);
              rdpUrl = new URL(webHook.uri);
            } catch (e) {
              L.error(e);
              throw new ErrorResponseInternal(400, `webhook URL not provided or invalid ${JSON.stringify(webHook)}`);
            }
            L.info(`webhook ${webHook.uri} provision for service ${service.name} (${service['environment']})`);
    
            const protocol = rdpUrl.protocol.toUpperCase();
            let port = rdpUrl.port;
            if (protocol == "HTTPS:") {
              useTls = true;
            }
            L.debug(`protocol is ${protocol}`);
            if (port == "") {
              if (useTls) {
                port = '443';
              } else {
                port = '80';
              }
            }
            let authScheme: MsgVpnRestDeliveryPointRestConsumerAuthenticationSchema = webHook.authentication && webHook.authentication['username'] ? 'http-basic' : 'none';
            authScheme = webHook.authentication && webHook.authentication['headerName'] ? 'http-header' : authScheme;
            const method: MsgVpnRestDeliveryPointRestConsumerHttpMethod = webHook.method == 'PUT' ? 'put' : 'post';
    
            let connectionCount: number = 3;
            if (webHook.mode == 'serial') {
              connectionCount = 1;
            }
    
            const newRDPConsumer: MsgVpnRestDeliveryPointRestConsumer = {
              restConsumerName: restConsumerName,
              remotePort: parseInt(port),
              remoteHost: rdpUrl.hostname,
              tlsEnabled: useTls,
              enabled: true,
              authenticationScheme: authScheme,
              httpMethod: method,
              maxPostWaitTime: 90,
              outgoingConnectionCount: connectionCount,
              retryDelay: 10
            };
            if (authScheme == 'http-basic') {
              newRDPConsumer.authenticationHttpBasicUsername = webHook.authentication['username'];
              newRDPConsumer.authenticationHttpBasicPassword = webHook.authentication['password'];
            }
            if (authScheme == 'http-header') {
              newRDPConsumer.authenticationHttpHeaderName = webHook.authentication['headerName'];
              newRDPConsumer.authenticationHttpHeaderValue = webHook.authentication['headerValue'];
            }
            const headers: MsgVpnRestDeliveryPointQueueBindingHeader[] = [];
            if (webHook.requestHeaders){
              for (const header of webHook.requestHeaders){
                const newQueueBindingHeader: MsgVpnRestDeliveryPointQueueBindingHeader  = {
                  headerName: header.headerName,
                  headerValue: header.headerValue
                };
                headers.push(newQueueBindingHeader);
              }
            }
            const newRDPQueueBinding: MsgVpnRestDeliveryPointQueueBinding = {
              postRequestTarget: `${rdpUrl.pathname}${rdpUrl.search}`,
              queueBindingName: objectName,
              requestHeaders: headers
              
            };
    
            // add the trusted common names
            if (webHook.tlsOptions && webHook.tlsOptions.tlsTrustedCommonNames && webHook.tlsOptions.tlsTrustedCommonNames.length > 0) {
    
              newRDPConsumer.trustedCNs = [];
              for (const trustedCN of webHook.tlsOptions.tlsTrustedCommonNames) {
                const msgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName: MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName = {
                  tlsTrustedCommonName: trustedCN,
                };
                newRDPConsumer.trustedCNs.push(msgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName);
              }
            }
    
            const queue = await QueueManager.createWebHookQueue(app, apiProducts, ownerAttributes);
            queue.environments = [service['environment']];
            //create RDPs
            const newRDP: MsgVpnRestDeliveryPoint = {
              restDeliveryPointName: objectName,
              clientProfile: GuaranteedMessagingReceiveSendProfile,
              enabled: true,
              restConsumers: [newRDPConsumer],
              queueBindings: [newRDPQueueBinding],
              environments: [service['environment']],
              queues: [queue]
            };
            // only provision webhook if there is a queue with subscriptions
            if (queue) {
              rdps.push(newRDP);
            }
          }
        }
        return rdps;
      }
}

export default new RestdDeliveryPointBuilder();