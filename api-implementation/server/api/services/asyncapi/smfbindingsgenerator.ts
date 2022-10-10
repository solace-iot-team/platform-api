import L from '../../../common/logger';
import { BindingsGenerator } from './bindingsgenerator';
import QueueHelper from '../broker/queuehelper';
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;
import ApiProductTypeOperations from '../../../../src/apiproductstypehelper';
import OperationSchema = AsyncapiCom.Bindings.Solace.OperationJson;
import aclmanager from '../broker/aclmanager';
const DESTINATION_TYPE_TOPIC = 'topic';
const DESTINATION_TYPE_QUEUE = 'queue';
const DELIVERY_MODE_DIRECT = 'direct';
const DELIVERY_MODE_PERSISTENT = 'persistent';

export class SMFBindingsGenerator implements BindingsGenerator {
  PROTOCOL_BINDING = 'solace';
  APPLICABLE_PROTOCOLS = ['smf', 'smfs', 'jms', 'secure-jms'];
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
      await this.processChannel(apiName, channelName, channel, app, apiProduct);
    }
  }

  async processChannel(apiName: string, channelName: string, channel: any, app: App, apiProduct: APIProduct): Promise<void> {
    L.debug(`processChannel ${JSON.stringify(channel)}`);
    if (channel.subscribe) {
      const publisherBindings: any = channel.subscribe.bindings?channel.subscribe.bindings:{};
      channel.subscribe.bindings = publisherBindings;
      const smfBinding: OperationSchema = {
        destinations: [{}],
      };
      smfBinding.destinations[0].destinationType = DESTINATION_TYPE_TOPIC;
      if (ApiProductTypeOperations.isGuaranteedMessagingEnabled(apiProduct)) {
        smfBinding.destinations[0].deliveryMode = DELIVERY_MODE_PERSISTENT;
      } else {
        smfBinding.destinations[0].deliveryMode = DELIVERY_MODE_DIRECT;
      }
      (smfBinding.destinations[0] as any).topicSubscriptions = aclmanager.getTopicSubscriptionsForChannelName(channelName, app, [apiProduct], 'smf');
      
      publisherBindings[this.PROTOCOL_BINDING] = smfBinding;
    }
    if (channel.publish) {
      const bindings: any = channel.publish.bindings?channel.publish.bindings:{};
      channel.publish.bindings = bindings;
      const smfBinding: OperationSchema = {
        destinations: [{}],
      };
      if (QueueHelper.isAPIProductQueueRequired(apiProduct) || QueueHelper.isAPIQueueRequired(apiProduct)) {
        smfBinding.destinations[0].destinationType = DESTINATION_TYPE_QUEUE;
        const queue: any = {};
        queue.name = QueueHelper.isAPIProductQueueRequired(apiProduct)?QueueHelper.getAPIQueueName(app, apiProduct):QueueHelper.getAPIQueueName(app, apiProduct, apiName);
        queue.accessType = apiProduct.clientOptions.guaranteedMessaging.accessType;
        (smfBinding.destinations[0] as any).queue = queue;
        
      } else {
        smfBinding.destinations[0].destinationType = DESTINATION_TYPE_TOPIC;
      }
      (smfBinding.destinations[0] as any).topicSubscriptions = aclmanager.getTopicSubscriptionsForChannelName(channelName, app, [apiProduct], 'smf');;
      bindings[this.PROTOCOL_BINDING] = smfBinding;
    }

  }
}
export default new SMFBindingsGenerator();