import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;
import AppEnvironment = Components.Schemas.AppEnvironment;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import AppConnectionStatus = Components.Schemas.AppConnectionStatus;

export default interface Broker {
  provision(app: App, ownerAttributes: Attributes, isUpdate?: boolean): Promise<void>;
  reprovision(appPatch: App, appUnmodified: App, ownerAttributes: Attributes): Promise<boolean>;
  deprovision(app: App);
  getPermissions(app: App, ownerAttributes: Attributes, envName: string, syntax: TopicSyntax): Promise<Permissions>;
  getAppStatus(app: App): Promise<AppConnectionStatus>;
  getMessagingProtocols(app: App);
  getMessagingProtocolsByAPIProduct(apiProduct: APIProduct): Promise<AppEnvironment[]>;
}
