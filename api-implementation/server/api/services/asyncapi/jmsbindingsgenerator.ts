import L from '../../../common/logger';
import { BindingsGenerator } from './bindingsgenerator';
import QueueHelper from '../broker/queuehelper';
import APIProduct = Components.Schemas.APIProduct;
import ApiProductTypeOperations from '../../../../src/apiproductstypehelper';

import App = Components.Schemas.App;

const DESTINATION_TYPE_TOPIC = 'topic';
const DESTINATION_TYPE_QUEUE = 'queue';
const DELIVERY_MODE_DIRECT = 'direct';
const DELIVERY_MODE_PERSISTENT = 'persistent';


export class JMSBindingsGenerator implements BindingsGenerator {
  PROTOCOL_BINDING = 'jms';
  APPLICABLE_PROTOCOLS = ['jms', 'secure-jms'];
  getBindingProtocol(): string {
    return this.PROTOCOL_BINDING;
  }
  getApplicableProtocols(): string[] {
    return this.APPLICABLE_PROTOCOLS;
  }

  async processChannels(apiName: string, channels: any, app: App, apiProduct: APIProduct): Promise<void> {
    const channelNames: string[] = Object.keys(channels);
    for (const channelName of channelNames) {
      const channel = channels[channelName];
      await this.processChannel(apiName, channel, app, apiProduct);
    }
  }

  async processChannel(apiName: string, channel: any, app: App, apiProduct: APIProduct): Promise<void> {
    L.debug(`processChannel ${JSON.stringify(channel)}`);
    if (channel.subscribe) {
      let publisherBindings: any = channel.subscribe.bindings;
      if (!publisherBindings) {
        publisherBindings = {};
        channel.subscribe.bindings = publisherBindings;
      }
      const smfBinding: any = {};
      smfBinding.destinationType = DESTINATION_TYPE_TOPIC;
      if (ApiProductTypeOperations.isGuaranteedMessagingEnabled(apiProduct)) {
        smfBinding.deliveryMode = DELIVERY_MODE_PERSISTENT;
      } else {
        smfBinding.deliveryMode = DELIVERY_MODE_DIRECT;
      }
      publisherBindings[this.PROTOCOL_BINDING] = smfBinding;
    }
    if (channel.publish) {
      let bindings: any = channel.publish.bindings;
      if (!bindings) {
        bindings = {};
        channel.publish.bindings = bindings;
      }
      const smfBinding: any = {};
      if (QueueHelper.isAPIProductQueueRequired(apiProduct)) {
        smfBinding.destinationType = DESTINATION_TYPE_QUEUE;
        const queue: any = {};
        queue.name = QueueHelper.isAPIProductQueueRequired(apiProduct)?QueueHelper.getAPIQueueName(app, apiProduct):QueueHelper.getAPIQueueName(app, apiProduct, apiName);
        queue.accessType = apiProduct.clientOptions.guaranteedMessaging.accessType;
        smfBinding.queue = queue;
      } else {
        smfBinding.destinationType = DESTINATION_TYPE_TOPIC;
      }
      bindings[this.PROTOCOL_BINDING] = smfBinding;
    }

  }
}
export default new JMSBindingsGenerator();