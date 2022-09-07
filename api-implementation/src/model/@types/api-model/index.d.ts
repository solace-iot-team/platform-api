declare namespace Components {
    namespace Parameters {
        namespace ApiListFormat {
            export type Format = "compact" | "summary" | "extended";
        }
        namespace ApiName {
            export type ApiName = Schemas.CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
        }
        namespace ApiProductName {
            export type ApiProductName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace AppName {
            export type AppName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace ApplicationDomainId {
            export type ApplicationDomainId = string; // ^[a-z0-9]*$
        }
        namespace AttributeName {
            /**
             * Attribute name, access is a special value as it governs access control to the product.
             * example:
             * access
             */
            export type AttributeName = string; // ^[a-zA-Z0-9._-]*$
        }
        namespace ConfigSetName {
            export type ConfigSetName = Schemas.CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
        }
        namespace ConfigSnapshotRevision {
            export type ConfigSnapshotRevision = number;
        }
        namespace CreateMode {
            export type Mode = "test" | "write";
        }
        namespace DeveloperUsername {
            export type DeveloperUsername = Schemas.CommonUserName; // ^[.a-zA-Z0-9@_-]*$
        }
        namespace EnvName {
            export type EnvName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace EventApiProductId {
            export type EventApiProductId = string; // ^[a-z0-9]*$
        }
        namespace Filter {
            export type Filter = string;
        }
        namespace IfMatchHeader {
            export type IfMatch = string;
        }
        namespace ImporterJobName {
            export type ImporterJobName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace Organization {
            export type OrganizationName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace PageNumber {
            export type PageNumber = number; // int32
        }
        namespace PageSize {
            export type PageSize = number; // int32
        }
        namespace Semver {
            export type Semver = Schemas.SemVer; // ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
        }
        namespace SortDirection {
            export type SortDirection = "asc" | "desc";
        }
        namespace SortFieldName {
            export type SortFieldName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace TeamName {
            export type TeamName = string; // ^[a-zA-Z0-9_-]*$
        }
        namespace TopicSyntax {
            export type TopicSyntax = "smf" | "mqtt";
        }
        namespace Version {
            export type Version = Schemas.Version; // ^[ |\S]*$
        }
        namespace WebhookName {
            export type WebhookName = string; // ^.*$
        }
    }
    namespace Responses {
        export type BadRequest = Schemas.ErrorResponse;
        export type Conflict = Schemas.ErrorResponse;
        export type Forbidden = Schemas.ErrorResponse;
        export type GatewayTimeout = Schemas.ErrorResponse;
        export type InternalServerError = Schemas.ErrorResponse;
        export type NotAcceptable = Schemas.ErrorResponse;
        export type NotFound = Schemas.ErrorResponse;
        export type PreconditionFailed = Schemas.ErrorResponse;
        export type ServiceUnavailable = Schemas.ErrorResponse;
        export type TooManyRequests = Schemas.ErrorResponse;
        export type Unauthorized = Schemas.ErrorResponse;
        export type UnsupportedMediaType = Schemas.ErrorResponse;
    }
    namespace Schemas {
        export type ACLAction = "allow" | "disallow";
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
            id?: string; // ^[a-zA-Z0-9_-]*$
            /**
             * indicates if an existing API entity shall be replaced
             */
            overwrite?: boolean;
        }
        export interface APIInfo {
            /**
             * source of the API spec
             */
            source: "EventAPIProduct" | "Upload" | "EventPortalLink";
            /**
             * id of the entity in the source system
             * example:
             * 7avdj5n26cq
             */
            sourceId?: string; // ^[a-zA-Z0-9_-]*$
            createdTime: CommonTimestampInteger; // int64
            updatedTime?: CommonTimestampInteger; // int64
            createdBy: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            description: CommonDescription; // ^[\s\S]*$
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            summary: CommonDescription; // ^[\s\S]*$
            version: CommonVersion; // ^[_\-\S\.]*$
            attributes?: Attributes;
            meta?: Meta;
            /**
             * indicates that this API is marked as deprecated
             */
            deprecated?: boolean;
            deprecatedDescription?: CommonDescription; // ^[\s\S]*$
            apiParameters?: APIParameter[];
            /**
             * any metadata as returned by the external System (if applicable)
             */
            sourceMetadata?: {
                [name: string]: any;
            };
        }
        export type APIInfoList = APIInfo[];
        export interface APIInfoPatch {
            /**
             * indicates that this API is marked as deprecated
             */
            deprecated?: boolean;
            deprecatedDescription?: CommonDescription; // ^[\s\S]*$
            attributes?: Attributes;
            meta?: Meta;
        }
        export interface APIKeyAuthentication {
            /**
             * example:
             * header
             */
            location: "header" | "query";
            /**
             * the name of the query parameter or HTTP header for submitting the API Key
             * example:
             * X-API-KEY
             */
            name: string; // ^[a-zA-Z0-9_-]*$
            /**
             * the api key value
             * example:
             * abc-123-def-456
             */
            key: string; // ^[a-zA-Z0-9_-]*$
        }
        export type APIList = CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        export interface APIParameter {
            /**
             * name of the parameter as defined in the AsyncAPI Spec
             * example:
             * model
             */
            name: string; // .*
            /**
             * type of the parameter
             */
            type: "string" | "number" | "integer" | "boolean";
            /**
             * any allowed enumerated values for the parameter
             * example:
             * [
             *   "A",
             *   "T",
             *   "N"
             * ]
             */
            enum?: string /* .* */ [];
        }
        /**
         * An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously
         */
        export interface APIProduct {
            /**
             * APIs associated with this product.
             * example:
             * [
             *   "api1",
             *   "api2"
             * ]
             */
            apis: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            /**
             * manual or auto. If manual, credetials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            attributes: Attributes;
            description?: CommonDescription; // ^[\s\S]*$
            displayName: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * An array of environment names in an organization. Requests to environments not listed are rejected.
             */
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            /**
             * An array of Publish API resources to be bundled in the API Product.
             */
            pubResources: CommonTopic /* ^[a-zA-Z0-9][\S]*[^\/]$ */ [];
            /**
             * An array of Subscribe API resources to be bundled in the API Product.
             */
            subResources: CommonTopic /* ^[a-zA-Z0-9][\S]*[^\/]$ */ [];
            protocols: Protocol[];
            clientOptions?: ClientOptions;
            accessLevel?: APIProductAccessLevel;
            meta?: Meta;
        }
        export type APIProductAccessLevel = "internal" | "private" | "public";
        /**
         * Used for PATCH operation, An API product consists of a list of API resources (URIs) and custom metadata required by the API provider. API products enable you to bundle and distribute your APIs to multiple developer groups simultaneously
         */
        export interface APIProductPatch {
            /**
             * APIs associated with this product.
             * example:
             * [
             *   "api1",
             *   "api2"
             * ]
             */
            apis?: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            /**
             * manual or auto. If manual, credentials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            attributes?: Attributes;
            description?: CommonDescription; // ^[\s\S]*$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * A list of environment name in an organization. Requests to environments not listed are rejected.
             */
            environments?: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            pubResources?: CommonTopic /* ^[a-zA-Z0-9][\S]*[^\/]$ */ [];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            subResources?: CommonTopic /* ^[a-zA-Z0-9][\S]*[^\/]$ */ [];
            protocols?: Protocol[];
            clientOptions?: ClientOptions;
            accessLevel?: APIProductAccessLevel;
            meta?: Meta;
        }
        export interface APISummary {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            description?: CommonDescription; // ^[\s\S]*$
            source?: "EventAPIProduct" | "Upload" | "EventPortalLink";
            createdBy?: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
        }
        export type APISummaryList = APISummary[];
        export interface APIVersionInfoPatch {
            /**
             * indicates that this API is marked as deprecated
             */
            deprecated?: boolean;
            deprecatedDescription?: CommonDescription; // ^[\s\S]*$
            meta?: Meta;
        }
        export interface About {
            /**
             * indicates if the Connector is running in Proxy Mode. In this mode all published Event API Products in Event Portal are automatically available as APIs in the connector
             * example:
             * true
             */
            APIS_PROXY_MODE?: boolean;
            /**
             * indicates if the Connector is running in Event Portal 1 or Event Portal 2.0 mode
             */
            EVENT_PORTAL_VERSION?: "1" | "2";
            /**
             * version information
             * example:
             * {
             *   "connector-version": "1.0"
             * }
             */
            version?: {
                [name: string]: any;
            };
        }
        export interface AccountingLimit {
            id: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            value: string; // ^[\s\S]*$
            unit: string; // ^[\s\S]*$
            thresholds: Threshold[];
        }
        /**
         * An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface App {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * the internal name of the app used within the connector. This name is auto generated by default. Warning - should ONLY be set if a naming convention for broker objects must be imposed. This value can not be updated.
             */
            internalName?: string; // ^[a-zA-Z0-9_]*$
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts: AppApiProducts;
            attributes?: Attributes;
            callbackUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            webHooks?: WebHook[];
            credentials: Credentials;
        }
        export type AppApiProducts = (AppApiProductsComplex | CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ )[];
        export interface AppApiProductsComplex {
            apiproduct: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            status?: AppStatus;
        }
        export interface AppConfigSet {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            state?: ConfigState;
            aclProfile: MsgVpnAclProfile;
            clientProfile: MsgVpnClientProfile;
            clientUsername: MsgVpnClientUsername;
            authorizationGroup: MsgVpnAuthorizationGroup;
            mqttSession?: MsgVpnMqttSession;
            queues?: MsgVpnQueue[];
            restDeliveryPoints?: MsgVpnRestDeliveryPoint[];
            services: EnvironmentService[];
            attributes?: Attributes;
            tags?: Tags;
        }
        export interface AppConnection {
            protocol?: Protocol;
            /**
             * State of the connection (ESTABLISHED if up)
             * example:
             * ESTABLISHED
             */
            state?: string; // ^[A-Z]*$
            /**
             * uptime of connection in seconds
             * example:
             * 3601
             */
            uptime?: number;
            /**
             * connection latency in nanoseconds
             * example:
             * 22000
             */
            roundtripTime?: number;
            /**
             * client IP address and port
             * example:
             * 127.0.0.1:561230
             */
            clientAddress?: string; // ^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})$
        }
        /**
         * provides status information on the app's connections to the Gateway Broker
         */
        export interface AppConnectionStatus {
            environments?: AppEnvironmentStatus[];
        }
        export interface AppEnvironment {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            messagingProtocols?: Endpoint[];
            permissions?: Permissions;
        }
        /**
         * provides status information on the app's connections to the Gateway Broker
         */
        export interface AppEnvironmentStatus {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            connections?: AppConnection[];
            webHooks?: WebHookStatus[];
            queues?: QueueStatus[];
        }
        export interface AppListItem {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            appType?: "developer" | "team";
            /**
             * example:
             * Developer-1
             */
            ownerId?: string; // .*
            apiProducts?: AppApiProducts;
            status?: AppStatus;
        }
        /**
         * Used for PATCH operation. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface AppPatch {
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts?: AppApiProducts;
            attributes?: Attributes;
            callbackUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            webHooks?: WebHook[];
            credentials?: Credentials;
            status?: AppStatus;
        }
        /**
         * App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use.
         */
        export interface AppResponse {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * the internal name of the app used within the connector. This name is auto generated by default. Warning - should ONLY be set if a naming convention for broker objects must be imposed. This value can not be updated.
             */
            internalName?: string; // ^[a-zA-Z0-9_]*$
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts: AppApiProducts;
            attributes?: Attributes;
            clientInformation?: ClientInformation[];
            callbackUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            webHooks?: WebHook[];
            credentials: Credentials;
            environments?: AppEnvironment[];
            status?: AppStatus;
        }
        /**
         * App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use.
         */
        export interface AppResponseGeneric {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * the internal name of the app used within the connector. This name is auto generated by default. Warning - should ONLY be set if a naming convention for broker objects must be imposed. This value can not be updated.
             */
            internalName?: string; // ^[a-zA-Z0-9_]*$
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts: AppApiProducts;
            attributes?: Attributes;
            clientInformation?: ClientInformation[];
            callbackUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            webHooks?: WebHook[];
            credentials: Credentials;
            environments?: AppEnvironment[];
            status?: AppStatus;
            appType?: "developer" | "team";
            /**
             * example:
             * Developer-1
             */
            ownerId?: string; // .*
        }
        export type AppStatus = "approved" | "pending" | "revoked";
        export interface ApplicationDomain {
            /**
             * example:
             * 2021-12-31T20:30:57.920Z
             */
            readonly createdTime?: string;
            /**
             * example:
             * 2021-12-31T20:30:57.920Z
             */
            readonly updatedTime?: string;
            /**
             * example:
             * 12345678
             */
            readonly createdBy?: string;
            /**
             * example:
             * 12345678
             */
            readonly changedBy?: string;
            /**
             * example:
             * 12345678
             */
            readonly id?: string;
            /**
             * example:
             * My First Application Domain
             */
            name: string;
            /**
             * example:
             * Application Domain created by the Solace PubSub+ Cloud API documentation
             */
            description?: string;
            /**
             * Forces all topic addresses within the application domain to be unique.
             * example:
             * true
             */
            uniqueTopicAddressEnforcementEnabled?: boolean;
            /**
             * Forces all topic addresses within the application domain to be prefixed with one of the application domain’s configured topic domains.
             * example:
             * false
             */
            topicDomainEnforcementEnabled?: boolean;
            type?: string;
        }
        export type ApplicationDomainList = ApplicationDomain[];
        /**
         * Value of the attribute.
         * example:
         * public, private, or internal
         */
        export type AttributeValue = string; // ^.*$
        /**
         * Arbitrary name/value pairs associated with an API product, team, developer or app.
         */
        export type Attributes = {
            /**
             * Attribute name, access is a special value as it governs access control to the product.
             * example:
             * access
             */
            name: string; // ^[a-zA-Z0-9._-]*$
            /**
             * Value of the attribute.
             * example:
             * public, private, or internal
             */
            value: string; // ^.*$
        }[];
        export interface BasicAuthentication {
            userName: string; // ^.*$
            password: string; // ^.*$
        }
        export interface BearerTokenAuthentication {
            /**
             * example:
             * eyXhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmcifiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18Ycuck4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnvbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRfe0-3svIPw
             */
            token: string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
        }
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
            permissions: CommonTopic /* ^[a-zA-Z0-9][\S]*[^\/]$ */ [];
            channelId?: string; // ^[\s\S]*$
            isChannel?: boolean;
        }
        export interface ClientInformation {
            guaranteedMessaging?: ClientInformationGuaranteedMessaging;
        }
        export interface ClientInformationGuaranteedMessaging {
            /**
             * The name of the queue that is available for this app's API Product subcription
             * example:
             * AlAOLG3xxuYCVDpoXl4wKGwWAIURFGuK
             */
            name?: string; // .*
            apiProduct?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            /**
             * access mode for the queue
             * example:
             * exclusive
             */
            accessType?: "exclusive" | "non-exclusive";
            /**
             * retention policy for message on the queue, in seconds
             * example:
             * 3600
             */
            maxTtl?: number; // int64
            /**
             * The maximum message spool usage allowed by the Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking
             * example:
             * 50
             */
            maxMsgSpoolUsage?: number; // int64
        }
        export interface ClientOptions {
            guaranteedMessagingEnabled?: boolean;
            guaranteedMessaging?: ClientOptionsGuaranteedMessaging;
        }
        export interface ClientOptionsGuaranteedMessaging {
            /**
             * Automatically provision a queue with all subscriptions permitted for this app attached
             * example:
             * true
             */
            requireQueue?: boolean;
            /**
             * Queue can be applied at api level (one queue per API) or at API Product level (one queue per product, aggregating the subscriptions of all associated APIs), defaults to apiProduct if not supplied
             * example:
             * api
             */
            queueGranularity?: "api" | "apiProduct";
            /**
             * access mode for the queue
             * example:
             * exclusive
             */
            accessType?: "exclusive" | "non-exclusive";
            /**
             * retention policy for message on the queue, default to 24 hours. Set to 0 if messages are to be kept indefinitely
             * example:
             * 3600
             */
            maxTtl?: number; // int64
            /**
             * The maximum message spool usage allowed by the Queue, in megabytes (MB). A value of 0 only allows spooling of the last message received and disables quota checking
             * example:
             * 50
             */
            maxMsgSpoolUsage?: number; // int64
        }
        export interface CloudToken {
            [name: string]: any;
            eventPortal: CustomCloudEndpoint;
            cloud: CustomCloudEndpoint;
        }
        /**
         * An overview of the object. Include key information about the object that is not captured by other fields..
         * example:
         * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet libero. Maecenas lacus urna, dignissim sollicitudin nisi nec, mollis finibus tortor. Mauris ipsum dolor, eleifend eu bibendum iaculis, pulvinar sit amet justo. Curabitur vestibulum quis quam at pretium. Fusce a nulla non diam dapibus pretium. Phasellus vehicula interdum ex at dapibus. Cras non pretium metus. Nulla auctor nibh non lacus gravida, vitae molestie leo ultricies. Nunc tempor eros tempor dapibus vulputate.
         * 
         */
        export type CommonDescription = string; // ^[\s\S]*$
        /**
         * Friendly name of an object for display in UIs, Developer Portals. Can be changed after object creation
         * example:
         * A new IoT API / v2.0
         */
        export type CommonDisplayName = string; // ^[\/\sa-z.A-z0-9_-]*$
        /**
         * Friendly name of an object for display in UIs, Developer Portals. Can be changed after object creation
         * example:
         * A new IoT API / v2.0
         */
        export type CommonDisplayNameReadOnly = string; // ^[\/\sa-z.A-z0-9_-]*$
        /**
         * Name and display name attribute of an entity
         */
        export type CommonEntityNameList = CommonEntityNames[];
        /**
         * Name and display name attribute of an entity
         */
        export interface CommonEntityNames {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
        }
        /**
         * The internal name of an object. Characters you can use in the name are restricted to: A-Z0-9._-. Once the object is created the internal name can not be changed
         * example:
         * {name}
         */
        export type CommonName = string; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
        /**
         * id as used/issued by the back end apis, alphanumeric characters only
         * example:
         * n8kg4fjka9r
         */
        export type CommonSolaceCloudObjectId = string; // ^[a-zA-Z0-9]*$
        /**
         * example:
         * 1620311683577
         */
        export type CommonTimestampInteger = number; // int64
        /**
         * example:
         * deliver/*​/enroute/v1/45*​/-75*​/vehicle4*​/>
         */
        export type CommonTopic = string; // ^[a-zA-Z0-9][\S]*[^\/]$
        /**
         * example:
         * https://solace.cloud/api/v0/eventPortal/apiProducts/abc123/asyncApi.json
         */
        export type CommonURL = string; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
        /**
         * example:
         * tom
         */
        export type CommonUserName = string; // ^[.a-zA-Z0-9@_-]*$
        /**
         * example:
         * 3.1.1-alpha
         */
        export type CommonVersion = string; // ^[_\-\S\.]*$
        export interface ConfigSnapshot {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            revision: number;
            appliedBy: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            appliedAt: CommonTimestampInteger; // int64
            archivedBy: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            archivedAt: CommonTimestampInteger; // int64
            config: AppConfigSet;
            applied?: boolean;
        }
        export interface ConfigState {
            applied: boolean;
            appliedBy: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            appliedAt: CommonTimestampInteger; // int64
            errors?: CommonDescription /* ^[\s\S]*$ */ [];
        }
        /**
         * Credentials object associated with an app
         */
        export interface Credentials {
            expiresAt?: number; // int64
            issuedAt?: CommonTimestampInteger; // int64
            secret?: Secret;
        }
        export interface CustomCloudEndpoint {
            /**
             * example:
             * https://solace.cloud/v1
             */
            baseUrl: string; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            /**
             * example:
             * eyXhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmcifiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQU09IiwiYXBpVG9rZW5JZCI6Inlhb2wzc2ZveG03IiwiaXNzIjoiU29sYWNlIENvcnBvcmF0aW9uIiwiaWF0IjoxNjAzODA3NzQ1fQ.QIBpi5_U6b1DnAwbDbJiFIT0pomqa4AyOLtmSOEF6zhoxKMm4Y27WbILZnxnh_gpdX-tvt18Ycuck4xs3T5JjFfU3qrczRHSuj2vEdsCpDQWdyZTPV4NQ-zPxRvigTjaTlcdXin8XwMGh8nZdylgRMlRQjvotomnXQxgbUol0Kl1ziFFMybqeD10qCDsUW6Jv-PKibBN3cnCsWwPZX6d_XYUECs1AHjgs5pk-A8v3DHcnvbXiAP4XXrry6ztopAWKMc5rVFoB_WFY4yi0reuTYjn6Sf0g7vZxFifRZZHZmqZtNQUiX6S80eQG4kF3YDKlr5PfLDNp4iRfe0-3svIPw
             */
            token?: string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
        }
        /**
         * A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface Developer {
            email: string; // email ^.*@.*\.[a-zA-Z]*$
            firstName: string; // ^([[:punct:]]|[a-zA-Z])*$
            lastName: string; // ^([[:punct:]]|[a-zA-Z])*$
            userName: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface DeveloperPatch {
            email?: string; // email ^.*@.*\.[a-zA-Z]*$
            firstName?: string; // ^([[:punct:]]|[a-zA-Z])*$
            lastName?: string; // ^([[:punct:]]|[a-zA-Z])*$
            attributes?: Attributes;
        }
        export interface Endpoint {
            protocol?: Protocol;
            /**
             * The protocol transport
             * example:
             * TCP
             */
            transport?: string; // ^[A-Za-z0-9\/\.]*$
            secure?: "yes" | "no";
            compressed?: "yes" | "no";
            /**
             * example:
             * amqp://mr1i5g7tif6z9h.messaging.solace.cloud:5672
             */
            uri?: string; // ^[a-zA-Z0-9\.\-+]*:\/\/[A-Za-z\.:0-9\-]*.*$
            msgVpn?: string;
        }
        /**
         * Request to derive a new entity from an existing entity (clone). Meta object allows to pass in current user name to override the logged in user context in the Connector
         */
        export interface EntityDeriveRequest {
            names: CommonEntityNames;
            meta?: Meta;
        }
        /**
         * an environment
         */
        export interface Environment {
            [name: string]: any;
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            description: CommonDescription; // ^[\s\S]*$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string; // ^[a-zA-Z0-9_-]*$
            exposedProtocols: Protocol[];
        }
        /**
         * an environment
         */
        export interface EnvironmentListItem {
            [name: string]: any;
            msgVpnName?: MsgVpnName; // ^[^*^?]*$
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            description: CommonDescription; // ^[\s\S]*$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string; // ^[a-zA-Z0-9_-]*$
            exposedProtocols: Protocol[];
        }
        /**
         * used for PATCH operation, an environment
         */
        export interface EnvironmentPatch {
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            description?: CommonDescription; // ^[\s\S]*$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId?: string; // ^[a-zA-Z0-9]*$
            /**
             * The protocols that can be exposed for use with APIs
             */
            exposedProtocols?: Protocol[];
        }
        /**
         * an environment
         */
        export interface EnvironmentResponse {
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            description: CommonDescription; // ^[\s\S]*$
            /**
             * The protocols that can be exposed for use with APIs
             */
            exposedProtocols?: Protocol[];
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
            serviceId: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            /**
             * example:
             * DEV-GW
             */
            serviceName?: string; // ^[\s\S]*$
            msgVpnName?: MsgVpnName; // ^[^*^?]*$
            datacenterId?: string; // ^[\s\S]*$
            datacenterProvider?: string; // ^[\s\S]*$
            serviceTypeId?: string; // ^[\s\S]*$
            serviceClassId?: string; // ^[\s\S]*$
            creationState?: string; // ^[\s\S]*$
            serviceClassDisplayedAttributes?: ServiceClassDisplayedAttributes;
        }
        export interface EnvironmentService {
            environment?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            service?: Service;
        }
        export interface ErrorResponse {
            /**
             * example:
             * An error occurred
             */
            message?: string; // ^[\S]([\S\s]|[[:punct:]])*$
            /**
             * example:
             * 123e4567-e89b-12d3-a456-426655440000
             */
            errorId?: string; // ^[a-zA-Z0-9_-]*$
            meta?: {
                [name: string]: any;
            };
        }
        export interface EventAPIProduct {
            createdTime?: CommonTimestampInteger; // int64
            updatedTime?: CommonTimestampInteger; // int64
            createdBy?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            changedBy?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            id: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            virtualBrokerId?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            description?: CommonDescription; // ^[\s\S]*$
            /**
             * example:
             * IoT Sensor API
             */
            name: string; // ^[\s\S]*$
            published?: boolean;
            publishedTime?: CommonTimestampInteger; // int64
            serverUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            /**
             * example:
             * mqtt
             */
            serverProtocol?: string; // ^[a-zA-z0-9\-\.]*$
            summary?: CommonDescription; // ^[\s\S]*$
            unpublishedTime?: CommonTimestampInteger; // int64
            version?: CommonVersion; // ^[_\-\S\.]*$
            /**
             * example:
             * 3
             */
            numberOfEvents?: number; // int64
            websiteUrl?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            restUrlJson?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            restUrlYaml?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            type?: string; // ^[\s\S]*$
        }
        export type EventAPIProductList = EventAPIProduct[];
        export interface History {
            /**
             * example:
             * Update product "Product 1"
             */
            title?: string; // .*
            /**
             * example:
             * PATCH
             */
            operation?: "PATCH" | "POST" | "PUT" | "DELETE";
            /**
             * UNIX timestamp when auditable event occurred
             * example:
             * 1610714525243
             */
            at?: number;
            user?: string; // .*
            /**
             * the request URI
             */
            requestURI?: string; // .*
            requestBody?: {
                [name: string]: any;
            } | String2MB /* ^[\s\S]*$ */ ;
            /**
             * example:
             * 200
             */
            responseCode?: number; // int64
        }
        export interface ImporterConfiguration {
            importerType?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            /**
             * an array of ids that an importer will apply to the issues against theexternal system
             */
            filter?: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            attributeMap?: {
                name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
                attributes?: Attributes;
            }[];
        }
        export interface ImporterInfo {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            description?: CommonDescription; // ^[\s\S]*$
            attributeMapDescription?: CommonDescription; // ^[\s\S]*$
            filterDescription?: CommonDescription; // ^[\s\S]*$
        }
        export interface Job {
            id: string;
            nextRunAt?: string; // date-time
            lastRunAt?: string; // date-time
            lastFinishedAt?: string; // date-time
            result?: {
            } | string | boolean | number | number | any[];
            status?: "pending" | "finished";
            name: string;
            instanceName?: string;
            app?: AppResponse;
        }
        /**
         * meta information of an object. Will be returned by some resources. Can be set when patching or creating an object. Auto generated if not set.
         */
        export interface Meta {
            version?: CommonVersion; // ^[_\-\S\.]*$
            /**
             * The date and time the object was last modified
             */
            readonly lastModified?: number;
            lastModifiedBy?: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            /**
             * The date and time the object was last modified
             */
            readonly created?: number;
            createdBy?: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            stage?: MetaEntityStage;
            derivedFrom?: MetaEntityReference;
            attributes?: Attributes;
        }
        export interface MetaEntityReference {
            /**
             * example:
             * {name}
             */
            readonly name?: string; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            displayName?: CommonDisplayNameReadOnly; // ^[\/\sa-z.A-z0-9_-]*$
            revision?: SemVerReadOnly; // ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
        }
        /**
         * The lifecycle stage of the entity - from draft to released to deprecated to retired. New entities default to 'released' stage if the stage is omitted. Entitites in 'draft' stage can not be referenced by other entities. Entities can transition from 'draft' to 'released' by providing the new stage in an update and once 'released' can be referenced by other entities. Once 'released' an entity can not go back to 'draft' stage. 'released' entities can be 'depcrecated' which means existing references are still valid however new referenceds to this entity can not be created. 'deprecated' stage can be moved back to 'released' stage. An entity in 'deprecated' stagecan be moved to 'retired' which means all references to this entity will be removed. 'once' retired the stage of the entity can no longer be changed.
         */
        export type MetaEntityStage = "draft" | "released" | "deprecated" | "retired";
        export interface MsgVpnAclProfile {
            aclProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            clientConnectDefaultAction: ACLAction;
            publishTopicDefaultAction: ACLAction;
            subscribeTopicDefaultAction: ACLAction;
            clientConnectExceptions?: MsgVpnAclProfileClientConnectException[];
            publishExceptions?: MsgVpnAclProfilePublishException[];
            subscribeExceptions?: MsgVpnAclProfileSubscribeException[];
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnAclProfileClientConnectException {
            clientConnectExceptionAddress: string; // ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(3[0-2]|[1-2][0-9]|[0-9]))$
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnAclProfilePublishException {
            publishTopicException: CommonTopic; // ^[a-zA-Z0-9][\S]*[^\/]$
            publishTopicExceptionSyntax: TopicSyntax;
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnAclProfileSubscribeException {
            subscribeTopicException: CommonTopic; // ^[a-zA-Z0-9][\S]*[^\/]$
            subscribeTopicExceptionSyntax: TopicSyntax;
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnAttributes {
            authenticationClientCertEnabled: string; // ^[\s\S]*$
            authenticationBasicEnabled: string; // ^[\s\S]*$
        }
        export interface MsgVpnAuthorizationGroup {
            authorizationGroupName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            aclProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            clientProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            enabled: boolean;
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnClientProfile {
            clientProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            allowGuaranteedMsgSendEnabled: boolean;
            allowTransactedSessionsEnabled: boolean;
            allowGuaranteedMsgReceiveEnabled: boolean;
            allowGuaranteedEndpointCreateEnabled: boolean;
            compressionEnabled: boolean;
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnClientUsername {
            clientUsername: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            aclProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            clientProfileName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            password: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            enabled: boolean;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnMqttSession {
            mqttSessionClientId: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            enabled: boolean;
            mqttSessionVirtualRouter: "primary" | "backup";
            queueMaxTtl?: number;
            queueMaxMsgSpoolUsage?: number;
            queueRespectTtlEnabled?: boolean;
            owner?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        /**
         * example:
         * API-GW-EU:AWS:1
         */
        export type MsgVpnName = string; // ^[^*^?]*$
        export interface MsgVpnQueue {
            queueName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            ingressEnabled: boolean;
            egressEnabled: boolean;
            owner: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            permission: "no-access" | "read-only";
            accessType: "exclusive" | "non-exclusive";
            maxTtl?: number;
            maxMsgSpoolUsage?: number;
            respectTtlEnabled?: boolean;
            queueSubscriptions: MsgVpnQueueSubscription[];
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnQueueSubscription {
            subscriptionTopic: CommonTopic; // ^[a-zA-Z0-9][\S]*[^\/]$
            attributes?: Attributes;
            tags?: Tags;
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
        }
        export interface MsgVpnRestDeliveryPoint {
            restDeliveryPointName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            enabled: boolean;
            restConsumers: MsgVpnRestDeliveryPointRestConsumer[];
            queueBindings: MsgVpnRestDeliveryPointQueueBinding[];
            queues: MsgVpnQueue[];
            environments: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            attributes?: Attributes;
            tags?: Tags;
        }
        export interface MsgVpnRestDeliveryPointQueueBinding {
            postRequestTarget: string;
            queueBindingName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            attributes?: Attributes;
            tags?: Tags;
        }
        export interface MsgVpnRestDeliveryPointRestConsumer {
            restConsumerName: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            remotePort?: number;
            remoteHost?: string; // [a-zA-Z0-9-\.]*
            tlsEnabled?: boolean;
            enabled: boolean;
            authenticationScheme?: MsgVpnRestDeliveryPointRestConsumerAuthenticationScheme;
            authenticationHttpBasicUsername?: string;
            authenticationHttpBasicPassword?: string;
            authenticationHttpHeaderName?: string;
            authenticationHttpHeaderValue?: string;
            httpMethod?: MsgVpnRestDeliveryPointRestConsumerHttpMethod;
            maxPostWaitTime?: number;
            outgoingConnectionCount?: number;
            retryDelay?: number;
            trustedCNs?: MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName[];
            attributes?: Attributes;
            tags?: Tags;
        }
        export type MsgVpnRestDeliveryPointRestConsumerAuthenticationScheme = "none" | "http-basic" | "http-header";
        export type MsgVpnRestDeliveryPointRestConsumerHttpMethod = "post" | "put";
        export interface MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName {
            tlsTrustedCommonName: string;
            attributes?: Attributes;
            tags?: Tags;
        }
        export interface Organization {
            [name: string]: any;
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            sempV2Authentication?: SempV2Authentication;
            "cloud-token"?: string /* ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$ */  | CloudToken;
            integrations?: OrganizationIntegrations;
        }
        export interface OrganizationImporter {
        }
        export interface OrganizationIntegrations {
            importers?: OrganizationImporter[];
            notifications?: OrganizationNotifier;
        }
        export interface OrganizationNotifier {
            baseUrl: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            authentication: BasicAuthentication | APIKeyAuthentication | BearerTokenAuthentication;
        }
        export interface OrganizationResponse {
            [name: string]: any;
            status?: OrganizationStatus;
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            sempV2Authentication?: SempV2Authentication;
            "cloud-token"?: string /* ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$ */  | CloudToken;
            integrations?: OrganizationIntegrations;
        }
        export interface OrganizationStatus {
            cloudConnectivity?: boolean;
            eventPortalConnectivity?: boolean;
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
                [name: string]: ChannelPermission;
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
                [name: string]: ChannelPermission;
            }[];
        }
        export interface Protocol {
            name: "amqp" | "amqps" | "http" | "https" | "jms" | "secure-jms" | "mqtt" | "secure-mqtt" | "ws-mqtt" | "wss-mqtt" | "ws" | "wss" | "smf" | "smfs" | "compressed-smf";
            version?: CommonVersion; // ^[_\-\S\.]*$
        }
        export interface QueueStatus {
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            consumerCount?: number;
            messagesQueued?: number;
            messagesQueuedMB?: number;
        }
        export interface Secret {
            consumerKey: string; // ^[a-zA-Z0-9_-]*$
            consumerSecret?: string; // ^[a-zA-Z0-9_-]*$
        }
        /**
         * a version number in semver (Semantic Versioning) format
         * example:
         * 1.0.1
         */
        export type SemVer = string; // ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
        /**
         * a version number in semver (Semantic Versioning) format
         * example:
         * 1.0.1
         */
        export type SemVerReadOnly = string; // ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$
        /**
         * Specifies how requests to the SEMPv2 Management API are authenticated, defaults to BasicAuth. If APIKey is specified the username returned in the Services/Environments response is used as API Key.
         */
        export interface SempV2Authentication {
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
            apiKeyName?: string; // ^[a-zA-Z0-9_-]*$
        }
        /**
         * provides information about a service in the Solace Cloud account.
         */
        export interface Service {
            type?: string; // ^[\s\S]*$
            timestamp?: CommonTimestampInteger; // int64
            userId?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            serviceId?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            infrastructureId?: CommonSolaceCloudObjectId; // ^[a-zA-Z0-9]*$
            name?: string; // ^[\s\S]*$
            msgVpnName?: MsgVpnName; // ^[^*^?]*$
            datacenterId?: string; // ^[\s\S]*$
            datacenterProvider?: string; // ^[\s\S]*$
            serviceTypeId?: string; // ^[\s\S]*$
            serviceClassId?: string; // ^[\s\S]*$
            adminState?: string; // ^[\s\S]*$
            adminProgress?: string; // ^[\s\S]*$
            created?: CommonTimestampInteger; // int64
            creationState?: string; // ^[\s\S]*$
            /**
             * The protocols supported by this service
             */
            messagingProtocols?: Endpoint[];
            msgVpnAttributes?: MsgVpnAttributes;
            locked?: boolean;
            messagingStorage?: number; // int64
            serviceStage?: string; // ^[\s\S]*$
            servicePackageId?: string; // ^[\s\S]*$
            serviceClassDisplayedAttributes?: ServiceClassDisplayedAttributes;
            accountingLimits?: AccountingLimit[];
        }
        export interface ServiceClassDisplayedAttributes {
            "High Availability": string; // ^[\s\S]*$
            "Network Speed": string; // ^[\s\S]*$
            Storage: string; // ^[\s\S]*$
            "Message Broker Tenancy": string; // ^[\s\S]*$
            Queues: string; // ^[\s\S]*$
            Clients: string; // ^[\s\S]*$
            "Network Usage": string; // ^[\s\S]*$
        }
        /**
         * example:
         * asyncapi: 2.0.0
         *   info:
         *     title: Hello world application
         *     version: '0.1.0'
         *   channels:
         *     hello:
         *       publish:
         *         message:
         *           payload:
         *             type: string
         * 
         */
        export type String2MB = string; // ^[\s\S]*$
        export interface SuccessResponse {
            /**
             * example:
             * Submission successful
             */
            message?: string; // ^[\S]([\S\s]|[[:punct:]])*$
            /**
             * example:
             * 123e4567-e89b-12d3-a456-426655440000
             */
            id?: string; // ^[a-zA-Z0-9_-]*$
        }
        /**
         * A tag on an entity
         */
        export type Tag = any; // ^.*$
        /**
         * Set of tags
         */
        export type Tags = Tag /* ^.*$ */ [];
        /**
         * A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface Team {
            displayName: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            name: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface TeamPatch {
            displayName?: CommonDisplayName; // ^[\/\sa-z.A-z0-9_-]*$
            attributes?: Attributes;
        }
        export interface Threshold {
            type: string; // ^[\s\S]*$
            value: string; // ^[\s\S]*$
        }
        export type TopicSyntax = "smf" | "mqtt";
        /**
         * example:
         * 1.1.0
         */
        export type Version = string; // ^[ |\S]*$
        export interface WebHook {
            uri: string; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            name?: CommonName; // ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$
            /**
             * environments that this webhook serves, if absent webhook will be used for all environments
             */
            environments?: CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            method: "POST" | "PUT";
            mode?: "parallel" | "serial";
            authentication?: WebHookAuth;
            tlsOptions?: WebHookTLSOptions;
        }
        export type WebHookAuth = WebHookBasicAuth | WebHookHeaderAuth;
        export interface WebHookBasicAuth {
            authMethod?: "Basic";
            username: CommonUserName; // ^[.a-zA-Z0-9@_-]*$
            password: string; // ^[\S]*$
        }
        /**
         * A HTTP header used for authentication
         */
        export interface WebHookHeaderAuth {
            authMethod?: "Header";
            headerName: string; // ^[\s\S]*$
            headerValue: string; // ^[\s\S]*$
        }
        /**
         * Name and display name attribute of a webhook
         */
        export type WebHookNameList = WebHookNames[];
        /**
         * Name and display name attribute of a webhook
         */
        export interface WebHookNames {
            uri?: CommonURL; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            name?: string; // ^.*$
        }
        export interface WebHookStatus {
            uri?: string; // ^https?:\/\/[A-Za-z\.:0-9\-]*.*$
            name?: string; // ^.*$
            /**
             * indicates if the webhook is up and running
             * example:
             * true
             */
            up?: boolean;
            /**
             * description if the webhook is down, otherwise empty string
             */
            failureReason?: string; // .*
            /**
             * time of last failure (seconds from epoch)
             */
            lastFailureTime?: number;
            messagesQueued?: number;
            messagesQueuedMB?: number;
        }
        /**
         * TLS options required to support older PS+ brokers.
         */
        export interface WebHookTLSOptions {
            /**
             * The Trusted Common Names for the REST Consumer are used by encrypted transports to verify the name in the certificate presented by the remote REST consumer. They must include the common name of the remote REST consumer's server certificate.
             */
            tlsTrustedCommonNames?: string[];
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
    namespace About {
        namespace Responses {
            export type $200 = Components.Schemas.About;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApi {
        export type RequestBody = Components.Schemas.String2MB; // ^[\s\S]*$
        namespace Responses {
            export interface $201 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApiAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApiMetaAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApiProduct {
        export type RequestBody = Components.Schemas.APIProduct;
        namespace Responses {
            export type $201 = Components.Schemas.APIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApiProductAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateApiProductMetaAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateDerivedApiProduct {
        export type RequestBody = Components.Schemas.EntityDeriveRequest;
        namespace Responses {
            export type $201 = Components.Schemas.APIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateDeveloper {
        export type RequestBody = Components.Schemas.Developer;
        namespace Responses {
            export type $201 = Components.Schemas.Developer;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateDeveloperApp {
        export type RequestBody = Components.Schemas.App;
        namespace Responses {
            export type $201 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateDeveloperAppAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateDeveloperAppWebHook {
        export type RequestBody = Components.Schemas.WebHook;
        namespace Responses {
            export type $201 = Components.Schemas.WebHook;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateEnvironment {
        export type RequestBody = Components.Schemas.Environment;
        namespace Responses {
            export type $201 = Components.Schemas.Environment;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateImporterJob {
        export type RequestBody = Components.Schemas.ImporterConfiguration;
        namespace Responses {
            export type $201 = Components.Schemas.ImporterConfiguration;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $201 = Components.Schemas.OrganizationResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Responses.Conflict;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateTeam {
        export type RequestBody = Components.Schemas.Team;
        namespace Responses {
            export type $201 = Components.Schemas.Team;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateTeamApp {
        export type RequestBody = Components.Schemas.App;
        namespace Responses {
            export type $201 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateTeamAppAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace CreateTeamAppWebHook {
        export type RequestBody = Components.Schemas.WebHook;
        namespace Responses {
            export type $201 = Components.Schemas.WebHook;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApi {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApiAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApiMetaAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApiProduct {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApiProductAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteApiProductMetaAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteDeveloper {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteDeveloperApp {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteDeveloperAppAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteDeveloperAppWebHook {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteEnvironment {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteImporterJob {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteOrganization {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteTeam {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteTeamApp {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteTeamAppAttribute {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace DeleteTeamAppWebHook {
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAllImporterTypes {
        namespace Responses {
            export type $200 = Components.Schemas.ImporterInfo[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAllImporters {
        namespace Responses {
            export type $200 = Components.Schemas.ImporterConfiguration[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApi {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml" | "application/zip";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiInfo {
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiMetaAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiProduct {
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiProductApiSpecification {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml" | "application/zip";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiProductAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiProductMetaAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiProductRevision {
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiReferencedByAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiRevision {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml" | "application/zip";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiRevisionAPIProductReferences {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApiVersionInfo {
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponseGeneric;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAppApiSpecification {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml" | "application/zip";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAppConfigSet {
        namespace Responses {
            export type $200 = Components.Schemas.AppConfigSet;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAppConfigSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.ConfigSnapshot;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetAppStatus {
        namespace Responses {
            export type $200 = Components.Schemas.AppConnectionStatus;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetDeveloper {
        namespace Responses {
            export type $200 = Components.Schemas.Developer;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetDeveloperApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetDeveloperAppAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetDeveloperAppWebHook {
        namespace Responses {
            export type $200 = Components.Schemas.WebHook;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetEPApplicationDomain {
        namespace Responses {
            export type $200 = Components.Schemas.ApplicationDomain;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetEnvironment {
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetEnvironmentReferencedByAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetEventAPIProduct {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetEventAPIProductAsyncAPI {
        namespace Parameters {
            export type Format = "application/json" | "application/x-yaml" | "application/zip";
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
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetImporterJob {
        namespace Responses {
            export type $200 = Components.Schemas.ImporterConfiguration;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.OrganizationResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetTeam {
        namespace Responses {
            export type $200 = Components.Schemas.Team;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetTeamApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetTeamAppAttribute {
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetTeamAppWebHook {
        namespace Responses {
            export type $200 = Components.Schemas.WebHook;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace GetToken {
        namespace Responses {
            export type $200 = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace Healthcheck {
        namespace Responses {
            export interface $200 {
                status?: "ok" | "failure";
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export interface $503 {
                status?: string; // ^[\S]*$
                error?: {
                    /**
                     * example:
                     * NO_DB_CONNECTION
                     */
                    message?: string; // ^[\S\s]*$
                }[];
                details?: {
                    /**
                     * example:
                     * NO_DB_CONNECTION
                     */
                    message?: string; // ^[\S\s]*$
                }[];
            }
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ImportApi {
        export type RequestBody = Components.Schemas.APIImport;
        namespace Responses {
            export interface $201 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApiProductApis {
        namespace Responses {
            export type $200 = Components.Schemas.CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApiProductRevisions {
        namespace Responses {
            export type $200 = Components.Schemas.SemVer /* ^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$ */ [];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApiProducts {
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApiRevisions {
        namespace Responses {
            export type $200 = Components.Schemas.CommonVersion /* ^[_\-\S\.]*$ */ [];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApis {
        namespace Responses {
            export type $200 = Components.Schemas.APIList | Components.Schemas.APISummaryList | Components.Schemas.APIInfoList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListAppApiSpecifications {
        namespace Responses {
            export type $200 = Components.Schemas.CommonName /* ^[a-zA-Z0-9_\-]*(@[ |\S]*)?$ */ [];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListAppConfigSetSnapshots {
        namespace Responses {
            export type $200 = number[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListAppConfigSets {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNameList[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListAppReferencesToAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListApps {
        namespace Responses {
            export type $200 = Components.Schemas.AppListItem[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListDerivedApiProducts {
        namespace Responses {
            export type $200 = Components.Schemas.CommonEntityNames[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListDeveloperAppWebHooks {
        namespace Responses {
            export type $200 = Components.Schemas.WebHookNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
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
            export type $200 = Components.Schemas.AppResponse[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListDevelopers {
        namespace Responses {
            export type $200 = Components.Schemas.Developer[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListEPApplicationDomains {
        namespace Responses {
            export type $200 = Components.Schemas.ApplicationDomainList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
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
            export type $200 = Components.Schemas.EnvironmentListItem[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListEventAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProductList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListHistory {
        namespace Responses {
            export type $200 = Components.Schemas.History[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListJobs {
        namespace Parameters {
            export type Status = "all" | "pending" | "finished";
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Job[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListOrganizations {
        namespace Responses {
            export type $200 = Components.Schemas.Organization[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListServices {
        namespace Responses {
            export type $200 = Components.Schemas.Service[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListTeamAppWebHooks {
        namespace Responses {
            export type $200 = Components.Schemas.WebHookNameList;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
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
            export type $200 = Components.Schemas.AppResponse[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace ListTeams {
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace RunImporterJob {
        namespace Responses {
            export type $200 = Components.Schemas.SuccessResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApi {
        export type RequestBody = Components.Schemas.String2MB; // ^[\s\S]*$
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiInfo {
        export type RequestBody = Components.Schemas.APIInfoPatch;
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiMetaAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiProduct {
        export type RequestBody = Components.Schemas.APIProductPatch;
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiProductAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiProductMetaAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateApiVersionInfo {
        export type RequestBody = Components.Schemas.APIVersionInfoPatch;
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateDeveloper {
        export type RequestBody = Components.Schemas.DeveloperPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Developer;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateDeveloperApp {
        export type RequestBody = Components.Schemas.AppPatch;
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateDeveloperAppAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateDeveloperAppWebHook {
        export type RequestBody = Components.Schemas.WebHook;
        namespace Responses {
            export type $200 = Components.Schemas.WebHook;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateEnvironment {
        export type RequestBody = Components.Schemas.EnvironmentPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Environment;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateImporterJob {
        export type RequestBody = Components.Schemas.ImporterConfiguration;
        namespace Responses {
            export type $200 = Components.Schemas.ImporterConfiguration;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $200 = Components.Schemas.OrganizationResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateTeam {
        export type RequestBody = Components.Schemas.TeamPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Team;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateTeamApp {
        export type RequestBody = Components.Schemas.AppPatch;
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateTeamAppAttribute {
        export type RequestBody = Components.Schemas.AttributeValue; // ^.*$
        namespace Responses {
            export type $200 = Components.Schemas.AttributeValue; // ^.*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $409 = Components.Schemas.ErrorResponse;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateTeamAppWebHook {
        export type RequestBody = Components.Schemas.WebHook;
        namespace Responses {
            export type $200 = Components.Schemas.WebHook;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $412 = Components.Responses.PreconditionFailed;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Schemas.ErrorResponse;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
    namespace UpdateToken {
        export type RequestBody = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
        namespace Responses {
            export type $201 = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $403 = Components.Responses.Forbidden;
            export type $404 = Components.Responses.NotFound;
            export type $406 = Components.Responses.NotAcceptable;
            export type $415 = Components.Responses.UnsupportedMediaType;
            export type $429 = Components.Responses.TooManyRequests;
            export type $500 = Components.Responses.InternalServerError;
            export type $503 = Components.Responses.ServiceUnavailable;
            export type $504 = Components.Responses.GatewayTimeout;
        }
    }
}
