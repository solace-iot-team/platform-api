/* eslint-disable */


export type MsgVpnRestDeliveryPointQueueBinding = {
    /**
     * Enable or disable whether the authority for the request-target is replaced with that configured for the REST Consumer remote. When enabled, the broker sends HTTP requests in absolute-form, with the request-target's authority taken from the REST Consumer's remote host and port configuration. When disabled, the broker sends HTTP requests whose request-target matches that of the original request message, including whether to use absolute-form or origin-form. This configuration is applicable only when the Message VPN is in REST gateway mode. The default value is `false`. Available since 2.6.
     */
    gatewayReplaceTargetAuthorityEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The request-target string to use when sending requests. It identifies the target resource on the far-end REST Consumer upon which to apply the request. There are generally two common forms for the request-target. The origin-form is most often used in practice and contains the path and query components of the target URI. If the path component is empty then the client must generally send a "/" as the path. When making a request to a proxy, most often the absolute-form is required. This configuration is only applicable when the Message VPN is in REST messaging mode. The default value is `""`.
     */
    postRequestTarget?: string;
    /**
     * The name of a queue in the Message VPN.
     */
    queueBindingName?: string;
    /**
     * The name of the REST Delivery Point.
     */
    restDeliveryPointName?: string;
}

export namespace MsgVpnRestDeliveryPointQueueBinding {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointQueueBinding';


}