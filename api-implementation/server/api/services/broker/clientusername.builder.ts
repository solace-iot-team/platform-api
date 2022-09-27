import { Components } from "@asyncapi/parser";
import App = Components.Schemas.App;
import MsgVpnClientUsername = Components.Schemas.MsgVpnClientUsername

class ClientUsernameBuilder {
  public async build(app: App, clientProfileName: string, environments: string[]): Promise<MsgVpnClientUsername[]> {
    const clientUsernames: MsgVpnClientUsername[] = [];
    const credentialsArray: Components.Schemas.CredentialsArray = Array.isArray(app.credentials) ? app.credentials : [app.credentials];
    const credentials = app.credentials as Components.Schemas.Credentials;
    for (const credentials of credentialsArray) {
      const clientUsername: MsgVpnClientUsername = {
        aclProfileName: app.internalName,
        clientUsername: credentials.secret.consumerKey,
        password: credentials.secret.consumerSecret,
        clientProfileName: clientProfileName,
        enabled: true,
        environments: environments
      };
      clientUsernames.push(clientUsername);
    }
    return clientUsernames;
  }
}

export default new ClientUsernameBuilder();