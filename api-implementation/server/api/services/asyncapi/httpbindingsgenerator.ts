import L from '../../../common/logger';
import { BindingsGenerator } from './bindingsgenerator';
import QueueHelper from '../broker/queuehelper';
import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;

const BINDING_VERSION = '0.1.0';

export class HTTPBindingsGenerator implements BindingsGenerator {
  PROTOCOL_BINDING = 'http';
  APPLICABLE_PROTOCOLS = ['http', 'https'];
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
      const httpBinding: any = this.buildHTTPOperationBinding();
      publisherBindings[this.PROTOCOL_BINDING] = httpBinding;
    }
    if (channel.publish) {
      let bindings: any = channel.publish.bindings;
      if (!bindings) {
        bindings = {};
        channel.publish.bindings = bindings;
      }
      const httpBinding: any = this.buildHTTPOperationBinding(app);
      bindings[this.PROTOCOL_BINDING] = httpBinding;
    }

  }

  private buildHTTPOperationBinding(app?: App): any {
    const httpBinding: any = {};
    httpBinding.type = 'request';
    httpBinding.method = 'POST';
    if (app && app.webHooks && app.webHooks.length>0) {
      // get the method from the webhooks that are configured
      for (const wh of app.webHooks){
        httpBinding.method = wh.method;
      }
    }
    httpBinding.bindingVersion = BINDING_VERSION;
    return httpBinding;
  }
}
export default new HTTPBindingsGenerator();