import App = Components.Schemas.App;
import MsgVpnClientUsername = Components.Schemas.MsgVpnClientUsername

class ClientUsernameBuilder {
    public async build(app: App, clientProfileName: string, environments: string[]): Promise<MsgVpnClientUsername> {

        const clientUsername: MsgVpnClientUsername = {
          aclProfileName: app.internalName,
          clientUsername: app.credentials.secret.consumerKey,
          password: app.credentials.secret.consumerSecret,
          clientProfileName: clientProfileName,
          enabled: true,
          environments: environments
        };
        return clientUsername;
      }
}

export default new ClientUsernameBuilder();