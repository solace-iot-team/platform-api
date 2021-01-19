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
             * A comma separated list of scopes. These must map to the scopes defined in an Oauth policy associated with the API Product. Any scope mismatch between an Acces Token presented and the API Product results in auth failure.
             */
            scopes?: string[];
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
             * The internal name of the API Product. Characters you can use in the name are restricted to: A-Z0-9._\-$ %.
             * example:
             * {name}
             */
            name?: string;
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            pubResources?: string[];
            /**
             * A comma separated list of scopes. These must map to the scopes defined in an Oauth policy associated with the API Product. Any scope mismatch between an Acces Token presented and the API Product results in auth failure.
             */
            scopes?: string[];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            subResources?: string[];
        }
        /**
         * An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface App {
            name: string;
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number;
            apiProducts: string[];
            attributes?: Attributes;
            scopes?: string[];
            /**
             * callback url for webhooks
             */
            callbackUrl?: string;
            credentials: /* Credentials object associated with an app */ Credentials;
        }
        /**
         * Used for PATCH operation. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface AppPatch {
            name?: string;
            apiProducts?: string[];
            attributes?: Attributes;
            scopes?: string[];
            /**
             * callback url for webhooks
             */
            callbackUrl?: string;
            credentials?: /* Credentials object associated with an app */ Credentials;
            status?: "approved" | "pending";
        }
        /**
         * App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use.
         */
        export interface AppResponse {
            name: string;
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number;
            apiProducts: string[];
            attributes?: Attributes;
            scopes?: string[];
            /**
             * callback url for webhooks
             */
            callbackUrl?: string;
            credentials: /* Credentials object associated with an app */ Credentials;
            messagingProtocols?: Endpoint[];
            permissions?: /* lists all the publish and subscribe topics an app has access to. Restrictions on   topic elements are taken into account. */ Permissions;
        }
        export type Attributes = {
            name: string;
            value: string;
        }[];
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
            userName?: string;
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
            /**
             * environment name
             * example:
             * dev
             */
            environment?: string;
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
            properties?: Properties;
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
            properties?: Properties;
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
        }
        export interface Organization {
            /**
             * example:
             * myorg
             */
            name?: string;
            /**
             * a Solace Cloud API Token, requires "get services" and "event portal read" permissions
             * example:
             * eyXhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmcifiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18Ycuck4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnvbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRfe0-3svIPw
             */
            "cloud-token"?: string;
        }
        /**
         * lists all the publish and subscribe topics an app has access to. Restrictions on   topic elements are taken into account.
         */
        export interface Permissions {
            /**
             * example:
             * [
             *   "order/notifications/DE/>",
             *   "order/cancellation/DE/>",
             *   "order/notifications/FR/>",
             *   "order/cancellation/FR/>"
             * ]
             */
            subscribe?: string[];
            /**
             * example:
             * [
             *   "order/create/DE/>",
             *   "order/update/DE/>",
             *   "order/create/FR/>",
             *   "order/update/FR/>"
             * ]
             */
            publish?: string[];
        }
        export type Properties = {
            /**
             * example:
             * key
             */
            key: string;
            /**
             * example:
             * value
             */
            value: string;
        }[];
        export interface Protocol {
            name: "amqp" | "amqps" | "http" | "https" | "jms" | "mqtt" | "secure-mqtt" | "ws" | "wss" | "smf" | "smfs";
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
    }
}
declare namespace Paths {
    namespace $OrganizationApiProducts {
        namespace Get {
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
        namespace Post {
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
    }
    namespace $OrganizationApiProducts$ApiProductName {
        namespace Delete {
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
        namespace Get {
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
        namespace Patch {
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
    }
    namespace $OrganizationApis {
        namespace Get {
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
    }
    namespace $OrganizationApis$ApiName {
        namespace Delete {
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
        namespace Get {
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
        namespace Patch {
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
        namespace Put {
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
    }
    namespace $OrganizationDevelopers {
        namespace Get {
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
        namespace Post {
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
    }
    namespace $OrganizationDevelopers$DeveloperUsername {
        namespace Delete {
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
        namespace Get {
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
        namespace Patch {
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
    }
    namespace $OrganizationDevelopers$DeveloperUsernameApps {
        namespace Get {
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
        namespace Post {
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
    }
    namespace $OrganizationDevelopers$DeveloperUsernameApps$AppName {
        namespace Delete {
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
        namespace Get {
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
        namespace Patch {
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
    }
    namespace $OrganizationEnvironments {
        namespace Get {
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
        namespace Post {
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
    }
    namespace $OrganizationEnvironments$EnvName {
        namespace Delete {
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
        namespace Get {
            namespace Responses {
                export type $200 = /* an environment */ Components.Schemas.Environment;
                export type $400 = Components.Schemas.ErrorResponse;
                export type $401 = Components.Schemas.ErrorResponse;
                export type $403 = Components.Schemas.ErrorResponse;
                export type $404 = Components.Schemas.ErrorResponse;
                export type $500 = Components.Schemas.ErrorResponse;
                export type $503 = Components.Schemas.ErrorResponse;
                export type $504 = Components.Schemas.ErrorResponse;
            }
        }
        namespace Patch {
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
    }
    namespace $OrganizationEventPortalApiDomains {
        namespace Get {
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
    }
    namespace $OrganizationEventPortalApiDomains$ApiDomainName {
        namespace Get {
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
    }
    namespace $OrganizationEventPortalApis {
        namespace Get {
            namespace Parameters {
                export type ApiDomainName = string;
            }
            export interface QueryParameters {
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
    }
    namespace $OrganizationEventPortalApis$ApiName {
        namespace Get {
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
    }
    namespace $OrganizationEventPortalApis$ApiNameSpec {
        namespace Get {
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
    }
    namespace $OrganizationHistory {
        namespace Get {
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
    }
    namespace $OrganizationServices {
        namespace Get {
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
    }
    namespace Organizations {
        namespace Get {
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
        namespace Post {
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
    }
    namespace Organizations$Organization {
        namespace Delete {
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
        namespace Get {
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
        namespace Patch {
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
    }
}
