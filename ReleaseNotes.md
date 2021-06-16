# Release Notes

## Version 0.1.2

* OpenAPI: 0.1.1
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
