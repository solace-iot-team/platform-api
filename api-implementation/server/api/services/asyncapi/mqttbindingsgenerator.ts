import L from '../../../common/logger';
import { BindingsGenerator } from './bindingsgenerator';
import QueueHelper from '../broker/queuehelper';
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;

const QOS_0 = 0;
const QOS_1 = 1;
const BINDING_VERSION = '0.1.0';

export class MQTTBindingsGenerator implements BindingsGenerator {
  PROTOCOL_BINDING = 'mqtt';
  APPLICABLE_PROTOCOLS = ['mqtt', 'secure-mqtt', 'ws-mqtt', 'wss-mqtt'];
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
      const mqttBinding: any = this.buildMQTTOperationBinding(apiProduct);
      publisherBindings[this.PROTOCOL_BINDING] = mqttBinding;
    }
    if (channel.publish) {
      let bindings: any = channel.publish.bindings;
      if (!bindings) {
        bindings = {};
        channel.publish.bindings = bindings;
      }
      const mqttBinding: any = this.buildMQTTOperationBinding(apiProduct);
      bindings[this.PROTOCOL_BINDING] = mqttBinding;
    }

  }

  private buildMQTTOperationBinding(apiProduct: APIProduct): any {
    const mqttBinding: any = {};
    if (apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging) {
      mqttBinding.qos = QOS_1;
    } else {
      mqttBinding.qos = QOS_0;

    }
    mqttBinding.bindingVersion = BINDING_VERSION;
    return mqttBinding;
  }
}
export default new MQTTBindingsGenerator();