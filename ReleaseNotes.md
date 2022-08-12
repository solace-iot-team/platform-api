# Release Notes

## Version 0.7.0
* OpenAPI: 0.11.1
* API Management Connector Server: 0.7.0

### Features

* **feat-create-operations-test-mode**
  - Added a "test" mode for write operations which allows to test object creation and obtain validation results without data being persisted
  - Currenlty only exposed on `apis` resource so validation results for an AsyncAPI can be obtained without attempting to persist the document
* **feat-api-apiproducts-meta-attributes**
  - Added ability to set un-versioned attributes in the meta object of `apiProduct` and `apiInfo` resources
* **feat-ep.2.0-import-beta**
  - *This is a beta feature, subject to change and only partially tested*
  - Intitial Event Portal 2.0 (EP2.0) integration  (based on EP 2.0 beta REST APIs)
  - Imports shared and released "Event API Product Versions" from EP2.0  as `apiProducts` including their dependencies
  - Dependencies imported are Event APIs as `apis` and Gateway Messaging Services in Associated Modeled Event Mesh as `environments`.
  - "Event API Product Versions" in EP2.0 suitable for import must meet these criteria: marked as `shared`, in status `released`, latest version (highest SemVer).
  - `apiProducts` track the life cycle states of the Event API Product (EAPI-Product). Caution is advised when retiring prodcuts in EP2.0 as these changes are not reversible in the Connector. Best practice is to create a new, released version of the EAPI-Product before retiring a previous version.
  - Some changes to EAPI-Products do not result in a new version number - such as state change or addition/removal of environment associations. The connector tracks these changes as revisions and will increment the patch version of the SemVer. Therefore EAPI-Product version numbers MUST set the patch version to zero and never modify the patch version. EAPI Products that do not meet this requirement are not imported.
  - Imports from EP2.0 are configurable via a new management resource `importers`. There is currently one type of importer `EventPortalImporter`. It can be configured with a filter (list of application domain ids) and a list of attribute mapping (attributes that should be applied to an imported `apiProduct` for  a specific application domain id). Multiple importer jobs with different configurations cna be configured. An importer cna be triggered via the `importers/{impoerter_name}/run` resource.

* **refactor-provisioning-api-changes**
  - Broker provisioning is now executed in two distinct phases.
  - First phase creates an "Application Configuration Set" from the information available to the connector (APIs, API Products, Environments, Applications). This config set lists out the PS+ objects that should be created.
  - The second phase constructs a task set to execute against one or multiple PS+ services tracking additions and deletions and ensuring a consistent state is set up on the PS+ service or any changes are rolled back in case of failure.
  - A new read only resource `configSets` is available to obtain information about currently applied configSets and previous revisions.

### Fixes

* **fix-api-validation-error-reporting**
  - Improved error reporting, handling different detail of error messages returned by the asyncapi parser for different errors
* **fix-asyncapi-download-zip-schemas**
  - The ZIP file that is generated now only contains one file for each schema regardless if it is associated with one or multiple messages. The file names use the ids assigned in the schemas section of the AsyncAPI.
* **fix-context-runner-propagate-error-result**
  - return any errors caught as result from the context runner for better traceability of job errors
* **fix-scheduled-jobs-obtain-org-details-from-db**
  - Job ContextRunner looks up the org details when executing the job instead of relying on information stored in job data. This avoids usage of stale API tokens for Solace Cloud APIs
* **fix-solaceloud-facade-return-value**
  - returning the response of a client profile creation request for improved error reporting
* **fix-solace-cloudfacade-use-fetch-proxy**
  - cloud facade bypassed HTTP proxy, proxy settings are now taken into account


## Version 0.6.0
* OpenAPI: 0.10.0
* API Management Connector Server: 0.6.0

### Features
* **feat-asyncapi-include-solace-binding**
  - Include solace binding (msg vpn) in generated AsyncAPI server sections. Also adds message vpn into App response
* **feat-jobs-history**
  - Add a resource to retrieve all internal jobs in the connector (e.g. app re-provision triggered by upstream changes). Can fiter on job status
* **feat-attributes-resource**
  - added a resource to manage a single attribute associated with an object - provides save CRUD operations on the attributes array in the underlying document
  - this is available as a sub resource on `apiProducts`, `apis`, `team/apps` and `developer/apps` resources
* **feat-asyncapi-download-as-zip**
  - API Specifications can be requested as a ZIP file that contains the API spec as well as the JSON schemas of all messages as separate files

### Fixes
* **fix-apiinfo-include-version-from-meta**
  - When retrieving the extended list of APIs the version field is now set to the version defined in the meta object if present.
* **fix-apiinfo-asyncapi-parameters**
  - Fixed issue where API Parameters could not be extracted as the Async API contained invalid schema references. API Info now omits the parameters if the Async APi is invalid
* **fix-apis-list-extended-format-null-guard**
  - Handle cases gracefully when no meta object exists on the API Info
* **refact-broker-aclmanager-re-use-asyncapi-parsing**
  - Centralised Async APi parsing for many resources
  - Improved error handling and reporting when AsyncAPI parsing errors occur
* **fix-apiproduct-clientoptions-guaranteed-messaging-switch**
  - Added an explicit switch to enable guaranteed messaging. Previously the presence of `clientoptions.guaranteedMessaging` was used as a switch. Now there is an explicit flag on `clientOptions` that takes precedence to enable GM if set. If the flag is omitted the previous behaviour is preserved.
* **fix-apis-resource-inline-external-schemas**
  - Added fix to de-reference external resources such as schema definitions are inlined into the async api spec
  - This is to avoid errors if externally referenced resources (schemas) become unavailable temporarily or permantently
* **fix-apis-resources-race-condition**
  - Fixed an error returned by api info revisions resource that occurs when the call is being made concurrently with a PATCH to the API resource
* **fix-app-queue-owner-only-acccess**
  - changed queue permission to NO_ACCESS(only queue owner can access the queue)

## Version 0.5.1
* OpenAPI: 0.7.19
* API Management Connector Server: 0.5.1

### Fixes
* **fix-broker-provisioning-log-error**
  - added error logging into reprovision method to track root cause
* **fix-app-patch-set-expiry**
  - fixed issue where expiresAt was not calculated if full credentials were provided in request
* **fix-app-reprovisioning-queue-update**
  - fixed issue when a queue update was required due to change of credentials. 
  - The queue was not updated as ingress/egress were active. Now queue is disabled before update.

## Version 0.5.0
* OpenAPI: 0.7.19
* API Management Connector Server: 0.5.0

### Features
* **feat-app-queue-per-api**
  - The API Product now features a setting to scope the queue creation if guranteeed messaging is supported to either apiProduct (one queue per API Product) or api (one queue for each associated API)
  - Scope defaults to apiProduct if omitted
  - API change: added optional queueGranularity to API Product Guaranteed Messaging settings, with apiProduct (default)and api scopes for queues

### Fixes
* **fix-mongodb-reconnection-and-error-handling**
  - Improved reconnection logic on connection errors to MongoDB

## Version 0.4.0
* OpenAPI: 0.7.18
* API Management Connector Server: 0.4.0

### Features
* **feat-app-provision-on-upstream-change**
  - Changes to APIs (PATCH on `apis` resource) and API Products (PATCH on `apiProducts` resource) now trigger re-provisioning of all Apps referencing the changed object This ensures that the configuraiton on the Solace PS+ Service is consistent with the changes.
  - Changes are queued and executed sequentially
  - While an App re-provisioning job is pending or in flight all PATCH request to `developer/{developer_name}/apps` and `team/{team_name}/apps` are blocked and return a HTTP 412 error.
  - Job details are stored in the MongoDB database. Future enhancement will expose a resource to retrieve Job status.
* **feat-api-metadata-improvements**
  - The APIInfo (`apis/{api_name}/info`) resource now includes a `Meta` object with version, stage and created/modfied information. 
  - It also includes a `deprecated` marker and a comment to explain depreciation reason.
  - An API version can be marked deprecated by either PATCHing the API's info or by adding a tag `deprecated` (optionally including a description) in the root object of the Async API Document and updating (PATCH) the API resource with this new document.

### Fixes
* **fix-api-products-handling-accommodate-references-with-revisions**
  - Fixes and improvements to support referencing a specific version of an API for an API Product. 
* **fix-app-provisioning**
  - various fixes to reprovisioning logic - retrieve api and api products by revision reference via the api and apiProducts services, remove queues if a change in api product results in zero subscriptions on the queue(s),
* **fix-organization-service-refactor-delete-add-delay**
  - refactored/simplified org delete and added a delay before removing the DB in case any DB operations are in flight
* **fix-verbose-logging**
  - Removed or downgraded logging in multiple services
  - API Products, Persistence, Teams, Broker
* **fix-app-credentials-rotation**
  - Switched job scheduling to agenda.js to standardise job scheduling and avoid high-CPU utilisation of previous framework used
* **fix-add-uncaught-exception-handler**
  - Fix to avoid connector crashing on unhandled exceptions raised by asynchrnously inviked functions (applicable when running in development mode)
* **fix-runtime-dependencies**
  - Upgraded node.js version to 18.
  - Upgraded node.js mongodb API dependency
* **fix-apis-service-parse-asyncapi-await**
  - Code clean up

## Version 0.3.9
* OpenAPI: 0.7.15
* API Management Connector Server: 0.3.9

### Features
* **feat-app-credential-rotation**
  - Added feature to re-generate the app's secret when it expires.
  - The expiry time is calculated from the time the secret was issued at by adding the `expiresIn` element (number of seconds) of the app
  - If `expiresAt` is -1 or `expiresIn` is -1 the secret never expires
* **feat-api-products-lifecycle-tag**
  - Added a lifescycle stage to the `Meta` object in the API Product.
  - Ahe lifecycle stage of the entity - from draft to released to deprecated to retired. New entities default to 'released' stage if the stage is omitted. Entitites in 'draft' stage can not be referenced by other entities. Entities can transition from 'draft' to 'released' by providing the new stage in an update and once 'released' can be referenced by other entities. Once 'released' an entity can not go back to 'draft' stage. 'released' entities can be 'depcrecated' which means existing references are still valid however new referenceds to this entity can not be created. 'deprecated' stage can be moved back to 'released' stage. An entity in 'deprecated' stagec an be moved to 'retired' which means all references to this entity will be removed. 'once' retired the stage of the entity can no longer be changed.
* **feat-apiproducts-cloning**
  - Added ability to clone (derive) a new APi Product from an existing API Product - `/{organization_name}/apiProducts/{api_product_name}/derived`
  - The new API Product includes a reference to the original product.
  - The `derived` resource also provides a list of products derived from a given API Product

### Fixes
* **fix-regression-find-apiproducts-referencedbyapps-query**
  - Fixed issue when retrieving the apps associated with an API product (`GET /{organization_name}/apiProducts/{api_product_name}/apps`)where references to the API Product where not resolved if useing product level approval.
* **fix-apiproducts-mapping-fix-createdBy-mapping**
  - Fixed an issue which led to `createdBy` and `lastModifiedBy` of the APi Product's `Meta` object where not set from the POST or PATCH request to the `apiProducts` resource. 


## Version 0.3.8
* OpenAPI: 0.7.11
* API Management Connector Server: 0.3.8

### Features
* **feat-webhook-queues-message-expiry**
  - Changed defaults of queue provisioned for webhook - if client options are present, queue is provisioned with the guaranteed messaging options, if not set default config is applied - TTL 120s, max space 50 MB providing an adequate buffer in case of temporary slow performance of  webhook
* **feat-provision-amqp-queue**
  - Now also provision API Product specific queues if AMQP/AMQPS is an exposed protocol of the API Product.
* **feat-app-client-profile**
  - A set of client profiles with different privileges are now managed by the connector and assigned to apps based on their Guaranteed Messaging configuration and the protocols exposed by the associated API Products.
  - If the MQTT protocol is exposed also manages an app specific MQTT Session as this governs the resource allocation e.g. max queue size.
* **feat-asyncapi-servers-add-mqtt-binding**
  - For apps with MQTT protocol access the server sectionin the Async API contains a specific MQTT binding with the MQTT clientId to be used when connecting.
* **feat-asyncapi-operations-add-http-binding**
  - For apps with HTTP protocol the generated Async API now contains HTTP bindings for operations, specifying the HTTP method to be used.

### Fixes
* **fix-asyncapigenerator-resolve-apiproducts-by-name**
  - Fixed incorrect resolution of api product references which led to missing binding sections in generated Async APIs
* **fix-organization-patch-create-collections-index**
  - Adds capability to provision missing MongoDB objects (collections, indexes) when an Organization is PATCHed/updated. Useful for migrating existing tenant schemas if required.

## Version 0.3.6
* OpenAPI: 0.7.11
* API Management Connector Server: 0.3.6

## Version 0.3.7
* OpenAPI: 0.7.11
* API Management Connector Server: 0.3.7

### Fixes
* **fix-apiproducts-create-default-meta-versioninfo-if-missing**
  - Fixed an issue with existing API Products that were missing version information. In these cases an update (PATCH) of the APi Product failed. Updates are now possible - the minimum semVer that can be assigned in the update is `1.1.1`.
* **fix-versioninig-add-guards-previous-version-missing**
  - Fixed issues where missing version information in an API Product caused PATCH operations to result in null pointer exceptions

## Version 0.3.6
* OpenAPI: 0.7.11
* API Management Connector Server: 0.3.6

### Features
* **feat-app-webhooks-resource**
  - Added a sub resource to teamd and developer apps to manage webhooks
  - Ability to list all webhooks associated with an app
  - Ability to manage webhooks individually via POST/GET/PATCH/DELETE
* **feat-app-credentials-enhancements**
  - issuedAt and expiresAt attributes are now auto calculated
  - expiresAt can still be set for backwards compatibility
  - App's expiresIn attribute is used to calcualte expiresAt when the credentials are generated internally or set via the API
  - It is now possible to regenearate the client secret when an app is updated (PATCH) by only supplying the current consumer key and omitting the secret in the PATCH request
  - Allowed an app's expiresIn attriute to be updated and added logic to recalculate expiresAt when expiresIn is updated

### Fixes
* **fix-apis-imported-increment-version-number-patch**
  - Fixed an issue with updating APIs where the version number of an API was not incremented if originally imported from Event Portal 
* **fix-resolve-app-apiproduct-references**
  - Fixed issues where API Product references in apps were not resolved correctly
* **fix-provisioning-only-approved-api-products**
  - Fixed an issue which led to resources for pending API Products associated with an app to be provisioned on the broker. Now only resources for approved products are provisioned.
* **fix-dependencies**
  - Updated project dependencies addressing issues identified by security scan

## Version 0.3.5
* OpenAPI: 0.7.6
* API Management Connector Server: 0.3.5

### Features
* **feat-cors-add-etag-exposed-header**
  - Expose eTag headers in preflight CORS requests, simplifies usage of API directly from browser
* **feat-notification-events**
  - Change events to entities are now emitted from an org to a specified endpoint (webhook).
  - This is enabled and configured on the organization level
  - The events that are emitted are described using AsyncAPI, the specifications can be accessed as static files on the Connector
  - Provider API specification describes all the events that are emitted: http://[connector_host]:[connector_port]/notification-api/producer/api.yml
  - Consumer events are grouped into different APIs by the `tags` used in the Connerctor's OpenAPI spec, base URL:  `http://[connector_host]:[connector_port]/notification-api/consumer`
  - Available APIs - apis.yml, administration.yml, apiProducts.yml, app.yml, developers.yml, environments.yml, management.yml, teams.yml  
* **feat-notification-hub**
  - Added automatic configuration script for an organization
  - Template provided sets up a "Notification Hub" org for managing access to the events emitted by the "Notification Events" feature
  - It uploads the Notification AsyncAPIs and configures a producer application. The apps connection details can be used to configure the notification event webhook in an org.
  - It also uploads the consumer AsycnAPIs so access to notifications can be managed via the standard API Management functionalit of the Connector.

* **feat-app-product-level-approval**
  - Introduced approval status on each API Product associated with an app.
  - Apps still retain an overall approval status that will be set tp pending if any associated API product requires approval
  - An API product can be associated in two ways: as before by simply using the API Product `name` or as a reference that includes the `name` and an approval status for the API Product
  - If an API Product is associated via a reference, the resources and permissions associated with the API product will only be provisioned on the refenrece is in status approved.

* **feat-api-products-versioning-number-support**
  - API Products can now include version information
  - Introduces a `meta` element with version number, creation and modification date, users who initiated actions
  - Client can manually add a version number in Semantic Versioning (SemVer) format. Provided version number must be an increment of the previous version
  - Connector maintains an internal revision number. 
  - If the revision is set manually the SemVer is returned in any reponse to the `apiProducts` resource, otherwise the internal revision is formatted as a SemVer.
  - Added resources to retrieve all revision identifiers of an API Product and a specific revision state.
  - Apps **only**  reference the **latest** version of an API Product

* **feat-api-versioning-support**
  - APIs now keep a revision log.
  - The version information is extracted from the Async APIs `info.version` element, which is deinfed as a `string` data type in the Async API specification
  - Three different formats for the version number are supported: SemVer, integer and free form
  - The connector maintains an internal revision number (integer) for all APIs
  - For SemVer values the version in the API supplied to the `PATCH` operation must be higher than the previous version
  - For integer version numbers the version provided in the API must be higher than the previous version.
  - For free form (any string) versions the version provided in the API must NOT be equal to the previosu version
  - In any Async API definition obtained from the connector that contais a free form version the internal revision number is appended to the `inof.version` in the API definition.
  - Added resources to retrieve all revision identifiers of an API and a specific revision state.
  - API Producs can reference the latest version of an API by using the `name` of the API. 
  - API Products can also reference a specific revision by appending the version identifier - `name`@`revision`, e.g. `my-api@1.1.0`
  - Where app or api product reference specific API versions these are listed with `name`@`revision` and the API specifications can be accessed using this identifier  

* **Automated Testing**
  - Increased coverage of automated testing (integ tests) on following resources:
  - Apps, Developer/Apps, Team/Apps
  - Developers
  - Administration resources
  - APIs
  - Api Products
  - Environments
  - Organizations
  - Teams

### Fixes
* **fix-org-patch-error-missing-token**
  - Fixed an error that ocurred when the client request to POST/PATCH `organizations` was missing optional token elements. The endpoint now accepts valid requests.
* **fix-return-validation-error-from-asyncapi-parser**
  - Enhanced error reporting when attempting to create or update an API using an invalid AsyncAPI specification. The error message now contains the validation messages from the AsyncAPI parser so the client gets detailed feedback on the errors in the specification.
* **fix-dont-provision-queues-with-no-subscriptions**
  - Queues were provisioned for apps even if no subscriptions were attached. Now queues are only created if there are subscriptions present.
* **fix-mqtt-bindings-generation-tied-to-other-protocols**
  - MQTT specific bindings in generated Async APIs were erronously tied to other protocols being present. They are now generated correctly if MQTT a sa protocol is enabled for the API Product.
* **fix-jms-smf-bindings-support-presistent**
  - In generated Async APIs, the `SUB` operation binding for `jms` and `smf` now incldues the correct delivery mode (persistent/direct) according to the API Product settings.
* **fix-delete clientInformation-if-not-applicable**
  - In generated Async APIs, guaranteed messaging related information omitted if there are no subscriptions to attract message into queues.
* **fix-error-on-app-with-no-api-products**
  - Fixed issue that caused error when no API Products wewre associated with an App.
* **fix-org-patch-concurrency**
  - Fixed an issue where there was a potential for concurrent modifications bypassing the concurrency check. This was due to the concurrency check being executed only after the Solace Cloud Tokens were validated creating a race conidition if the second request is made while the tokens are validated.
* ** fix-org-service-guard-condition-token-validation**
  - Fixed an issue omitting optional token lememts led to errors
  - Fixed issues around validating Solace Cloud Tokens in various combinations (e.g. cloud token provided but no event portal token, one general token provided, general token provided is only authorized for cloud etc).
* **fix-etag-dont-serialize-strings**
  - Fixed issue in eTag generation caused by JSON Serialization of plain strings
* **fix-apiproducts-mandatory-elements**
  - Some elements in the APIProduct schema (e.g. `environments`, `protocols`) are now marked as mandatory. They were marked optional erronously
* **fix-always-log-request-id**
  - Request Ids are now always included in logging regardless of operating mode or log level.
* **fix issues for environment updates**
  - `Environments` patch now returns a correct error message if an internal error is encountered.
* **fix security issue with service(s) cache**
  - Cached Solace Clud service information is now properly isolated by `organization`
* **fix concurrency check for update team**
  - Concurrency check is now executed synchronously
* **fix-api-name-transformation-import**
  - On import of APIs cleanse the API Name - replace all disallowed characters in the API name with '-'
* **add start/end of line anchors for all patterns**
  - Fixed all the patterns in OpenAPI to include start and end of line matching
* **fix-improve-logging-cloud-token-validation**
  - Added more logging to cloud token vlaidation to facilitate debugging of connectivity
* **fix-guard-against-accessing-optional-element**
  - Fixed issue where solace cloud client relied on an optional element being present.
* **fix-dont-auto-approve-apps-no-products**
  - Apps with no associated API Products are no longer auto provisioned. This is to avoid situations when adding another product that requires manual approval resulted in the broker being provisioned without explicit approval.
* **fix-error-messages-trimmed-and-proper-case**
  - Error messages rincluded in error responses are now more uniform
* **fix-various-responses**
  - Fixed issues where some responses where not conistent with the OpenAPI Spec
* **fix-always-include-apiparams-in-apilist**
  - Now returns the AsyncAPI's Parameters in response to a GET api in `extended` format. These were previously missing 
* **fix-attributes-pattern**
  - Changed the validation pattern for attribute values on apps, api products to allow whitespaces

## Version 0.3.4
* OpenAPI: 0.6.5
* API Management Connector Server: 0.3.4

### Features
* **Developer Apps Resource**
  - Upon creating the app a developer object is auto created if it does not exist. Behaviour is now consistent with the `teams` resource
* **API Products Resource**
  - Added accessLevel property to API Product (enum one of internal, private, public). This is provided as a hint to Developer Portals if and to whom an API Product should be available.
* **Lost Update Protection**
  - All PATCH operations now return a 412 error if the `etag` presented in the `if-match` http header does not match the etag of the current state of the entity.
  - The client is supposed to retrieve the current state of the entity, keep track of the `etag` HTTTP Header returned form the Connector and submit this `etag` when attempting to update (`PATCH`) the resource.
  - Usage of this mechanism is optional to allow for backwards compatibility.
* **Filter Parameter for GET resources**
  - Added filtering mechanism to GET resources allowing for full text search of the resource's objects
  - Applies to `GET` on `/{organization_name}/apis`, `/{organization_name}/apiProducts` and `/{organization_name}/apps` 
  - Specify search terms to filter results, multiple search terms can be supplied. Search will return results matching any of the terms (OR). Enclose search terms in quotes to limit results to records matching ALL terms (AND).
* **Operations**
  - Allow for cloud tokens that do not provide access to Event Portal in case it is not licensed. Behaviou is as follows - if a specific token for Event Portal is provided it MUST be valid. If a single token is provided it MUST be valid for Solace Cloud Service API but is NOT validated against Event Portal UNLESS the connector is running in Event Portal Proxy Mode.
  - The `organizations` resource now includes a status indicating the validity of the token for the back end Solace APIs.
  - Logging includes the calling function and current request id (for HTTP request processing) when `NODE_ENV` environment variable is set to `development`.

### Fixes
* **App Resources**
  - Swapped the permissions (publish/subscribe) in AppResponse(s) to be consistent with the associated AsyncAPI(s)
  - Reject app POST or PATCH requests that contain duplicate entries in the apiProducts attribute
* **App Provisioning**
  - When webhooks were deleted the associated queue(s) in the PS+ brokers were not deleted
  - Fixed app deletion errors that occurred if API Prtducts reference protocols not present in a specific environment
  - In certain circumstances the resulting ACL on the broker was not a combination of all the app apis' topics. Now the ACL is generated is cumulative.
  - Fixed issue which led to permissions (ACL exceptions) being applied to wrong environments
  - Fixed issue when broker objects were not removed when a modified app resulted in environments being removed
  - The connection URLs for JMS returned by Solace use `smf/smfs://` prefixes. These are now replaced with `tcp/tcps` as is the case for other protocols
  - Fixed issue which led to removal of webhooks from all environments if a webhook for a specific environment was removed.
  - Fixed validation when parts of the cloud token are missing (no tokens provided for either cloud or event portal) in a `PATCH` request to the `/organizations` resource

## Version 0.3.3
* OpenAPI: 0.6.1
* API Management Connector Server: 0.3.3

### Features
* **App Status Resource
  - Added a resource to retrieve an app's status including webhook and queue status as well as client connections

### Fixes
* **App Provisioning**
  - Fixed issue that caused WebHooks to be applied to environments they shouldn't be applied to

### Known Issues
* **App Provisioning - WebHook**
  - When removing a WebHook from an App the associated queue on the broker may not be deleted.
  - When including credentials im an App PATCH request a full app deprovisioning/provisioning is triggered.

## Version 0.3.2
* OpenAPI: 0.5.7
* API Management Connector Server: 0.3.2

### Fixes
* **Proxy Support for Outgoing HTTP calls**
  - Solcae Cloud Token validation did not support HTTP proxy and attempted to request directly to Solace Cloud APIs. These calls are now also made through the HTTP proxy if the approrpiate environment variables (HTTP_PROXY, HTTPS_PROXY etc) are set..

## Version 0.3.1
* OpenAPI: 0.5.7
* API Management Connector Server: 0.3.1

### Features
* **Proxy Support for Outgoing HTTP calls**
  - Connector can be configured to use proxy for outbound calls to Solace APIs
  - Outbound calls are via HTTPS so requires usage of HTTPS_PROXY environment variable
  - See https://github.com/solace-iot-team/platform-api/wiki/Environment-Configuration-Variables 
* **App Resource - GET**
  - For JMS/SMF - extended clientInformation, it now returns max TTL and quota properties of the queue provisioned of the app (if applicable)
### Fixes
* **Apps Resources**
  - Fixed issue in generated Async APIs - secure SMF (smfs) erronously resulted in JMS bindings being generated
  - Fixed issue on app creation with webhooks that resulted in "Invalid webhook configuration" error
  - Fixed issue in App GET response - only incldue clientInformation (JMS/SMF) if relevant protocols are usable 

## Version 0.3.0
* OpenAPI: 0.5.6
* API Management Connector Server: 0.3.0

### Features
* **App Resources**
  - WebHook specification: added TLS trusted common names to enable set up on older Solace broker versions
  - AppEnvironments in GET responses now also contains displayName in addition to 
* **API Products Resources**
  - Added endpoints to retrieve API Product specific Async API (contains server and binding information) /{organization_name}/apiProducts/{api_product_name}/apis/{api_name}
  - Added endpoint to retrieve a list of all apps referencing an API product /{organization_name}/apiProducts/{api_product_name}/apps
* **APIs resource**
  - Added endpoint to retrieve a list of all API Products referencing an API  /{organization_name}/apis/{api_product_name}/apiProducts
* **Environments resource**
  - Added endpoint to retrieve a list of all API Products referencing an environment  /{organization_name}/environments/{api_product_name}/apiProducts
  - Added validation to prevent different environments referencing the same broker service id.
### Fixes
* **Connector OpenAPI**
  - JSON Schemas: Updated string patterns (regular expressions) to remove length validation to better support generated Javascript clients
* **Apps Resources**
  - Access type to queues specified in the API Product's client options is now applied correctly when provisioning the queue

## Version 0.2.9
* OpenAPI: 0.5.0
* API Management Connector Server: 0.2.9

### Features

### Fixes
* **App Resources**
  - Handle API Products without Protocols gracefully (fix-no-product-protocols): added safe guard in case no protocols are defined. previously led to internal server error on GET apps request
  - Generate Async APIs correctly for Apps with multiple API Products (fix-async-api-app-multiple-products): fixed an issue where retrieving an Async API spec for an App results in an error if the app is associated with multiple API Products

## Version 0.2.8
* OpenAPI: 0.5.0
* API Management Connector Server: 0.2.8

### Features

### Fixes
* **App Resources**
  - Ensured App Display Name is set to a default if not provided by client
  - App deprovisioning: fixed deprovisioning error when App update (PATCH) resulted in a change of client key.
  - App WebHook without authentication: Omitting authentication in webhooks resulted in a 500 error.
  - App permissions returned in App GET now contain only unique entries: fixed an issue that resulted in du0plicate permission entries
* **API Product Validation**
  - fixed validation of exposed protocols: Previously any protocol had to be contained in every environment referenced in the APi Product. This resulted in a reference check failure (422 response)
* **Open API Specification**
  - Removed onsolete URL parameters
  - Added explicit type definitions for better client code gen
  - Added validation rules to JSON schemas
  - Fixed API responses that did not comply with the OpenAPI JSON schemas.

## Version 0.2.7
* OpenAPI: 0.4.1
* API Management Connector Server: 0.2.7

### Features

* **API Info Endpoint (/{organization_name}/apis/{api_name}/info) - Channel Parameters**
  - The endpoint GET response now includes a list of all channel parameters defined in the Async API specificaiton associated with the API.
  - Parameters are described with their name, JSON schema type and - in case of an enum - all allowed values.

### Fixes
* **Apps Async API Resource (/{organization_name}/apps/{app_name}/apis/{api_name})**
  - Returned incomplete/incorrect payload when `format` parameter was set to `application/json`
  - Now returns the correct payload - JSON format as an object type, matching the Open API specification 

## Version 0.2.6
* OpenAPI: 0.3.9
* API Management Connector Server: 0.2.6

### Features

* **APIs - GET / List APIs**
  - Added additional return formats, the format required can be specified in a query parameter
  - Supported formats are `compact` (default, returns only API names), `summary` and `extended` which provide more API meta data. `compact` is the default and provides backwards compatibility
  - Added paging when Connector is running in Event Portal proxy mode
* **Logging and Operation Improvements**
  - Added /v1/about API endpoint that returns relevant environment variables alongside connector and API version information.
  - For debugging purposes - when `debug` level logging is enabled the full HTTP request and response messages of incoming requests are logged

### Fixes
* **Event API Product Resource / Event Portal**
  - Added caching of Event Portal responses for better performance. API return values are cached for 120 seconds.
  - Added paging support on the list Event API Products resource
* **Connector Open API Spec**
  - Removed default values for paging to prevent generated code sending in paging parameters and rtherefore enforcing use of paging on these clients.


## Version 0.2.5
* OpenAPI: 0.3.4
* API Management Connector Server: 0.2.5

### Features
* **API Product - ability to set Guaranteed Messaging Policy**
  - When an API Product is created a guaranteed messaging configuration can be supplied. During provisioning, if guaranteed messaging is required an app specific, per API Product queue is created and all the app's allowed subscriptions for the paerticular API Product are attached to the queue.
* **App specific Async APIs (/{organization_name}/apps/{app_name}/apis/{api_name}) now include binding information**
  - If an API Product requires guaranteed messaging appropriate operation bindings are included in the Async API spec
  - Protocols supported are SMF, MQTT. JMS is also provided provisionally utilising the SMF binding
* **Various GET reources that return a list**
  - These endpoints now support sorting, please refer to the OpenAPI documentation for details

### Fixes
* **App - removed ability to request message persistence on app creation**
  - Guaranteed messaging is now governed by API Product settings
  - The name of the queue and access type is still returned in the AppResponse's clientInformation element
* **App Provisioning**
  - In cases of an API Product referencing multiple environments the broker connection parameters were misapplied
  - Fixed concurrency issue with generated SEMPv2 REST Client 
* **Org Creation/Update - Token Validation**
  - Provided tokens were not validated against the Event API Product API
  - Access to Event Portal API is now tested using the token provided
* **Event Portal Integration - Invalid URL**
  - API was relocated to different URL, Connector is now up to date with new URL
  - Workaround for previous releases - instead of a simple token provide the token object which allows to specify the Event Portal and Solace Cloud base url. 
    - For Event Portal use - `https://api.solace.cloud/api/v0/eventPortal`
    - For Solace Cloud use - `https://api.solace.cloud/api/v0` 


## Version 0.2.4
* OpenAPI: 0.2.9
* API Management Connector Server: 0.2.4

### Features
* **Protocols**
  - Added support for secure-jms protocol
  - Added support for compressed-smf protocol
* **Provisioning Broker Authentication - SEMPv2**
  - On org creation it can be decided if SEMPv2 authentication should be via API Key or Basic Auth.
  - Basic Auth is the default if no configuration is provided.
  - It is configurable, how the API key should be included (header or query parameter, name of the parameter/header)
  - If API key authentication is used the API key is expected in the "username" element in the "SEMP management protocol" of the response that is returned by the broker discovery service.
* **App - Ability to request message persistence on app creation**
  - When app is created a guaranteed messaging configuration can be supplied. When guaranteed messaging is required an app queue is created and all the app's allowed subscriptions are attached to the queue.
  - The name of the queue is returned in the AppResponse's clientInformation element
* **App - Use internal name for all objects created on broker**
  - All broker objects are created using an internal name property on the app object.
  - The internal name meets the requirements of the most restrictive broker object - ACL profile with a maximum 32 characters - alphanumeric plus hyphen and underscore.
  - The internal name is auto generated. It must only be supplied for connector internal testing or in cases were a naming convention for broker objects must be adhered to.
  - The internal name is returned in the app response so broker objects can be related to the app easily.
  - The internal name replaces use of the consumer key - as consumer key (client username) and password can be rotated for security purposes.
  - Provisioning includes checks for broker objects previously created using the consumer key and will deprovision these objects and re-create the required objects using the internal name.
### Fixes
* **Env Variables - Event Portal Proxy Mode**
  - APIs Proxy Mode - fixed env variable parsing. Env variable was not parsed correctly, any value provided evaluated to true. Now value is parsed and only TRUE/true enable proxy mode

## Version 0.2.3
* OpenAPI: 0.2.6
* API Management Connector Server: 0.2.3

### Fixes
* **App WebHooks**
  - Allow HTTP web hooks in any case. Previous behaviour was to force HTTPS if associated API Products required HTTPS for inbound connections to broker
* **App Provisioning**
  - Fixed issue when apps without associated API Product(s) were deleted but broker objects were not deprovisioned.
  - Fixed issue when last API product was deleted form an app but the permissions (subscribe and publish topics) and RDP Queue subscriptions were not removed accordingly.

## Version 0.2.2
* OpenAPI: 0.2.6
* API Management Connector Server: 0.2.2

### Features
* **Environment**
  - POST, PATCH, GET: added displayName

### Fixes
* **Environment**
  - GET: response includes serviceName

## Version 0.2.1

* OpenAPI: 0.2.5
* API Management Connector Server: 0.2.1

### Features
* **Simplified Provision Webhook Subscriptions**
  - Applies to provisioning an app with one or more webhook configurations
  - Webhook is created with all allowed subscriptions regardless of the presence of a HTTP bindings section in the Async API's operations
  - This replaces previous behaviour which required a HTTP(S) binding section.

## Version 0.2.0

* OpenAPI: 0.2.5
* API Management Connector Server: 0.2.0

### Features
* **Event API Product Endpoint**
  - Expose Event Portal "Event API Products" meta information and Async APIs
  - Replaces previous Event Portal APIs.
  - Offers endpoints to obtain a list of Event API products, details of an Event API Product and the Async API specification from Event Portal
* **New POST APIs Endpoint to import Async API**
  - Allows to import an Async API sepcification from a source system
  - Currently supports Even API Product import form Event Portal. Requires to submit the source name "EventAPIProduct" and Event API Prodcut Identifier from Event Portal
* **Added info sub resource to APIs**
  - Exposes meta information about the API
  - For imported APIs informaiton suich as follows are available: source system, version, source id, created/updated time
  - Similar informaiton is captured and available for APIs that were directly uploaded to the Connector.
* **Provide extended Environments info in the GET environments list resource**
  - abillity to request full (extended) info about environments in the environment list to include messaging protocols offered by the environment.
  - "format" query parameter specifies if summary or full information is returned (defaults to summary)
* **Event Portal Proxy Mode for APIs resource**
  - APIM Connector can be run in replicated mode (Event portal APIs can be imported into the Connector APIs store, default mode) or proxy mode (set by environment configuration, APIS_PROXY_MODE - can be true or false).
  - In proxy mode the APIs resource exposes all published Event API Products from the Event Portal as APIs proxying requests for APIs directly to the Event Portal.
* **Various Bug Fixes and minor improvements**
  - fix-exclude-inactive-services: filter inactive Solace Cloud Services form services and environments endpoints.
  - fix: improve app update and create. Added error handling in case app provisioning or de-provisioning failed to avoid incosistent states (for example: app exists but is not provisioned)
  - fix-swagger-ui-openid: fixed issue that cause Swagge UI to not render correctly, related to trying to retrieve Open Id Connect information when OICD integration is not configured correctly.
  - fix-services-response: the payload of the services endpoint did not match the Open API specification. This was rectified
  - add-msgvpn-to-full-env-response: the fulle response of the GET Environments List endpoint now includes the message VPN name of the associated Cloud Service
  - fix-apis-endpoint-responses: In the Connector API spec the responses containing Async API specifications were not documented correctly.
  - fix-webhook-return-subscriptions: subscriptions applicable when provisioning a webhook (RDP) were not applied correctly or missing
  - fix-err-message-stringify nested objects / app-get-err-handling: some error responses were returned incorrectly, there were situations where the error response contained nested errors instead of an error message.

## Version 0.1.2

* OpenAPI: 0.1.2
* API Management Connector Server: 0.1.2

### Features
* **Added exposed protocols on environments**
  - Can now set and retrieve exposed protocols on an environment.
  - The exposedProtocols are validated against the protocols offered by the broker service
  - Added ability to edit service id on environment, makes it possible to switch environment to different service
* **Re-provision app if credentials have changed**
  - A change in credentials of an app triggers a deprovision/provision activity
* **Exclude inactive broker services**
  - Solace cloud services are filtered based on their status
  - Only healthy services are returned in the services resource
  - GET Environment response only includes information about the cloud service for healthy services
* **Services resource returns correct Cloud Service information**
  - The services endpoint now returns the full Solace cloud service details as documented in the API spec.
  - The messagingProtocols returned contain AsyncAPI compliant protocol/version information.

## Version 0.1.1

* OpenAPI: 0.1.0
* API Management Connector Server: 0.1.1

### Features
* **Reset app permissions (ACL profile exceptions) on app re-provisionining**
  - ACL publish and subscribe exceptions that were no longer applicable were not removed on re-provisioning an app
  - Required exceptions are now cross checked against the exceptions on the ACL profile and obsolete exceptions  are deleted


## Version 0.1.0

* OpenAPI: 0.1.0
* API Management Connector Server: 0.1.0

### Features
* **App Permissions - key by async api channel**
  - Structure of the permissions returned by the GET app resources changed
  - Original channels from the Async API are used as key, the permissions are listed below the channel name
* **Tenant Level Authentication using IdP and openid/Oauth2**
  - Server can be configured to use JWT for authentication and authorization
  - File based auth is preserved for backwards compatibility/demo mode. However user regsitry format has changed (see details below)
  - When using JWT access to tenants/`organization` is restricted by a claim in the JWT
  - For configuration details - https://github.com/solace-iot-team/platform-api/wiki/API-Management-Connector-(APIM-Connector)-Wiki

* **Provisioning 0f AuthorizationGroup for App**
  - Provision an authorisation group for each registered app that maps to the app's ACL profile. This allows apps authenticating with OAuth to use any authenticated principal as a user identity when connecting to PubSub+ while mapping the connection to an ACL profile based on the Authorization Group.

#### Tenant Level Authentication using IdP and openid/Oauth2 - Changes to user registry

Previous format was a simple list of usernames and password e.g.
```
{
  "tom": "tomspassword",
  "dick": "dickspassword"
}
```

The password is now replaced by a JSON object containing the password and the user's role(s).
```
{
  "tom": {
    "password": "tomspassword",
    "roles": [
      "org-admin"
    ]
  },
  "dick": {
    "password": "dickspassword",
    "roles": [
      "org-admin"
    ]
  }
}
```
Allowed roles are `org-admin` and `platform-admin`.

#### Provisioning 0f AuthorizationGroup for App

The Broker's OAuth provider configuration allows to use any claim from the JWT token as a lookup for matching an Authorization Group.
A possible scenario is a JWT that contains the username/principal in the "sub" claim and the client id of the app  - that was authorised by the principal - in the "azp".

```
Consider this example JWT snippet:
{
  "sub": "admin",
  "azp": "NEQ9smqYk9a58ONQEMrLIS1yHfsa",
  "iss": "https://3.127.198.130:9443/oauth2/token",
  "exp": 1620823479,
}
A client presenting this JWT to the broker will appear under the username "admin" and will be mapped into the Apps' ACL profile via an Authorization group "NEQ9smqYk9a58ONQEMrLIS1yHfsa".
```

## Version 0.0.12

* OpenAPI: 0.0.12
* Platform API Server: 0.0.12

### Features
* **Set admin usernam and password as an env variable**
  - Can set these env variables:
    `ADMIN_USER`
    `ADMIN_PASSWORD`
  - If not set it falls back to the default admin password and user
* **x-origin attribute added to AsyncAPI Specifications**
  - So it can be tracked where Asnc API speciciations originated from
  - The `x-origin` element has two children: `vendor` - value is "solace", `name` - value is either "event-portal" or "apim-connector"
  - Exporting an API from event portal via the Platform API adds the x-origin element with `name`=`event-portal`.
  - Importing (or updating) an Async API specification via the Platform API - if no x-origin element is present it's added with `name`=`apim-connector`
* **Display name added to App resource**
  - purpose - add a friendly display name that can be changed as needed
  - the diplay name can be set on creation or update (POST/PATCH)
  - it is included in reposnes to POST/PATCH and also GET operations on the developer/apps resource as well as the generic apps resource

## Version 0.0.11

* OpenAPI: 0.0.11
* Platform API Server: 0.0.11

### Features
* **GET /about.json**
  - retrieve about information
* **PATCH Organization**
  - optional: accepts different urls & tokens for solace cloud & event portal

## Version 0.0.10

Initial release.


---
