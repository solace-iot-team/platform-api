# Release Notes

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
