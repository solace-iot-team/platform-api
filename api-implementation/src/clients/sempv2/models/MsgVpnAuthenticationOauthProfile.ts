/* eslint-disable */


export type MsgVpnAuthenticationOauthProfile = {
    /**
     * The name of the groups claim. If non-empty, the specified claim will be used to determine groups for authorization. If empty, the authorizationType attribute of the Message VPN will be used to determine authorization. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"groups"`.
     */
    authorizationGroupsClaimName?: string;
    /**
     * The OAuth client id. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    clientId?: string;
    /**
     * The required value for the TYP field in the ID token header. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"JWT"`.
     */
    clientRequiredType?: string;
    /**
     * The OAuth client secret. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    clientSecret?: string;
    /**
     * Enable or disable verification of the TYP field in the ID token header. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    clientValidateTypeEnabled?: boolean;
    /**
     * Enable or disable the disconnection of clients when their tokens expire. Changing this value does not affect existing clients, only new client connections. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    disconnectOnTokenExpirationEnabled?: boolean;
    /**
     * Enable or disable the OAuth profile. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The OpenID Connect discovery endpoint or OAuth Authorization Server Metadata endpoint. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    endpointDiscovery?: string;
    /**
     * The number of seconds between discovery endpoint requests. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `86400`.
     */
    endpointDiscoveryRefreshInterval?: number;
    /**
     * The OAuth introspection endpoint. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    endpointIntrospection?: string;
    /**
     * The maximum time in seconds a token introspection request is allowed to take. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1`.
     */
    endpointIntrospectionTimeout?: number;
    /**
     * The OAuth JWKS endpoint. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    endpointJwks?: string;
    /**
     * The number of seconds between JWKS endpoint requests. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `86400`.
     */
    endpointJwksRefreshInterval?: number;
    /**
     * The OpenID Connect Userinfo endpoint. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    endpointUserinfo?: string;
    /**
     * The maximum time in seconds a userinfo request is allowed to take. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `1`.
     */
    endpointUserinfoTimeout?: number;
    /**
     * The Issuer Identifier for the OAuth provider. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    issuer?: string;
    /**
     * Enable or disable whether the API provided MQTT client username will be validated against the username calculated from the token(s). When enabled, connection attempts by MQTT clients are rejected if they differ. Note that this value only applies to MQTT clients; SMF client usernames will not be validated. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    mqttUsernameValidateEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the OAuth profile.
     */
    oauthProfileName?: string;
    /**
     * The OAuth role of the broker. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"client"`. The allowed values and their meaning are:
     *
     * <pre>
     * "client" - The broker is in the OAuth client role.
     * "resource-server" - The broker is in the OAuth resource server role.
     * </pre>
     *
     */
    oauthRole?: MsgVpnAuthenticationOauthProfile.oauthRole;
    /**
     * Enable or disable parsing of the access token as a JWT. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    resourceServerParseAccessTokenEnabled?: boolean;
    /**
     * The required audience value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    resourceServerRequiredAudience?: string;
    /**
     * The required issuer value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    resourceServerRequiredIssuer?: string;
    /**
     * A space-separated list of scopes that must be present in the scope claim. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    resourceServerRequiredScope?: string;
    /**
     * The required TYP value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"at+jwt"`.
     */
    resourceServerRequiredType?: string;
    /**
     * Enable or disable verification of the audience claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    resourceServerValidateAudienceEnabled?: boolean;
    /**
     * Enable or disable verification of the issuer claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    resourceServerValidateIssuerEnabled?: boolean;
    /**
     * Enable or disable verification of the scope claim in the access token or introspection response. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    resourceServerValidateScopeEnabled?: boolean;
    /**
     * Enable or disable verification of the TYP field in the access token header. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `true`.
     */
    resourceServerValidateTypeEnabled?: boolean;
    /**
     * The name of the username claim. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"sub"`.
     */
    usernameClaimName?: string;
}

export namespace MsgVpnAuthenticationOauthProfile {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthenticationOauthProfile';

    /**
     * The OAuth role of the broker. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"client"`. The allowed values and their meaning are:
     *
     * <pre>
     * "client" - The broker is in the OAuth client role.
     * "resource-server" - The broker is in the OAuth resource server role.
     * </pre>
     *
     */
    export enum oauthRole {
        CLIENT = 'client',
        RESOURCE_SERVER = 'resource-server',
    }


}