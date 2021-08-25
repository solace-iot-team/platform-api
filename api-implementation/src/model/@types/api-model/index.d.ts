declare namespace Components {
    namespace Parameters {
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
        namespace EventApiProductId {
            export type EventApiProductId = string;
        }
        namespace Organization {
            export type OrganizationName = string;
        }
        namespace PageNumber {
            export type PageNumber = number; // int32
        }
        namespace PageSize {
            export type PageSize = number; // int32
        }
        namespace TeamName {
            export type TeamName = string;
        }
        namespace TopicSyntax {
            export type TopicSyntax = "smf" | "mqtt";
        }
    }
    namespace Schemas {
        export interface APIImport {
            /**
             * source system for loading the Async API
             */
            source?: "EventAPIProduct";
            /**
             * id of the entity in the source system
             * example:
             * 7avdj5n26cq
             */
            id?: string;
            /**
             * indicates if an existing API entity shall be replaced
             */
            overwrite?: boolean;
        }
        export interface APIInfo {
            /**
             * source of the API spec
             */
            source?: "EventAPIProduct" | "Upload";
            /**
             * id of the entity in the source system
             * example:
             * 7avdj5n26cq
             */
            sourceId?: string;
            /**
             * example:
             * 1620311683577
             */
            createdTime?: number;
            /**
             * example:
             * 1623615030383
             */
            updatedTime?: number;
            /**
             * example:
             * tom
             */
            createdBy?: string;
            /**
             * example:
             * An IoT Sensor API
             */
            description?: string;
            /**
             * example:
             * IoT Sensor API
             */
            name?: string;
            /**
             * example:
             * An IoT sensor API
             */
            summary?: string;
            /**
             * example:
             * 1
             */
            version?: string;
            /**
             * any metadata as returned by the external System (if applicable)
             */
            sourceMetadata?: {
                [name: string]: any;
            };
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
         * An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface App {
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
             * the development env
             */
            displayName?: string;
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
            exposedProtocols: Protocol[];
        }
        /**
         * a list item in the environmentslist
         */
        export interface EnvironmentListItem {
            /**
             * example:
             * dev
             */
            name: string;
            /**
             * example:
             * the development env
             */
            displayName?: string;
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
            exposedProtocols: Protocol[];
            /**
             * example:
             * default
             */
            msgVpnName?: string;
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
        }
        /**
         * used for PATCH operation, an environment
         */
        export interface EnvironmentPatch {
            /**
             * example:
             * development environment
             */
            displayName?: string;
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
            /**
             * The protocols that can be exposed for use with APIs
             */
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
            displayName?: string;
            /**
             * example:
             * development environment
             */
            description: string;
            /**
             * The protocols that can be exposed for use with APIs
             */
            exposedProtocols?: Protocol[];
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
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
        export interface EventAPIProduct {
            /**
             * example:
             * 1620311683577
             */
            createdTime?: number;
            /**
             * example:
             * 1623615030383
             */
            updatedTime?: number;
            /**
             * example:
             * abdcgto456
             */
            createdBy?: string;
            /**
             * example:
             * abdsf4567
             */
            changedBy?: string;
            /**
             * example:
             * abc123
             */
            id: string;
            /**
             * example:
             * fdsfds546
             */
            virtualBrokerId?: string;
            /**
             * example:
             * An IoT Sensor API
             */
            description?: string;
            /**
             * example:
             * IoT Sensor API
             */
            name: string;
            published?: boolean;
            /**
             * example:
             * publishedTime
             */
            publishedTime?: number;
            /**
             * example:
             * tcp://sac346.solace.cloud:1883
             */
            serverUrl?: string;
            /**
             * example:
             * mqtt
             */
            serverProtocol?: string;
            /**
             * example:
             * An IoT sensor API
             */
            summary?: string;
            /**
             * example:
             * 0
             */
            unpublishedTime?: number;
            /**
             * example:
             * 1
             */
            version?: string;
            /**
             * example:
             * 3
             */
            numberOfEvents?: number;
            /**
             * example:
             * https://apiproducts.solace.cloud/website/abc123
             */
            websiteUrl?: string;
            /**
             * example:
             * https://solace.cloud/api/v0/eventPortal/apiProducts/abc123/asyncApi.json
             */
            restUrlJson?: string;
            /**
             * example:
             * https://solace.cloud/api/v0/eventPortal/apiProducts/abc123/asyncApi.yaml
             */
            restUrlYaml?: string;
            type?: string;
        }
        export type EventAPIProductList = EventAPIProduct[];
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
            /**
             * Specifies how requests to the SEMPv2 Management API are authenticated, defaults to BasicAuth. If APIKey is specified the username returned in the Services/Environments response is used as API Key.
             */
            sempV2Authentication?: {
                /**
                 * example:
                 * APIKey
                 */
                authType: "BasicAuth" | "APIKey";
                /**
                 * example:
                 * header
                 */
                apiKeyLocation?: "header" | "query";
                /**
                 * the name of the query parameter or HTTP header for submitting the API Key
                 * example:
                 * X-API-KEY
                 */
                apiKeyName?: string;
            };
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
            name: "amqp" | "amqps" | "http" | "https" | "jms" | "secure-jms" | "mqtt" | "secure-mqtt" | "ws-mqtt" | "wss-mqtt" | "ws" | "wss" | "smf" | "smfs" | "compressed-smf";
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
            /**
             * The protocols supported by this service
             */
            messagingProtocols?: Endpoint[];
            msgVpnAttributes?: {
                authenticationClientCertEnabled: string;
                authenticationBasicEnabled: string;
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
        }
        /**
         * A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface Team {
            displayName: string;
            /**
             * a unique name which can not be updated
             */
            name: string;
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface TeamPatch {
            displayName?: string;
            attributes?: Attributes;
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
    namespace $OrganizationNameApps {
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
            export interface $201 {
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
        export type RequestBody = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
        namespace Responses {
            export type $201 = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
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
    namespace CreateTeam {
        export type RequestBody = /* A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.Team;
        namespace Responses {
            export type $201 = /* A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.Team;
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
    namespace CreateTeamApp {
        export type RequestBody = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
        namespace Responses {
            export type $201 = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App;
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
    namespace DeleteTeam {
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
    namespace DeleteTeamApp {
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
    namespace GetApiInfo {
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
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
    namespace GetEventAPIProduct {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProduct;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEventAPIProductAsyncAPI {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            /**
             * example:
             * {
             *   "asyncapi": "2.0.0",
             *   "info": {
             *     "title": "Hello world application",
             *     "version": "0.1.0"
             *   },
             *   "channels": {
             *     "hello": {
             *       "publish": {
             *         "message": {
             *           "payload": {
             *             "type": "string"
             *           }
             *         }
             *       }
             *     }
             *   }
             * }
             */
            export interface $200 {
                [name: string]: any;
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
    namespace GetTeam {
        namespace Responses {
            export type $200 = /* A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.Team;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetTeamApp {
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
    namespace ImportApi {
        export type RequestBody = Components.Schemas.APIImport;
        namespace Responses {
            export interface $201 {
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
            export type $200 = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App[];
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
        namespace Parameters {
            export type Format = "summary" | "full";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export type $200 = /* a list item in the environmentslist */ Components.Schemas.EnvironmentListItem[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListEventAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProductList;
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
            export type $200 = /* provides information about a service in the Solace Cloud account. */ Components.Schemas.Service[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListTeamApps {
        namespace Parameters {
            export type Status = Components.Schemas.AppStatus;
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = /* An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use */ Components.Schemas.App[];
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
            export type $403 = Components.Schemas.ErrorResponse;
            export type $404 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Schemas.ErrorResponse;
            export type $504 = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListTeams {
        namespace Responses {
            export type $200 = /* A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.Team[];
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
            export interface $200 {
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
    namespace UpdateTeam {
        export type RequestBody = /* Used for PATCH operation, A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.TeamPatch;
        namespace Responses {
            export type $200 = /* A profile of a team. After the team is created, an app can be registered and API credentials are created */ Components.Schemas.Team;
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
    namespace UpdateTeamApp {
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
    namespace UpdateToken {
        export type RequestBody = string;
        namespace Responses {
            export type $201 = string;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Schemas.ErrorResponse;
        }
    }
}
