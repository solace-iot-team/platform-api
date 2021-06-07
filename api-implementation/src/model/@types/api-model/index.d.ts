declare namespace Components {
    namespace Parameters {
        namespace ApiDomainName {
            export type ApiDomainName = string;
        }
        namespace ApiName {
            export type ApiName = string;
        }
        namespace ApiProductName {
            export type ApiProductName = string;
        }
        namespace AppId {
            export type AppId = string;
        }
        namespace AppName {
            export type AppName = string;
        }
        namespace AttributeName {
            export type AttributeName = string;
        }
        namespace CompanyId {
            export type CompanyId = string;
        }
        namespace DeveloperUsername {
            export type DeveloperUsername = string;
        }
        namespace EnvName {
            export type EnvName = string;
        }
        namespace Organization {
            export type Organization = string;
        }
        namespace PageNumber {
            export type PageNumber = number; // int32
        }
        namespace PageSize {
            export type PageSize = number; // int32
        }
        namespace TopicSyntax {
            export type TopicSyntax = "smf" | "mqtt";
        }
    }
    namespace Schemas {
        /**
         * Event Portal API information. Currently only provided as utiity to retrieve metadata from the Event Portal.
         */
        export interface API {
            /**
             * example:
             * 1583706406
             */
            readonly createdTime?: number; // int64
            /**
             * example:
             * 1583706406
             */
            readonly updatedTime?: number; // int64
            /**
             * example:
             * joe.bloggs
             */
            readonly createdBy?: string;
            /**
             * example:
             * jack.black
             */
            readonly changedBy?: string;
            /**
             * example:
             * 12345678
             */
            readonly id?: string;
            /**
             * example:
             * Billing App
             */
            name: string;
            /**
             * example:
             * 0.0.1
             */
            readonly version?: string;
            /**
             * example:
             * API created by Solace PubSub+ Cloud documentation
             */
            description?: string;
            /**
             * example:
             * Acme Rideshare
             */
            apiDomainName: string;
            /**
             * tags of the API
             */
            tags?: string[];
            /**
             * example:
             * Changed api name
             */
            revisionComment?: string;
            /**
             * example:
             * [
             *   1,
             *   2
             * ]
             */
            readonly revisionNumber?: number; // int32
            /**
             * example:
             * solace
             */
            apiClass?: "unspecified" | "kafka_connector" | "solace_connector" | "kafka_application";
            readonly type?: string;
        }
        /**
         * Event Portal API Domain information. Currently only provided as utiity to retrieve metadata from the Event Portal.
         */
        export interface APIDomain {
            /**
             * example:
             * 1583706406
             */
            readonly createdTime?: number; // int64
            /**
             * example:
             * 1583706406
             */
            readonly updatedTime?: number; // int64
            /**
             * example:
             * joe.bloggs
             */
            readonly createdBy?: string;
            /**
             * example:
             * jack.black
             */
            readonly changedBy?: string;
            /**
             * example:
             * 12345678
             */
            readonly id?: string;
            /**
             * example:
             * Acme Rideshare
             */
            name?: string;
            /**
             * example:
             * com/solace
             */
            topicDomain?: string;
            /**
             * example:
             * API Domain created by the Solace PubSub+ Cloud API documentation
             */
            description?: string;
            /**
             * example:
             * true
             */
            enforceUniqueTopicNames: boolean;
            /**
             * example:
             * [
             *   "Billing App",
             *   "Driver App"
             * ]
             */
            readonly apis?: string[];
            type?: string;
        }
        /**
         * API List item (short info). Currently only provided as utiity to retrieve metadata from the Event Portal.
         */
        export interface APIListItem {
            /**
             * example:
             * Billing App
             */
            name?: string;
            /**
             * example:
             * Acme Rideshare
             */
            apiDomain?: string;
            /**
             * example:
             * Manage billing information
             */
            description?: string;
            tags?: string[];
        }
        /**
         * An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously
         */
        export interface APIProduct {
            /**
             * APIs associated with this product.
             */
            apis: string[];
            /**
             * manual or auto. If manual, credetials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            /**
             * Arbitrary name/value pairs associated with the product.
             */
            attributes: {
                /**
                 * Attribute name, access is a special value as it governs access control to the product.
                 * example:
                 * access
                 */
                name: string;
                /**
                 * Value of the attribute.
                 * example:
                 * {public, private, or internal}
                 */
                value: string;
            }[];
            /**
             * An overview of the API product. Include key information about the API product that is not captured by other fields..
             * example:
             * {description}
             */
            description?: string;
            /**
             * The name to be displayed in the UI or developer portal to developers registering for API access.
             * example:
             * {display_name}
             */
            displayName: string;
            /**
             * A comma-separated list of environment name in an organization. Requests to environments not listed are rejected.
             */
            environments?: string[];
            /**
             * The internal name of the API Product. Characters you can use in the name are restricted to: A-Z0-9._\-$ %.
             * example:
             * {name}
             */
            name: string;
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            pubResources: string[];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            subResources: string[];
            protocols?: Protocol[];
        }
        /**
         * Used for PATCH operation, An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously
         */
        export interface APIProductPatch {
            /**
             * APIs associated with this product.
             */
            apis?: string[];
            /**
             * manual or auto. If manual, credentials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            /**
             * Arbitrary name/value pairs associated with the product.
             */
            attributes?: {
                /**
                 * Attribute name, access is a special value as it governs access control to the product.
                 * example:
                 * [
                 *   "access"
                 * ]
                 */
                name: string;
                /**
                 * Value of the attribute.
                 * example:
                 * {public, private, or internal}
                 */
                value: string;
            }[];
            /**
             * An overview of the API product. Include key information about the API product that is not captured by other fields..
             * example:
             * {description}
             */
            description?: string;
            /**
             * The name to be displayed in the UI or developer portal to developers registering for API access.
             * example:
             * {display_name}
             */
            displayName?: string;
            /**
             * A comma-separated list of environment name in an organization. Requests to environments not listed are rejected.
             */
            environments?: string[];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            pubResources?: string[];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            subResources?: string[];
            protocols?: Protocol[];
        }
        /**
         * An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface App {
            /**
             * the uniuque name of this app, can not be updated
             */
            name: string;
            /**
             * friendly name of the app that can be changed subsequently
             */
            displayName?: string;
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number;
            apiProducts: string[];
            attributes?: Attributes;
            /**
             * callback url
             */
            callbackUrl?: string; // uri
            webHooks?: WebHook[];
            credentials: /* Credentials object associated with an app */ Credentials;
        }
        export interface AppEnvironment {
            /**
             * example:
             * dev
             */
            name?: string;
            messagingProtocols?: Endpoint[];
            permissions?: /* lists all the publish and subscribe topics an app has access to. Restrictions on   topic elements are taken into account. */ Permissions;
        }
        export interface AppListItem {
            name?: string;
            displayName?: string;
            appType?: "developer";
            /**
             * example:
             * Developer-1
             */
            ownerId?: string;
            apiProducts?: string[];
            status?: AppStatus;
        }
        /**
         * Used for PATCH operation. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface AppPatch {
            /**
             * friendly name of the app that can be changed subsequently
             */
            displayName?: string;
            apiProducts?: string[];
            attributes?: Attributes;
            /**
             * callback url
             */
            callbackUrl?: string;
            webHooks?: WebHook[];
            credentials?: /* Credentials object associated with an app */ Credentials;
            status?: AppStatus;
        }
        /**
         * App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use.
         */
        export interface AppResponse {
            /**
             * the unique name of this app, can not be updated
             */
            name: string;
            /**
             * friendly name of the app that can be changed subsequently
             */
            displayName?: string;
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number;
            apiProducts: string[];
            attributes?: Attributes;
            /**
             * callback url
             */
            callbackUrl?: string;
            webHooks?: WebHook[];
            credentials: /* Credentials object associated with an app */ Credentials;
            environments?: AppEnvironment[];
            status?: AppStatus;
        }
        export type AppStatus = "approved" | "pending";
        export type Attributes = {
            name: string;
            value: string;
        }[];
        /**
         * a permission and its associated channel
         */
        export interface ChannelPermission {
            /**
             * example:
             * [
             *   "order/notifications/FR/>",
             *   "order/notifications/DE/>"
             * ]
             */
            permissions: string[];
            channelId?: string;
            isChannel?: boolean;
        }
        /**
         * Credentials object associated with an app
         */
        export interface Credentials {
            expiresAt: number;
            issuedAt?: number;
            secret?: {
                consumerKey: string;
                consumerSecret?: string;
            };
        }
        export interface CustomCloudEndpoint {
            /**
             * example:
             * https://solace.cloud/v1
             */
            baseUrl: string; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,200}$
            /**
             * example:
             * eyXhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmcifiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18Ycuck4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnvbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRfe0-3svIPw
             */
            token?: string;
        }
        /**
         * A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface Developer {
            email: string;
            firstName: string;
            lastName: string;
            userName: string;
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface DeveloperPatch {
            email?: string;
            firstName?: string;
            lastName?: string;
            attributes?: Attributes;
        }
        export interface Endpoint {
            protocol?: Protocol;
            /**
             * The protocol transport
             * example:
             * TCP
             */
            transport?: string;
            secure?: "yes" | "no";
            compressed?: "yes" | "no";
            /**
             * example:
             * smf://1234abc.messaging.solace.cloud:55555
             */
            uri?: string; // uri
        }
        /**
         * an environment
         */
        export interface Environment {
            /**
             * example:
             * dev
             */
            name: string;
            /**
             * example:
             * development environment
             */
            description: string;
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string;
            exposedProtocols?: Protocol[];
        }
        /**
         * used for PATCH operation, an environment
         */
        export interface EnvironmentPatch {
            /**
             * example:
             * development environment
             */
            description?: string;
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId?: string;
            exposedProtocols?: Protocol[];
        }
        /**
         * an environment
         */
        export interface EnvironmentResponse {
            /**
             * example:
             * dev
             */
            name: string;
            /**
             * example:
             * development environment
             */
            description: string;
            exposedProtocols?: Protocol[];
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string;
            /**
             * example:
             * DEV-GW
             */
            serviceName?: string;
            msgVpnName?: string;
            datacenterId?: string;
            datacenterProvider?: string;
            serviceTypeId?: string;
            serviceClassId?: string;
            creationState?: string;
            messagingProtocols?: Endpoint[];
            serviceClassDisplayedAttributes?: {
                "High Availability": string;
                "Network Speed": string;
                Storage: string;
                "Message Broker Tenancy": string;
                Queues: string;
                Clients: string;
                "Network Usage": string;
            };
        }
        export interface ErrorResponse {
            /**
             * example:
             * An error occurred
             */
            message?: string;
            /**
             * example:
             * 123e4567-e89b-12d3-a456-426655440000
             */
            errorId?: string;
            /**
             * example:
             * 'object': { 'field': 'description' }
             */
            meta?: {
                [name: string]: unknown;
            };
        }
        export interface History {
            /**
             * example:
             * Update product "Product 1"
             */
            title?: string;
            /**
             * example:
             * PATCH
             */
            operation?: string;
            /**
             * UNIX timestamp when auditable event occurred
             * example:
             * 1610714525243
             */
            at?: number;
            /**
             * example:
             * admin
             */
            user?: string;
            /**
             * the request URI
             */
            requestURI?: string;
            requestBody?: string;
            /**
             * example:
             * 200
             */
            responseCode?: number;
        }
        export interface Organization {
            /**
             * example:
             * myorg
             */
            name: string; // ^[^\/\\\.\s"\$]{4,64}$
            "cloud-token"?: string | {
                eventPortal: CustomCloudEndpoint;
                cloud: CustomCloudEndpoint;
            };
        }
        /**
         * lists all the publish and subscribe topics an app has access to. Restrictions on   topic elements are taken into account.
         */
        export interface Permissions {
            /**
             * example:
             * [
             *   {
             *     "order/notifications/{country_id}/{order_id}": {
             *       "permissions": [
             *         "order/notifications/FR/>",
             *         "order/notifications/DE/>"
             *       ],
             *       "channelId": "c1",
             *       "isChannel": true
             *     }
             *   },
             *   {
             *     "another/random/exception/{resource_id}": {
             *       "permissions": [
             *         "another/random/exception/1",
             *         "another/random/exception/2"
             *       ],
             *       "isChannel": false
             *     }
             *   }
             * ]
             */
            subscribe?: {
                [name: string]: /* a permission and its associated channel */ ChannelPermission;
            }[];
            /**
             * example:
             * [
             *   {
             *     "order/create/{country_id}/{order_id}": {
             *       "permissions": [
             *         "order/create/FR/>",
             *         "order/create/DE/>"
             *       ],
             *       "channelId": "c2",
             *       "isChannel": true
             *     }
             *   },
             *   {
             *     "order/update/{country_id}/{order_id}": {
             *       "permissions": [
             *         "order/update/FR/>",
             *         "order/update/DE/>"
             *       ],
             *       "channelId": "orderUpdateChannel",
             *       "isChannel": true
             *     }
             *   },
             *   {
             *     "another/random/exception/{resource_id}": {
             *       "permissions": [
             *         "another/random/exception/3",
             *         "another/random/exception/4"
             *       ],
             *       "isChannel": false
             *     }
             *   }
             * ]
             */
            publish?: {
                [name: string]: /* a permission and its associated channel */ ChannelPermission;
            }[];
        }
        export interface Protocol {
            name: "amqp" | "amqps" | "http" | "https" | "jms" | "mqtt" | "secure-mqtt" | "ws-mqtt" | "wss-mqtt" | "ws" | "wss" | "smf" | "smfs";
            version?: string;
        }
        /**
         * provides information about a service in the Solace Cloud account.
         */
        export interface Service {
            type?: string;
            timestamp?: number;
            userId?: string;
            serviceId?: string;
            infrastructureId?: string;
            name?: string;
            msgVpnName?: string;
            datacenterId?: string;
            datacenterProvider?: string;
            serviceTypeId?: string;
            serviceClassId?: string;
            adminState?: string;
            adminProgress?: string;
            created?: number;
            creationState?: string;
            messagingProtocols?: {
                name: string;
                username: string;
                password: string;
                endPoints: {
                    name: string;
                    transport: string;
                    uris: string[];
                    secured: string;
                    compressed: string;
                }[];
                limits: unknown;
            }[];
            managementProtocols?: {
                name: string;
                username: string;
                password: string;
                endPoints: {
                    name: string;
                    uris: string[];
                    secured: string;
                    authenticated: string;
                }[];
                limits: unknown;
            }[];
            msgVpnAttributes?: {
                vpnEventLargeMsgThreshold: string;
                authenticationClientCertValidateDateEnabled: string;
                vpnMaxConnectionCount: string;
                vpnAdminUsername: string;
                vpnMaxTransactedSessionCount: string;
                subDomainName: string;
                vmrVersion: string;
                vpnAdminPassword: string;
                vpnName: string;
                vpnMaxTransactionCount: string;
                vpnMaxMsgSpoolUsage: string;
                vpnMaxEndpointCount: string;
                vpnMaxEgressFlowCount: string;
                vpnMaxSubscriptionCount: string;
                authenticationClientCertEnabled: string;
                vpnEnabled: string;
                truststoreUri: string;
                authenticationBasicEnabled: string;
                vpnMaxIngressFlowCount: string;
            };
            locked?: boolean;
            messagingStorage?: number;
            serviceStage?: string;
            servicePackageId?: string;
            serviceClassDisplayedAttributes?: {
                "High Availability": string;
                "Network Speed": string;
                Storage: string;
                "Message Broker Tenancy": string;
                Queues: string;
                Clients: string;
                "Network Usage": string;
            };
            accountingLimits?: {
                id: string;
                value: string;
                unit: string;
                thresholds: {
                    type: string;
                    value: string;
                }[];
            }[];
            certificateAuthorities?: string[];
            clientProfiles?: string[];
            cluster?: {
                name: string;
                password: string;
                remoteAddress: string;
                primaryRouterName: string;
                supportedAuthenticationMode: string[];
            };
            redundancyGroupSslEnabled?: boolean;
            configSyncSslEnabled?: boolean;
        }
        /**
         * provides information about services in the Solace Cloud account.
         */
        export interface ServicesResponse {
            data: /* provides information about a service in the Solace Cloud account. */ Service[];
            meta: {
                /**
                 * example:
                 * 1605548717294
                 */
                currentTime?: number;
                pages?: {
                    /**
                     * example:
                     * 1
                     */
                    "next-page"?: number;
                    /**
                     * example:
                     * 1
                     */
                    "total-pages"?: number;
                };
                /**
                 * example:
                 * 0
                 */
                pageNumber?: number;
                /**
                 * example:
                 * 3
                 */
                count?: number;
                /**
                 * example:
                 * 100
                 */
                pageSize?: number;
            };
        }
        export interface WebHook {
            uri: string; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,200}$
            /**
             * environments that this webhook serves, if absent webhook will be used for all environments
             */
            environments?: string[];
            method: "POST" | "PUT";
            mode?: "parallel" | "serial";
            authentication?: {
                username?: string;
                password?: string;
            } | {
                headerName?: string;
                headerValue?: string;
            };
        }
    }
}
declare namespace Paths {
    namespace $OrganizationApps {
        namespace Parameters {
            export type Status = Components.Schemas.AppStatus;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
    }
    namespace CreateApi {
        export type RequestBody = string;
        namespace Responses {
            export type $201 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateApiProduct {
        export type RequestBody = /* An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProduct;
        namespace Responses {
            export type $201 = /* An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProduct;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateDeveloper {
        export type RequestBody = /* A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.Developer;
        namespace Responses {
            export type $201 = /* A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.Developer;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateDeveloperApp {
        export type RequestBody = /* An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
        namespace Responses {
            export type $201 = /* An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateEnvironment {
        export type RequestBody = /* an environment */ Components.Schemas.Environment;
        namespace Responses {
            export type $201 = /* an environment */ Components.Schemas.Environment;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteApi {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteApiProduct {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteDeveloper {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteDeveloperApp {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteEnvironment {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteOrganization {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApi {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApiProduct {
        namespace Responses {
            export type $200 = /* An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProduct;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApp {
        namespace Responses {
            export type $200 = /* App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use. */ Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetAppApiSpecification {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetDeveloper {
        namespace Responses {
            export type $200 = /* A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.Developer;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetDeveloperApp {
        namespace Responses {
            export type $200 = /* App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use. */ Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEnvironment {
        namespace Responses {
            export type $200 = /* an environment */ Components.Schemas.EnvironmentResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEventPortalApi {
        namespace Responses {
            export type $200 = /* Event Portal API information. Currently only provided as utiity to retrieve metadata from the Event Portal. */ Components.Schemas.API[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEventPortalApiDomain {
        namespace Responses {
            export type $200 = /* Event Portal API Domain information. Currently only provided as utiity to retrieve metadata from the Event Portal. */ Components.Schemas.APIDomain;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEventPortalAsyncApiSpecification {
        namespace Parameters {
            /**
             * example:
             * 2.0.0
             */
            export type AsyncApiVersion = string;
        }
        export interface QueryParameters {
            async_api_version?: /**
             * example:
             * 2.0.0
             */
            Parameters.AsyncApiVersion;
        }
        namespace Responses {
            export type $200 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetToken {
        namespace Responses {
            export type $200 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApiProducts {
        namespace Responses {
            export type $200 = /* An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProduct[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApis {
        namespace Responses {
            export type $200 = string[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListAppApiSpecifications {
        namespace Responses {
            export type $200 = string[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApps {
        namespace Responses {
            export type $200 = Components.Schemas.AppListItem[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListDeveloperApps {
        namespace Parameters {
            export type Status = Components.Schemas.AppStatus;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = /* An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListDevelopers {
        namespace Responses {
            export type $200 = /* A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.Developer[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListEnvironments {
        namespace Responses {
            export type $200 = /* an environment */ Components.Schemas.Environment[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListEventPortalApiDomains {
        namespace Responses {
            export type $200 = /* Event Portal API Domain information. Currently only provided as utiity to retrieve metadata from the Event Portal. */ Components.Schemas.APIDomain[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListEventPortalApis {
        namespace Parameters {
            export type ApiDomainName = string;
            export type Tags = string; // ^[a-zA-Z0-9:]+(?:,[a-zA-Z0-9:]+)*$
        }
        export interface QueryParameters {
            tags?: Parameters.Tags /* ^[a-zA-Z0-9:]+(?:,[a-zA-Z0-9:]+)*$ */;
            apiDomainName?: Parameters.ApiDomainName;
        }
        namespace Responses {
            export type $200 = /* API List item (short info). Currently only provided as utiity to retrieve metadata from the Event Portal. */ Components.Schemas.APIListItem[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListHistory {
        namespace Responses {
            export type $200 = Components.Schemas.History[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListOrganizations {
        namespace Responses {
            export type $200 = Components.Schemas.Organization[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListServices {
        namespace Responses {
            export type $200 = /* provides information about services in the Solace Cloud account. */ Components.Schemas.ServicesResponse[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateApi {
        export type RequestBody = string;
        namespace Responses {
            export type $200 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateApiProduct {
        export type RequestBody = /* Used for PATCH operation, An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProductPatch;
        namespace Responses {
            export type $200 = /* An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously */ Components.Schemas.APIProduct;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateDeveloper {
        export type RequestBody = /* Used for PATCH operation, A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.DeveloperPatch;
        namespace Responses {
            export type $200 = /* A profile for a developer. After the developer is created, they can register an app and receive API credentials */ Components.Schemas.Developer;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateDeveloperApp {
        export type RequestBody = /* Used for PATCH operation. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.AppPatch;
        namespace Responses {
            export type $200 = /* App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use. */ Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateEnvironment {
        export type RequestBody = /* used for PATCH operation, an environment */ Components.Schemas.EnvironmentPatch;
        namespace Responses {
            export type $200 = /* an environment */ Components.Schemas.Environment;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateToken {
        export type RequestBody = string;
        namespace Responses {
            export type $201 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
        }
    }
}
