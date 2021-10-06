declare namespace Components {
    namespace Parameters {
        namespace ApiListFormat {
            export type Format = "compact" | "summary" | "extended";
        }
        namespace ApiName {
            export type ApiName = string; // [a-zA-Z0-9_-]{4,188}
        }
        namespace ApiProductName {
            export type ApiProductName = string; // [a-zA-Z0-9_-]{4,188}
        }
        namespace AppName {
            export type AppName = string; // [a-zA-Z0-9_-]{4,188}
        }
        namespace DeveloperUsername {
            export type DeveloperUsername = Schemas.CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
        }
        namespace EnvName {
            export type EnvName = string; // [a-zA-Z0-9_-]{2,188}
        }
        namespace EventApiProductId {
            export type EventApiProductId = string; // [a-z0-9]{4,32}
        }
        namespace Organization {
            export type OrganizationName = string; // [a-zA-Z0-9_-]{4,188}
        }
        namespace PageNumber {
            export type PageNumber = number; // int32
        }
        namespace PageSize {
            export type PageSize = number; // int32
        }
        namespace SortDirection {
            export type SortDirection = "asc" | "desc";
        }
        namespace SortFieldName {
            export type SortFieldName = string; // [a-zA-Z0-9_-]{2,512}
        }
        namespace TeamName {
            export type TeamName = string; // [a-zA-Z0-9_-]{4,188}
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
            id?: string; // [a-zA-Z0-9_-]{0,64}
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
            sourceId?: string; // [a-zA-Z0-9_-]{0,64}
            createdTime: CommonTimestampInteger; // int64
            updatedTime?: CommonTimestampInteger; // int64
            createdBy: CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
            description: CommonDescription; // ^[\s\S]{0,4096}$
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            summary: CommonDescription; // ^[\s\S]{0,4096}$
            version: CommonVersion; // [_\-\S\.]{0,100}
            apiParameters?: APIParameter[];
            /**
             * any metadata as returned by the external System (if applicable)
             */
            sourceMetadata?: {
                [name: string]: any;
            };
        }
        export type APIInfoList = APIInfo[];
        export type APIList = CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
        export interface APIParameter {
            /**
             * name of the parameter as defined in the AsyncAPI Spec
             * example:
             * model
             */
            name: string; // .{0,512}
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
            enum?: string /* .{0,512} */ [];
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
            apis: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            /**
             * manual or auto. If manual, credetials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            attributes: Attributes;
            description?: CommonDescription; // ^[\s\S]{0,4096}$
            displayName: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            /**
             * An array of environment names in an organization. Requests to environments not listed are rejected.
             */
            environments?: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            /**
             * An array of Publish API resources to be bundled in the API Product.
             */
            pubResources: CommonTopic /* ^[a-zA-Z0-9][\S]{1,247}[^\/]$ */ [];
            /**
             * An array of Subscribe API resources to be bundled in the API Product.
             */
            subResources: CommonTopic /* ^[a-zA-Z0-9][\S]{1,247}[^\/]$ */ [];
            protocols?: Protocol[];
            clientOptions?: ClientOptions;
        }
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
            apis?: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            /**
             * manual or auto. If manual, credentials will only be activated on manual approval
             */
            approvalType?: "manual" | "auto";
            attributes?: Attributes;
            description?: CommonDescription; // ^[\s\S]{0,4096}$
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            /**
             * A list of environment name in an organization. Requests to environments not listed are rejected.
             */
            environments?: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            pubResources?: CommonTopic /* ^[a-zA-Z0-9][\S]{1,247}[^\/]$ */ [];
            /**
             * A comma separated list of Publish API resources to be bundled in the API Product.
             */
            subResources?: CommonTopic /* ^[a-zA-Z0-9][\S]{1,247}[^\/]$ */ [];
            protocols?: Protocol[];
            clientOptions?: ClientOptions;
        }
        export interface APISummary {
            name?: CommonName; // [a-zA-Z0-9_-]{2,188}
            description?: CommonDescription; // ^[\s\S]{0,4096}$
            source?: "EventAPIProduct" | "Upload" | "EventPortalLink";
            createdBy?: CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
        }
        export type APISummaryList = APISummary[];
        export interface About {
            /**
             * indicates if the Connector is running in Proxy Mode. In this mode all published Event API Products in Event Portal are automatically available as APIs in the connector
             * example:
             * true
             */
            APIS_PROXY_MODE?: boolean;
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
            id: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            value: string; // [\s\S]{1,256}
            unit: string; // [\s\S]{1,256}
            thresholds: Threshold[];
        }
        /**
         * An app associated with an owner (developer, team etc). Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface App {
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            /**
             * the internal name of the app used within the connector. This name is auto generated by default. Warning - should ONLY be set if a naming convention for broker objects must be imposed. This value can not be updated.
             */
            internalName?: string; // [a-zA-Z0-9_]{4,32}
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            attributes?: Attributes;
            webHooks?: WebHook[];
            credentials: Credentials;
        }
        export interface AppEnvironment {
            name?: CommonName; // [a-zA-Z0-9_-]{2,188}
            messagingProtocols?: Endpoint[];
            permissions?: Permissions;
        }
        export interface AppListItem {
            name?: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            appType?: "developer" | "team";
            /**
             * example:
             * Developer-1
             */
            ownerId?: string; // .{4,188}
            apiProducts?: string /* [a-zA-Z0-9_-]{4,188} */ [];
            status?: AppStatus;
        }
        /**
         * Used for PATCH operation. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use
         */
        export interface AppPatch {
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            apiProducts?: string /* [a-zA-Z0-9_-]{4,188} */ [];
            attributes?: Attributes;
            webHooks?: WebHook[];
            credentials?: Credentials;
            status?: AppStatus;
        }
        /**
         * App Response Object - includes protocol binding information and app premissions. An app associated with a developer. Associates the app with an API product, and auto-generates an API credentials for the app to use.
         */
        export interface AppResponse {
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            /**
             * the internal name of the app used within the connector. This name is auto generated by default. Warning - should ONLY be set if a naming convention for broker objects must be imposed. This value can not be updated.
             */
            internalName?: string; // [a-zA-Z0-9_]{4,32}
            /**
             * A setting, in milliseconds, for the lifetime of the consumer key that will be  generated for the developer app. The default value, -1, indicates an infinite validity period. Once set, the expiration can't be updated.
             */
            expiresIn?: number; // int64
            apiProducts: string /* [a-zA-Z0-9_-]{4,188} */ [];
            attributes?: Attributes;
            clientInformation?: ClientInformation[];
            webHooks?: WebHook[];
            credentials: Credentials;
            environments?: AppEnvironment[];
            status?: AppStatus;
        }
        export type AppStatus = "approved" | "pending";
        /**
         * Arbitrary name/value pairs associated with an API product, team, developer or app.
         */
        export type Attributes = {
            /**
             * Attribute name, access is a special value as it governs access control to the product.
             * example:
             * access
             */
            name: string; // [a-zA-Z0-9_-]{2,1024}
            /**
             * Value of the attribute.
             * example:
             * public, private, or internal
             */
            value: string; // [a-zA-Z0-9_\-\s,]{2,1024}
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
            permissions: CommonTopic /* ^[a-zA-Z0-9][\S]{1,247}[^\/]$ */ [];
            channelId?: string; // [\s\S]{1,2048}
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
            name?: string; // .{2,250}
            apiProduct?: CommonName; // [a-zA-Z0-9_-]{2,188}
            /**
             * access mode for the queue
             * example:
             * exclusive
             */
            accessType?: "exclusive" | "non-exclusive";
        }
        export interface ClientOptions {
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
         * Vivamus eget vulputate ipsum, vel ornare nulla. Aenean hendrerit, magna id mollis elementum, enim purus convallis arcu, eget eleifend metus ipsum vitae felis. Cras condimentum feugiat fringilla. Etiam ligula dui, malesuada ut finibus imperdiet, bibendum tristique velit. Phasellus consectetur venenatis augue ac ornare. Ut vel sem in lorem fermentum porttitor. Pellentesque eget fermentum enim. Suspendisse risus elit, imperdiet facilisis volutpat in, congue ac ligula. Aenean mollis sagittis finibus. Vestibulum viverra metus magna, ut volutpat dui imperdiet ultricies.
         * 
         */
        export type CommonDescription = string; // ^[\s\S]{0,4096}$
        /**
         * Friendly name of an object for display in UIs, Developer Portals. Can be changed after object creation
         * example:
         * A new IoT API / v2.0
         */
        export type CommonDisplayName = string; // [\/\sa-z.A-z0-9_-]{1,256}
        /**
         * The internal name of an object. Characters you can use in the name are restricted to: A-Z0-9._-. Once the object is created the internal name can not be changed
         * example:
         * {name}
         */
        export type CommonName = string; // [a-zA-Z0-9_-]{2,188}
        /**
         * id as used/issued by the back end apis, alphanumeric characters only
         * example:
         * n8kg4fjka9r
         */
        export type CommonSolaceCloudObjectId = string; // [a-zA-Z0-9]{2,32}
        /**
         * example:
         * 1620311683577
         */
        export type CommonTimestampInteger = number; // int64
        /**
         * example:
         * deliver/*​/enroute/v1/45*​/-75*​/vehicle4*​/>
         */
        export type CommonTopic = string; // ^[a-zA-Z0-9][\S]{1,247}[^\/]$
        /**
         * example:
         * https://solace.cloud/api/v0/eventPortal/apiProducts/abc123/asyncApi.json
         */
        export type CommonURL = string; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
        /**
         * example:
         * tom
         */
        export type CommonUserName = string; // [.a-zA-Z0-9@-_]{1,64}
        /**
         * example:
         * 3.1.1-alpha
         */
        export type CommonVersion = string; // [_\-\S\.]{0,100}
        /**
         * Credentials object associated with an app
         */
        export interface Credentials {
            expiresAt: number; // int64
            issuedAt?: CommonTimestampInteger; // int64
            secret?: Secret;
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
            token?: string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
        }
        /**
         * A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface Developer {
            email: string; // email .*@.*\.[a-zA-Z]{1,63}
            firstName: string; // [a-zA-Z0-9'-\s]{2,128}
            lastName: string; // [a-zA-Z0-9'-\s]{2,128}
            userName: CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile for a developer. After the developer is created, they can register an app and receive API credentials
         */
        export interface DeveloperPatch {
            email?: string; // email .*@.*\.[a-zA-Z]{1,63}
            firstName?: string; // [a-zA-Z0-9'-\s]{4,188}
            lastName?: string; // [a-zA-Z0-9'-\s]{4,188}
            attributes?: Attributes;
        }
        export interface Endpoint {
            protocol?: Protocol;
            /**
             * The protocol transport
             * example:
             * TCP
             */
            transport?: string; // [A-Za-z0-9\/\.]
            secure?: "yes" | "no";
            compressed?: "yes" | "no";
            uri?: CommonURL; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
        }
        /**
         * an environment
         */
        export interface Environment {
            [name: string]: any;
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            description: CommonDescription; // ^[\s\S]{0,4096}$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string; // [a-zA-Z0-9_-]{4,64}
            exposedProtocols: Protocol[];
        }
        /**
         * an environment
         */
        export interface EnvironmentListItem {
            [name: string]: any;
            msgVpnName?: MsgVpnName; // ^[^*^?]{0,256}$
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            description: CommonDescription; // ^[\s\S]{0,4096}$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId: string; // [a-zA-Z0-9_-]{4,64}
            exposedProtocols: Protocol[];
        }
        /**
         * used for PATCH operation, an environment
         */
        export interface EnvironmentPatch {
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            description?: CommonDescription; // ^[\s\S]{0,4096}$
            /**
             * example:
             * xm7dc2dfas4
             */
            serviceId?: string; // [a-zA-Z0-9]{1,64}
            /**
             * The protocols that can be exposed for use with APIs
             */
            exposedProtocols?: Protocol[];
        }
        /**
         * an environment
         */
        export interface EnvironmentResponse {
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            description: CommonDescription; // ^[\s\S]{0,4096}$
            /**
             * The protocols that can be exposed for use with APIs
             */
            exposedProtocols?: Protocol[];
            /**
             * All of the protocols that the broker service exposes
             */
            messagingProtocols?: Endpoint[];
            serviceId: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            /**
             * example:
             * DEV-GW
             */
            serviceName?: string; // [\s\S]{1,256}
            msgVpnName?: MsgVpnName; // ^[^*^?]{0,256}$
            datacenterId?: string; // [\s\S]{1,256}
            datacenterProvider?: string; // [\s\S]{1,256}
            serviceTypeId?: string; // [\s\S]{1,256}
            serviceClassId?: string; // [\s\S]{1,256}
            creationState?: string; // [\s\S]{1,256}
            serviceClassDisplayedAttributes?: ServiceClassDisplayedAttributes;
        }
        export interface ErrorResponse {
            /**
             * example:
             * An error occurred
             */
            message?: string; // ([A-Za-z,;'"\s]+[.?!])*
            /**
             * example:
             * 123e4567-e89b-12d3-a456-426655440000
             */
            errorId?: string; // [a-zA-Z0-9_-]{0,64}
            meta?: {
                [name: string]: any;
            };
        }
        export interface EventAPIProduct {
            createdTime?: CommonTimestampInteger; // int64
            updatedTime?: CommonTimestampInteger; // int64
            createdBy?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            changedBy?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            id: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            virtualBrokerId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            description?: CommonDescription; // ^[\s\S]{0,4096}$
            /**
             * example:
             * IoT Sensor API
             */
            name: string; // [\s\S]{4,256}
            published?: boolean;
            publishedTime?: CommonTimestampInteger; // int64
            serverUrl?: CommonURL; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
            /**
             * example:
             * mqtt
             */
            serverProtocol?: string; // [a-zA-z0-9\-\.]{0,256}
            summary?: CommonDescription; // ^[\s\S]{0,4096}$
            unpublishedTime?: CommonTimestampInteger; // int64
            version?: CommonVersion; // [_\-\S\.]{0,100}
            /**
             * example:
             * 3
             */
            numberOfEvents?: number; // int64
            websiteUrl?: CommonURL; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
            restUrlJson?: CommonURL; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
            restUrlYaml?: CommonURL; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,2083}$
            type?: string; // [\s\S]{0,1024}
        }
        export type EventAPIProductList = EventAPIProduct[];
        export interface History {
            /**
             * example:
             * Update product "Product 1"
             */
            title?: string; // .{1,1024}
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
            at?: number; // unit64
            user?: CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
            /**
             * the request URI
             */
            requestURI?: string; // .{1,1024}
            requestBody?: string; // [\s\S]*
            /**
             * example:
             * 200
             */
            responseCode?: number; // int64
        }
        export interface MsgVpnAttributes {
            authenticationClientCertEnabled: string; // [\s\S]{1,256}
            authenticationBasicEnabled: string; // [\s\S]{1,256}
        }
        /**
         * example:
         * API-GW-EU:AWS:1
         */
        export type MsgVpnName = string; // ^[^*^?]{0,256}$
        export interface Organization {
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            sempV2Authentication?: SempV2Authentication;
            "cloud-token"?: string /* ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$ */  | CloudToken;
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
            version?: CommonVersion; // [_\-\S\.]{0,100}
        }
        export interface Secret {
            consumerKey: string; // [a-zA-Z0-9_-]{8,32}
            consumerSecret?: string; // [a-zA-Z0-9_-]{8,16}
        }
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
            apiKeyName?: string; // [a-zA-Z0-9_-]{4,512}
        }
        /**
         * provides information about a service in the Solace Cloud account.
         */
        export interface Service {
            type?: string; // [\s\S]{1,256}
            timestamp?: CommonTimestampInteger; // int64
            userId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            serviceId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            infrastructureId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            name?: string; // [\s\S]{1,256}
            msgVpnName?: MsgVpnName; // ^[^*^?]{0,256}$
            datacenterId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            datacenterProvider?: string; // [\s\S]{1,256}
            serviceTypeId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            serviceClassId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            adminState?: string; // [\s\S]{1,256}
            adminProgress?: string; // [\s\S]{1,256}
            created?: CommonTimestampInteger; // int64
            creationState?: string; // [\s\S]{1,256}
            /**
             * The protocols supported by this service
             */
            messagingProtocols?: Endpoint[];
            msgVpnAttributes?: MsgVpnAttributes;
            locked?: boolean;
            messagingStorage?: number; // int64
            serviceStage?: string; // [\s\S]{1,256}
            servicePackageId?: CommonSolaceCloudObjectId; // [a-zA-Z0-9]{2,32}
            serviceClassDisplayedAttributes?: ServiceClassDisplayedAttributes;
            accountingLimits?: AccountingLimit[];
        }
        export interface ServiceClassDisplayedAttributes {
            "High Availability": string; // [\s\S]{1,256}
            "Network Speed": string; // [\s\S]{1,256}
            Storage: string; // [\s\S]{1,256}
            "Message Broker Tenancy": string; // [\s\S]{1,256}
            Queues: string; // [\s\S]{1,256}
            Clients: string; // [\s\S]{1,256}
            "Network Usage": string; // [\s\S]{1,256}
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
        export type String2MB = string; // [\s\S]*
        /**
         * A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface Team {
            displayName: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            name: CommonName; // [a-zA-Z0-9_-]{2,188}
            attributes?: Attributes;
        }
        /**
         * Used for PATCH operation, A profile of a team. After the team is created, an app can be registered and API credentials are created
         */
        export interface TeamPatch {
            displayName?: CommonDisplayName; // [\/\sa-z.A-z0-9_-]{1,256}
            attributes?: Attributes;
        }
        export interface Threshold {
            type: string; // [\s\S]{1,256}
            value: string; // [\s\S]{1,256}
        }
        export interface WebHook {
            uri: string; // https?:\/\/[A-Za-z\.:0-9\-]*.{0,200}$
            /**
             * environments that this webhook serves, if absent webhook will be used for all environments
             */
            environments?: CommonName /* [a-zA-Z0-9_-]{2,188} */ [];
            method: "POST" | "PUT";
            mode?: "parallel" | "serial";
            authentication?: WebHookAuth;
        }
        export type WebHookAuth = WebHookBasicAuth | WebHookHeaderAuth;
        export interface WebHookBasicAuth {
            authMethod?: "Basic";
            username: CommonUserName; // [.a-zA-Z0-9@-_]{1,64}
            password: string; // [\S]{8,256}
        }
        /**
         * A HTTP header used for authentication
         */
        export interface WebHookHeaderAuth {
            authMethod?: "Header";
            headerName: string; // [\s\S]{1,512}
            headerValue: string; // [\s\S]{1,16384}
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
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateApi {
        export type RequestBody = Components.Schemas.String2MB; // [\s\S]*
        namespace Responses {
            export interface $201 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateApiProduct {
        export type RequestBody = Components.Schemas.APIProduct;
        namespace Responses {
            export type $201 = Components.Schemas.APIProduct;
            export type $422 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateDeveloper {
        export type RequestBody = Components.Schemas.Developer;
        namespace Responses {
            export type $201 = Components.Schemas.Developer;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateDeveloperApp {
        export type RequestBody = Components.Schemas.App;
        namespace Responses {
            export type $201 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateEnvironment {
        export type RequestBody = Components.Schemas.Environment;
        namespace Responses {
            export type $201 = Components.Schemas.Environment;
            export type $422 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $201 = Components.Schemas.Organization;
            export type $400 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateTeam {
        export type RequestBody = Components.Schemas.Team;
        namespace Responses {
            export type $201 = Components.Schemas.Team;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace CreateTeamApp {
        export type RequestBody = Components.Schemas.App;
        namespace Responses {
            export type $201 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteApi {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteApiProduct {
        namespace Responses {
            export interface $204 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteDeveloper {
        namespace Responses {
            export interface $204 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteDeveloperApp {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteEnvironment {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteOrganization {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteTeam {
        namespace Responses {
            export interface $204 {
            }
            export type $409 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace DeleteTeamApp {
        namespace Responses {
            export interface $204 {
            }
            export type Default = Components.Schemas.ErrorResponse;
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
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApiInfo {
        namespace Responses {
            export type $200 = Components.Schemas.APIInfo;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApiProduct {
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type Default = Components.Schemas.ErrorResponse;
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
                [name: string]: any;
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetDeveloper {
        namespace Responses {
            export type $200 = Components.Schemas.Developer;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetDeveloperApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEnvironment {
        namespace Responses {
            export type $200 = Components.Schemas.EnvironmentResponse;
            export type $409 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetEventAPIProduct {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProduct;
            export type Default = Components.Schemas.ErrorResponse;
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
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetOrganization {
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetTeam {
        namespace Responses {
            export type $200 = Components.Schemas.Team;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetTeamApp {
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace GetToken {
        namespace Responses {
            export type $200 = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace Healthcheck {
        namespace Responses {
            export interface $200 {
                status?: "ok" | "failure";
            }
            export interface $503 {
                status?: string; // [\S]{1,128}
                error?: {
                    /**
                     * example:
                     * NO_DB_CONNECTION
                     */
                    message?: string; // [\S\s]{0,1024}
                }[];
                details?: {
                    /**
                     * example:
                     * NO_DB_CONNECTION
                     */
                    message?: string; // [\S\s]{0,1024}
                }[];
            }
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ImportApi {
        export type RequestBody = Components.Schemas.APIImport;
        namespace Responses {
            export interface $201 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApiProducts {
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct[];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApis {
        namespace Responses {
            export type $200 = Components.Schemas.APIList | Components.Schemas.APISummaryList | Components.Schemas.APIInfoList;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListAppApiSpecifications {
        namespace Responses {
            export type $200 = string /* [a-zA-Z0-9_-]{4,188} */ [];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListApps {
        namespace Responses {
            export type $200 = Components.Schemas.AppListItem[];
            export type Default = Components.Schemas.ErrorResponse;
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
            export type $200 = Components.Schemas.App[];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListDevelopers {
        namespace Responses {
            export type $200 = Components.Schemas.Developer[];
            export type Default = Components.Schemas.ErrorResponse;
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
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListEventAPIProducts {
        namespace Responses {
            export type $200 = Components.Schemas.EventAPIProductList;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListHistory {
        namespace Responses {
            export type $200 = Components.Schemas.History[];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListOrganizations {
        namespace Responses {
            export type $200 = Components.Schemas.Organization[];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListServices {
        namespace Responses {
            export type $200 = Components.Schemas.Service[];
            export type Default = Components.Schemas.ErrorResponse;
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
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace ListTeams {
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateApi {
        export type RequestBody = Components.Schemas.String2MB; // [\s\S]*
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
            export type $400 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateApiProduct {
        export type RequestBody = Components.Schemas.APIProductPatch;
        namespace Responses {
            export type $200 = Components.Schemas.APIProduct;
            export type $422 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateDeveloper {
        export type RequestBody = Components.Schemas.DeveloperPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Developer;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateDeveloperApp {
        export type RequestBody = Components.Schemas.AppPatch;
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateEnvironment {
        export type RequestBody = Components.Schemas.EnvironmentPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Environment;
            export type $422 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateOrganization {
        export type RequestBody = Components.Schemas.Organization;
        namespace Responses {
            export type $200 = Components.Schemas.Organization;
            export type $400 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateTeam {
        export type RequestBody = Components.Schemas.TeamPatch;
        namespace Responses {
            export type $200 = Components.Schemas.Team;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateTeamApp {
        export type RequestBody = Components.Schemas.AppPatch;
        namespace Responses {
            export type $200 = Components.Schemas.AppResponse;
            export type $400 = Components.Schemas.ErrorResponse;
            export type $422 = Components.Schemas.ErrorResponse;
            export type $500 = Components.Schemas.ErrorResponse;
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
    namespace UpdateToken {
        export type RequestBody = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
        namespace Responses {
            export type $201 = string; // ^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$
            export type Default = Components.Schemas.ErrorResponse;
        }
    }
}
