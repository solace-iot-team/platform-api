import ApiProductsService from '../apiProducts.service';
import ApisService from '../apis.service';
import BrokerService from '../broker.service';
import { AsyncAPIServer } from '../../../../src/model/asyncapiserver';
import AsyncAPIHelper from '../../../../src/asyncapihelper';
import App = Components.Schemas.App;
import Protocol = Components.Schemas.Protocol;


class AsyncApiGenerator {
  public async getSpecificationByApp(apiName: string, app: App): Promise<string> {
    const envs = await BrokerService.getMessagingProtocols(app);
    const servers = {};
    for (const env of envs) {
      for (const protocol of env.messagingProtocols) {
        const server: AsyncAPIServer = {
          protocol: protocol.protocol.name,
          protocolVersion: protocol.protocol.version,
          url: protocol.uri,
        };
        let serverKey: string = env.name;
        if (env.messagingProtocols.length > 1) {
          serverKey = `${env.name}-${protocol.protocol.name}`;
        }
        if (protocol.protocol.name.toUpperCase().startsWith('HTTP')) {
          server.security = [{ httpBasic: [] }];
        } else {
          server.security = [{ userPassword: [] }];
        }
        servers[serverKey] = server;
      }
    }
    const spec = await ApisService.byName(apiName);
    // parse the spec - try to treat as JSON, if fails treat as YAML
    let specModel = null;
    try {
      specModel = JSON.parse(spec);
    } catch (e) {
      specModel = JSON.parse(AsyncAPIHelper.YAMLtoJSON(spec));
    }
    specModel.servers = servers;
    // add the username password security scheme
    specModel.components.securitySchemes = {};
    specModel.components.securitySchemes.userPassword = {
      type: 'userPassword',
      description: 'Username Password',
    };
    specModel.components.securitySchemes.httpBasic = {
      type: 'http',
      description: 'HTTP Basic',
      scheme: 'basic',
    };
    return JSON.stringify(specModel);

  }

  //TODO
  getSpecificationByAPIProduct() {

  }
}

export default new AsyncApiGenerator();