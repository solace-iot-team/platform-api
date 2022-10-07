declare namespace AsyncapiCom {
    namespace Bindings {
        namespace Http {
            /**
             * Operation Schema
             * This object contains information about the operation representation in HTTP.
             * example:
             * {
             *   "type": "response",
             *   "query": {
             *     "type": "object",
             *     "required": [
             *       "companyId"
             *     ],
             *     "properties": {
             *       "companyId": {
             *         "type": "number",
             *         "minimum": 1,
             *         "description": "The Id of the company."
             *       }
             *     },
             *     "additionalProperties": false
             *   },
             *   "bindingVersion": "0.1.0"
             * }
             * {
             *   "type": "request",
             *   "method": "GET",
             *   "query": {
             *     "type": "object",
             *     "required": [
             *       "companyId"
             *     ],
             *     "properties": {
             *       "companyId": {
             *         "type": "number",
             *         "minimum": 1,
             *         "description": "The Id of the company."
             *       }
             *     },
             *     "additionalProperties": false
             *   },
             *   "bindingVersion": "0.1.0"
             * }
             */
            export type OperationJson = /**
             * Operation Schema
             * This object contains information about the operation representation in HTTP.
             * example:
             * {
             *   "type": "response",
             *   "query": {
             *     "type": "object",
             *     "required": [
             *       "companyId"
             *     ],
             *     "properties": {
             *       "companyId": {
             *         "type": "number",
             *         "minimum": 1,
             *         "description": "The Id of the company."
             *       }
             *     },
             *     "additionalProperties": false
             *   },
             *   "bindingVersion": "0.1.0"
             * }
             * {
             *   "type": "request",
             *   "method": "GET",
             *   "query": {
             *     "type": "object",
             *     "required": [
             *       "companyId"
             *     ],
             *     "properties": {
             *       "companyId": {
             *         "type": "number",
             *         "minimum": 1,
             *         "description": "The Id of the company."
             *       }
             *     },
             *     "additionalProperties": false
             *   },
             *   "bindingVersion": "0.1.0"
             * }
             */
            {
                /**
                 * Required. Type of operation. Its value MUST be either 'request' or 'response'.
                 */
                type: "request" | "response";
                /**
                 * When 'type' is 'request', this is the HTTP method, otherwise it MUST be ignored. Its value MUST be one of 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT', and 'TRACE'.
                 */
                method: "GET" | "PUT" | "POST" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE";
                query?: /* Core schema meta-schema */ RawGithubusercontentCom.Asyncapi.AsyncapiNode.V277.Schemas.$200Json.Definitions.Schema;
                /**
                 * The version of this binding. If omitted, 'latest' MUST be assumed.
                 */
                bindingVersion?: "0.1.0";
                [pattern: string]: /* Any property starting with x- is valid. */ RawGithubusercontentCom.Asyncapi.AsyncapiNode.V277.Schemas.$200Json.Definitions.SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
            } | void;
        }
        namespace Mqtt {
            /**
             * Operation Schema
             * This object contains information about the operation representation in MQTT.
             * example:
             * {
             *   "qos": 2,
             *   "retain": true,
             *   "bindingVersion": "0.1.0"
             * }
             */
            export interface OperationJson {
                /**
                 * Defines the Quality of Service (QoS) levels for the message flow between client and server. Its value MUST be either 0 (At most once delivery), 1 (At least once delivery), or 2 (Exactly once delivery).
                 */
                qos?: number;
                /**
                 * Whether the broker should retain the message or not.
                 */
                retain?: boolean;
                /**
                 * The version of this binding. If omitted, 'latest' MUST be assumed.
                 */
                bindingVersion?: "0.1.0";
                [pattern: string]: /* Any property starting with x- is valid. */ RawGithubusercontentCom.Asyncapi.AsyncapiNode.V277.Schemas.$200Json.Definitions.SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
            }
            /**
             * Server Schema
             * This object contains information about the server representation in MQTT.
             * example:
             * {
             *   "clientId": "guest",
             *   "cleanSession": true,
             *   "lastWill": {
             *     "topic": "/last-wills",
             *     "qos": 2,
             *     "message": "Guest gone offline.",
             *     "retain": false
             *   },
             *   "keepAlive": 60,
             *   "bindingVersion": "0.1.0"
             * }
             */
            export interface ServerJson {
                /**
                 * The client identifier.
                 */
                clientId?: string;
                /**
                 * Whether to create a persistent connection or not. When 'false', the connection will be persistent.
                 */
                cleanSession?: boolean;
                /**
                 * Last Will and Testament configuration.
                 */
                lastWill?: {
                    /**
                     * The topic where the Last Will and Testament message will be sent.
                     */
                    topic?: string;
                    /**
                     * Defines how hard the broker/client will try to ensure that the Last Will and Testament message is received. Its value MUST be either 0, 1 or 2.
                     */
                    qos?: 0 | 1 | 2;
                    /**
                     * Last Will message.
                     */
                    message?: string;
                    /**
                     * Whether the broker should retain the Last Will and Testament message or not.
                     */
                    retain?: boolean;
                };
                /**
                 * Interval in seconds of the longest period of time the broker and the client can endure without sending a message.
                 */
                keepAlive?: number;
                /**
                 * The version of this binding. If omitted, 'latest' MUST be assumed.
                 */
                bindingVersion?: "0.1.0";
                [pattern: string]: /* Any property starting with x- is valid. */ RawGithubusercontentCom.Asyncapi.AsyncapiNode.V277.Schemas.$200Json.Definitions.SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
            }
        }
        namespace Solace {
            /**
             * Operation Schema
             * This object contains information about the operation representation in Solace.
             * example:
             * {
             *   "bindingVersion": "0.2.0",
             *   "destinations": [
             *     {
             *       "destinationType": "queue",
             *       "queue": {
             *         "name": "sampleQueue",
             *         "topicSubscriptions": [
             *           "samples/*"
             *         ],
             *         "accessType": "nonexclusive"
             *       }
             *     },
             *     {
             *       "destinationType": "topic",
             *       "topicSubscriptions": [
             *         "samples/*"
             *       ]
             *     }
             *   ]
             * }
             */
            export interface OperationJson {
                /**
                 * The list of Solace destinations referenced in the operation.
                 */
                destinations?: ({
                    /**
                     * If the type is queue, then the subscriber can bind to the queue. The queue subscribes to the given topicSubscriptions. If no topicSubscriptions are provied, the queue will subscribe to the topic as represented by the channel name.
                     */
                    destinationType?: "queue";
                    queue?: {
                        /**
                         * The name of the queue
                         */
                        name?: string;
                        /**
                         * The list of topics that the queue subscribes to.
                         */
                        topicSubscriptions?: string[];
                        accessType?: "exclusive" | "nonexclusive";
                    };
                    deliveryMode?: "direct" | "persistent";
                } | {
                    /**
                     * If the type is topic, then the subscriber subscribes to the given topicSubscriptions. If no topicSubscriptions are provided, the client will subscribe to the topic as represented by the channel name.
                     */
                    destinationType?: "topic";
                    /**
                     * The list of topics that the client subscribes to.
                     */
                    topicSubscriptions?: string[];
                    deliveryMode?: "direct" | "persistent";
                })[];
                /**
                 * The version of this binding. If omitted, "latest" MUST be assumed.
                 */
                bindingVersion?: "0.2.0";
            }
            /**
             * Server Schema
             * This object contains server connection information about the Solace broker. This object contains additional connectivity information not possible to represent within the core AsyncAPI specification.
             * example:
             * {
             *   "msgVpn": "ProdVPN",
             *   "bindingVersion": "0.2.0"
             * }
             */
            export interface ServerJson {
                /**
                 * The name of the Virtual Private Network to connect to on the Solace broker.
                 */
                msgVpn?: string;
                /**
                 * The version of this binding.
                 */
                bindingVersion?: "0.2.0";
                [pattern: string]: /* Any property starting with x- is valid. */ RawGithubusercontentCom.Asyncapi.AsyncapiNode.V277.Schemas.$200Json.Definitions.SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
            }
        }
    }
}
declare namespace JsonSchemaOrg {
    namespace Draft07 {
        /**
         * Core schema meta-schema
         */
        export type Schema = {
            $id?: string; // uri-reference
            $schema?: string; // uri
            $ref?: string; // uri-reference
            $comment?: string;
            title?: string;
            description?: string;
            default?: any;
            readOnly?: boolean;
            writeOnly?: boolean;
            examples?: any[];
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: number;
            minimum?: number;
            exclusiveMinimum?: number;
            maxLength?: Schema.Definitions.NonNegativeInteger;
            minLength?: Schema.Definitions.NonNegativeIntegerDefault0;
            pattern?: string; // regex
            additionalItems?: /* Core schema meta-schema */ Schema;
            items?: /* Core schema meta-schema */ Schema | Schema.Definitions.SchemaArray;
            maxItems?: Schema.Definitions.NonNegativeInteger;
            minItems?: Schema.Definitions.NonNegativeIntegerDefault0;
            uniqueItems?: boolean;
            contains?: /* Core schema meta-schema */ Schema;
            maxProperties?: Schema.Definitions.NonNegativeInteger;
            minProperties?: Schema.Definitions.NonNegativeIntegerDefault0;
            required?: Schema.Definitions.StringArray;
            additionalProperties?: /* Core schema meta-schema */ Schema;
            definitions?: {
                [name: string]: /* Core schema meta-schema */ Schema;
            };
            properties?: {
                [name: string]: /* Core schema meta-schema */ Schema;
            };
            patternProperties?: {
                [name: string]: /* Core schema meta-schema */ Schema;
            };
            dependencies?: {
                [name: string]: /* Core schema meta-schema */ Schema | Schema.Definitions.StringArray;
            };
            propertyNames?: /* Core schema meta-schema */ Schema;
            const?: any;
            enum?: [
                any,
                ...any[]
            ];
            type?: Schema.Definitions.SimpleTypes | [
                Schema.Definitions.SimpleTypes,
                ...Schema.Definitions.SimpleTypes[]
            ];
            format?: string;
            contentMediaType?: string;
            contentEncoding?: string;
            if?: /* Core schema meta-schema */ Schema;
            then?: /* Core schema meta-schema */ Schema;
            else?: /* Core schema meta-schema */ Schema;
            allOf?: Schema.Definitions.SchemaArray;
            anyOf?: Schema.Definitions.SchemaArray;
            oneOf?: Schema.Definitions.SchemaArray;
            not?: /* Core schema meta-schema */ Schema;
        } | boolean;
        namespace Schema {
            namespace Definitions {
                export type NonNegativeInteger = number;
                export type NonNegativeIntegerDefault0 = number;
                export type SchemaArray = [
                    /* Core schema meta-schema */ Schema,
                    .../* Core schema meta-schema */ Schema[]
                ];
                export type SimpleTypes = "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";
                export type StringArray = string[];
            }
        }
    }
}
declare namespace RawGithubusercontentCom {
    namespace Asyncapi {
        namespace AsyncapiNode {
            namespace V277 {
                namespace Schemas {
                    /**
                     * AsyncAPI 2.0.0 schema.
                     */
                    export interface $200Json {
                        /**
                         * The AsyncAPI specification version of this document.
                         */
                        asyncapi: "2.0.0";
                        /**
                         * A unique id representing the application.
                         */
                        id?: string; // uri
                        info: /* General information about the API. */ $200Json.Definitions.Info;
                        servers?: {
                            [name: string]: /* An object representing a Server. */ $200Json.Definitions.Server;
                        };
                        defaultContentType?: string;
                        channels: $200Json.Definitions.Channels;
                        components?: /* An object to hold a set of reusable objects for different aspects of the AsyncAPI Specification. */ $200Json.Definitions.Components;
                        tags?: $200Json.Definitions.Tag[];
                        externalDocs?: /* information about external documentation */ $200Json.Definitions.ExternalDocs;
                        [pattern: string]: /* Any property starting with x- is valid. */ $200Json.Definitions.SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                    }
                    namespace $200Json {
                        namespace Definitions {
                            export interface APIKeyHTTPSecurityScheme {
                                type: "httpApiKey";
                                name: string;
                                in: "header" | "query" | "cookie";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface ApiKey {
                                type: "apiKey";
                                in: "user" | "password";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface AsymmetricEncryption {
                                type: "asymmetricEncryption";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface BearerHTTPSecurityScheme {
                                scheme: "bearer";
                                bearerFormat?: string;
                                type: "http";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface BindingsObject {
                                [name: string]: any;
                                http?: any;
                                ws?: any;
                                amqp?: any;
                                amqp1?: any;
                                mqtt?: any;
                                mqtt5?: any;
                                kafka?: any;
                                nats?: any;
                                jms?: any;
                                sns?: any;
                                sqs?: any;
                                stomp?: any;
                                redis?: any;
                            }
                            export interface ChannelItem {
                                $ref?: ReferenceObject /* uri-reference */;
                                parameters?: {
                                    [name: string]: Parameter;
                                };
                                /**
                                 * A description of the channel.
                                 */
                                description?: string;
                                publish?: Operation;
                                subscribe?: Operation;
                                deprecated?: boolean;
                                bindings?: BindingsObject;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Channels {
                                [name: string]: ChannelItem;
                            }
                            /**
                             * An object to hold a set of reusable objects for different aspects of the AsyncAPI Specification.
                             */
                            export interface Components {
                                schemas?: /* JSON objects describing schemas the API uses. */ Schemas;
                                messages?: /* JSON objects describing the messages being consumed and produced by the API. */ Messages;
                                securitySchemes?: {
                                    [pattern: string]: (Reference | SecurityScheme); /* Patterns: ^[\w\d\.\-_]+$ */
                                };
                                parameters?: /* JSON objects describing re-usable channel parameters. */ Parameters;
                                correlationIds?: {
                                    [pattern: string]: (Reference | CorrelationId); /* Patterns: ^[\w\d\.\-_]+$ */
                                };
                                operationTraits?: {
                                    [name: string]: OperationTrait;
                                };
                                messageTraits?: {
                                    [name: string]: MessageTrait;
                                };
                                serverBindings?: {
                                    [name: string]: BindingsObject;
                                };
                                channelBindings?: {
                                    [name: string]: BindingsObject;
                                };
                                operationBindings?: {
                                    [name: string]: BindingsObject;
                                };
                                messageBindings?: {
                                    [name: string]: BindingsObject;
                                };
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * Contact information for the owners of the API.
                             */
                            export interface Contact {
                                /**
                                 * The identifying name of the contact person/organization.
                                 */
                                name?: string;
                                /**
                                 * The URL pointing to the contact information.
                                 */
                                url?: string; // uri
                                /**
                                 * The email address of the contact person/organization.
                                 */
                                email?: string; // email
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface CorrelationId {
                                /**
                                 * A optional description of the correlation ID. GitHub Flavored Markdown is allowed.
                                 */
                                description?: string;
                                /**
                                 * A runtime expression that specifies the location of the correlation ID
                                 */
                                location: string; // ^\$message\.(header|payload)\#(\/(([^\/~])|(~[01]))*)*
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * information about external documentation
                             */
                            export interface ExternalDocs {
                                description?: string;
                                url: string; // uri
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export type HTTPSecurityScheme = NonBearerHTTPSecurityScheme | BearerHTTPSecurityScheme | APIKeyHTTPSecurityScheme;
                            /**
                             * General information about the API.
                             */
                            export interface Info {
                                /**
                                 * A unique and precise title of the API.
                                 */
                                title: string;
                                /**
                                 * A semantic version number of the API.
                                 */
                                version: string;
                                /**
                                 * A longer description of the API. Should be different from the title. CommonMark is allowed.
                                 */
                                description?: string;
                                /**
                                 * A URL to the Terms of Service for the API. MUST be in the format of a URL.
                                 */
                                termsOfService?: string; // uri
                                contact?: /* Contact information for the owners of the API. */ Contact;
                                license?: License;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface License {
                                /**
                                 * The name of the license type. It's encouraged to use an OSI compatible license.
                                 */
                                name: string;
                                /**
                                 * The URL pointing to the license.
                                 */
                                url?: string; // uri
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export type Message = Reference | ({
                                oneOf: Message[];
                            } | {
                                schemaFormat?: string;
                                contentType?: string;
                                /**
                                 * Core schema meta-schema
                                 */
                                headers?: {
                                    $ref?: string; // uri-reference
                                    [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                                };
                                payload?: any;
                                correlationId?: Reference | CorrelationId;
                                tags?: Tag[];
                                /**
                                 * A brief summary of the message.
                                 */
                                summary?: string;
                                /**
                                 * Name of the message.
                                 */
                                name?: string;
                                /**
                                 * A human-friendly title for the message.
                                 */
                                title?: string;
                                /**
                                 * A longer description of the message. CommonMark is allowed.
                                 */
                                description?: string;
                                externalDocs?: /* information about external documentation */ ExternalDocs;
                                deprecated?: boolean;
                                examples?: {
                                    headers?: {
                                        [key: string]: any;
                                    };
                                    payload?: any;
                                }[];
                                bindings?: BindingsObject;
                                traits?: (Reference | MessageTrait | [
                                    (Reference | MessageTrait)?,
                                    {
                                        [key: string]: any;
                                    }?,
                                    ...any[]
                                ])[];
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            });
                            export interface MessageTrait {
                                schemaFormat?: string;
                                contentType?: string;
                                headers?: Reference | /* Core schema meta-schema */ Schema;
                                correlationId?: Reference | CorrelationId;
                                tags?: Tag[];
                                /**
                                 * A brief summary of the message.
                                 */
                                summary?: string;
                                /**
                                 * Name of the message.
                                 */
                                name?: string;
                                /**
                                 * A human-friendly title for the message.
                                 */
                                title?: string;
                                /**
                                 * A longer description of the message. CommonMark is allowed.
                                 */
                                description?: string;
                                externalDocs?: /* information about external documentation */ ExternalDocs;
                                deprecated?: boolean;
                                examples?: {
                                    [key: string]: any;
                                }[];
                                bindings?: BindingsObject;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * JSON objects describing the messages being consumed and produced by the API.
                             */
                            export interface Messages {
                                [name: string]: Message;
                            }
                            export interface NonBearerHTTPSecurityScheme {
                                scheme: string;
                                description?: string;
                                type: "http";
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Oauth2Flow {
                                authorizationUrl?: string; // uri
                                tokenUrl?: string; // uri
                                refreshUrl?: string; // uri
                                scopes?: Oauth2Scopes;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Oauth2Flows {
                                type: "oauth2";
                                description?: string;
                                flows: {
                                    implicit?: void;
                                    password?: void;
                                    clientCredentials?: void;
                                    authorizationCode?: {
                                        authorizationUrl: string; // uri
                                        tokenUrl: string; // uri
                                        refreshUrl?: string; // uri
                                        scopes: Oauth2Scopes;
                                        [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                                    };
                                };
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Oauth2Scopes {
                                [name: string]: string;
                            }
                            export interface OpenIdConnect {
                                type: "openIdConnect";
                                description?: string;
                                openIdConnectUrl: string; // uri
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Operation {
                                traits?: (Reference | OperationTrait | [
                                    (Reference | OperationTrait)?,
                                    {
                                        [key: string]: any;
                                    }?,
                                    ...any[]
                                ])[];
                                summary?: string;
                                description?: string;
                                tags?: Tag[];
                                externalDocs?: /* information about external documentation */ ExternalDocs;
                                operationId?: string;
                                bindings?: BindingsObject;
                                message?: Message;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface OperationTrait {
                                summary?: string;
                                description?: string;
                                tags?: Tag[];
                                externalDocs?: /* information about external documentation */ ExternalDocs;
                                operationId?: string;
                                bindings?: BindingsObject;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Parameter {
                                /**
                                 * A brief description of the parameter. This could contain examples of use. GitHub Flavored Markdown is allowed.
                                 */
                                description?: string;
                                schema?: /* Core schema meta-schema */ Schema;
                                /**
                                 * A runtime expression that specifies the location of the parameter value
                                 */
                                location?: string; // ^\$message\.(header|payload)\#(\/(([^\/~])|(~[01]))*)*
                                $ref?: ReferenceObject /* uri-reference */;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * JSON objects describing re-usable channel parameters.
                             */
                            export interface Parameters {
                                [name: string]: Parameter;
                            }
                            export interface Reference {
                                $ref: ReferenceObject /* uri-reference */;
                            }
                            export type ReferenceObject = string; // uri-reference
                            /**
                             * Core schema meta-schema
                             */
                            export interface Schema {
                                $ref?: string; // uri-reference
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * JSON objects describing schemas the API uses.
                             */
                            export interface Schemas {
                                [name: string]: /* Core schema meta-schema */ Schema;
                            }
                            export interface SecurityRequirement {
                                [name: string]: string[];
                            }
                            export type SecurityScheme = UserPassword | ApiKey | X509 | SymmetricEncryption | AsymmetricEncryption | HTTPSecurityScheme | Oauth2Flows | OpenIdConnect;
                            /**
                             * An object representing a Server.
                             */
                            export interface Server {
                                url: string;
                                description?: string;
                                /**
                                 * The transfer protocol.
                                 */
                                protocol: string;
                                protocolVersion?: string;
                                variables?: ServerVariables;
                                security?: SecurityRequirement[];
                                bindings?: BindingsObject;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            /**
                             * An object representing a Server Variable for server URL template substitution.
                             */
                            export interface ServerVariable {
                                enum?: string[];
                                default?: string;
                                description?: string;
                                examples?: string[];
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface ServerVariables {
                                [name: string]: /* An object representing a Server Variable for server URL template substitution. */ ServerVariable;
                            }
                            /**
                             * Any property starting with x- is valid.
                             */
                            export interface SpecificationExtension {
                                [name: string]: any;
                            }
                            export interface SymmetricEncryption {
                                type: "symmetricEncryption";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface Tag {
                                name: string;
                                description?: string;
                                externalDocs?: /* information about external documentation */ ExternalDocs;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface UserPassword {
                                type: "userPassword";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                            export interface X509 {
                                type: "X509";
                                description?: string;
                                [pattern: string]: /* Any property starting with x- is valid. */ SpecificationExtension; /* Patterns: ^x-[\w\d\.\-\_]+$ */
                            }
                        }
                    }
                }
            }
        }
    }
}
