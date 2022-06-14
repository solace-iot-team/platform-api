import APIProduct = Components.Schemas.APIProduct;
import App = Components.Schemas.App;

export interface BindingsGenerator {
    getBindingProtocol(): string;
    getApplicableProtocols(): string[];
    processChannels(apiName: string, channels: any, app: App, apiProduct: APIProduct) : Promise<void>;
}