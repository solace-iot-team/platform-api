import L from '../../../common/logger';
import { BindingsGenerator } from './bindingsgenerator';
import QueueHelper from '../broker/queuehelper';
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;

const DESTINATION_TYPE_TOPIC = 'topic';
const DESTINATION_TYPE_QUEUE = 'queue';
const DELIVERY_MODE_DIRECT = 'direct';
const DELIVERY_MODE_PERSISTENT = 'persistent';
const SMF_BINDING_VERSION = '0.1.0';

export class SMFBindingsGenerator implements BindingsGenerator {
  PROTOCOL_BINDING = 'solace';
  APPLICABLE_PROTOCOLS = ['smf', 'smfs'];
  getBindingProtocol(): string {
    return this.PROTOCOL_BINDING;
  }
  getApplicableProtocols(): string[] {
    return this.APPLICABLE_PROTOCOLS;
  }

  async processChannels(channels: any, app: App, apiProduct: APIProduct): Promise<void> {
    const channelNames: string[] = Object.keys(channels);
    for (const channelName of channelNames) {
      const channel = channels[channelName];
      await this.processChannel(channel, app, apiProduct);
    }
  }

  async processChannel(channel: any, app: App, apiProduct: APIProduct): Promise<void> {
    L.debug(`processChannel ${JSON.stringify(channel)}`);
    if (channel.subscribe) {
      let publisherBindings: any = channel.subscribe.bindings;
      if (!publisherBindings) {
        publisherBindings = {};
        channel.subscribe.bindings = publisherBindings;
      }
      const smfBindings: any[] = [];
      const smfBinding: any = {};
      smfBinding.destinationType = DESTINATION_TYPE_TOPIC;
      if (apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging) {
        smfBinding.deliveryMode = DELIVERY_MODE_PERSISTENT;
      } else {
        smfBinding.deliveryMode = DELIVERY_MODE_DIRECT;
      }
      smfBindings.push(smfBinding);
      publisherBindings[this.PROTOCOL_BINDING] = {
        bindingVersion: SMF_BINDING_VERSION,
        destinations: smfBindings
      };
    }
    if (channel.publish) {
      let bindings: any = channel.publish.bindings;
      if (!bindings) {
        bindings = {};
        channel.publish.bindings = bindings;
      }
      const smfBindings: any[] = [];
      const smfBinding: any = {};
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        smfBinding.destinationType = DESTINATION_TYPE_QUEUE;
        const queue: any = {};
        queue.name = QueueHelper.getAPIProductQueueName(app, apiProduct);
        queue.accessType = apiProduct.clientOptions.guaranteedMessaging.accessType;
        smfBinding.queue = queue;
      } else {
        smfBinding.destinationType = DESTINATION_TYPE_TOPIC;
      }
      smfBindings.push(smfBinding);
      bindings[this.PROTOCOL_BINDING] = {
        bindingVersion: SMF_BINDING_VERSION,
        destinations: smfBindings
      };
    }

  }
}
export default new SMFBindingsGenerator();