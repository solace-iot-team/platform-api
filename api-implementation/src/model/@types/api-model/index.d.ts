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
        namespace AttributeName {
            export type AttributeName = string;
        }
        namespace CompanyId {
            export type CompanyId = string;
        }
        namespace DeveloperUsername {
            export type DeveloperUsername = string;
        }
        namespace PageNumber {
            export type PageNumber = number; // int32
        }
        namespace PageSize {
            export type PageSize = number; // int32
        }
    }
    namespace Schemas {
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
         * The API Product Schema
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
        }
        /**
         * The API Product Schema
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
        export interface Developer {
            email: string;
            firstName: string;
            lastName: string;
            userName: string;
            attributes?: {
                name: string;
                value: string;
            }[];
        }
        export interface DeveloperPatch {
            email?: string;
            firstName?: string;
            lastName?: string;
            userName?: string;
            attributes?: {
                name: string;
                value: string;
            }[];
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
    }
}
declare namespace Paths {
    namespace ApiDomains {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.APIDomain[];
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
    namespace ApiDomains$ApiDomainName {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.APIDomain;
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
    namespace ApiProducts {
        namespace Get {
            namespace Responses {
                export type $200 = /* The API Product Schema */ Components.Schemas.APIProduct[];
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
            export type RequestBody = /* The API Product Schema */ Components.Schemas.APIProduct;
            namespace Responses {
                export type $201 = /* The API Product Schema */ Components.Schemas.APIProduct;
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
    namespace ApiProducts$ApiProductName {
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
                export type $200 = /* The API Product Schema */ Components.Schemas.APIProduct;
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
            export type RequestBody = /* The API Product Schema */ Components.Schemas.APIProductPatch;
            namespace Responses {
                export type $200 = /* The API Product Schema */ Components.Schemas.APIProduct;
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
    namespace Apis {
        namespace Get {
            namespace Parameters {
                export type ApiDomainName = string;
            }
            export interface QueryParameters {
                apiDomainName?: Parameters.ApiDomainName;
            }
            namespace Responses {
                export type $200 = Components.Schemas.APIListItem[];
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
    namespace Apis$ApiName {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.API[];
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
    namespace Apis$ApiNameSpec {
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
    namespace Developers {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.Developer[];
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
            export type RequestBody = Components.Schemas.Developer;
            namespace Responses {
                export type $201 = Components.Schemas.Developer;
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
    namespace Developers$DeveloperUsername {
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
                export type $200 = Components.Schemas.Developer;
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
            export type RequestBody = Components.Schemas.DeveloperPatch;
            namespace Responses {
                export type $200 = /* The API Product Schema */ Components.Schemas.APIProduct;
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
