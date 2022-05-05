Environment Variables
=====================

The following environment variables modify the configuration of the API
Server.

General
-------

* **LOG_LEVEL**
  
  * Enabled log level, all higher severity logs will also be emitted; uses [pino](https://www.npmjs.com/package/pino/v/3.0.0) log levels 
  
  * Default: debug
  
  * Required: No
  
  * Example: info

* **DB_URL**    
  
  * The mongo db connection URL. Any database referenced in the URL will be ignored. The server uses the `platform` database for configuration data and a dedicated database per organization. 
  
  * Default: -
  
  * Required: Yes
  
  * Example: Local database: `mongodb://localhost:27017/solace-platform?retryWrites=true`, Cloud (Atlas): `mongodb+srv://user:password@sandbox.ywyvl.mongodb.net/solace-platform?retryWrites=true&w=majority`

* **PLATFORM_PORT**  

  * HTTP port of the server, defaults to `3000` if omitted  

  * Default: 3000

  * Required: No  

  * Example: 9090 

* **HTTPS_PROXY**  

  * proxy to use for HTTPS requests. **Outbound calls from the connector are nearly exclusively using HTTPS**.  

  * Default: -

  * Required: No  

  * Example: http://localhost:8080 

* **HTTP_PROXY**
  * proxy to use for HTTP requests   

  * Default: -

  * Required: No  

  * Example: http://localhost:8080 

* **NO_PROXY**  
  * a comma-separated list of DNS suffixes or IP addresses that can be accessed without passing through the proxy   

  * Default: -

  * Required: No  

  * Example: \*.internal,localhost 

* **APIS_PROXY_MODE**
  * Switch the APIS resource into Event Portal proxy mode, which automatically exposes all Event API products published from Event Portal

  * Default: false  

  * Required: N  
  * Example: true 

Authentication/IdP
------------------

* **FILE_USER_REGISTRY**
  *  Path to the user registry file for basic authentication.   
  
  * Default: -

  * Required: Yes   

  * Example: /home/admin/users.json 

* **AUTH_EXTRACTION_USER_PRINCIPAL**
  * JSON path to locate  the attribute containing the user name in the JWT

  * Default: $.upn  

  * Required: No

  * Example: $.preferred_username

* **AUTH_EXTRACTION_ORGS**

  * JSON path to locate  the attribute containing the organization membership information in the JWT  

  * Default: $.groups  

  * Required: No  

  * Example: $.organization

* **AUTH_EXTRACTION_ROLES**

  * JSON path to locate  the attribute containing the roles information in the JWT 

  * Default: $.resource_access[\'platform-api-server\'].roles  

  * Required: No  

  * Example: $.roles 

* **AUTH_VERIFICATION_KEY**

  * Path to the file containing the IdP's public key or certificate in PEM format

  * Default: - 

  * Required: Y  

  * Example: /home/admin/public_key.pem 

* **AUTH_VERIFICATION_AUD**
  * The expected value in the JWT `aud` (audience) attribute

  * Default: - 

  * Required: Yes  

  * Example: platform-api-server 

* **AUTH_VERIFICATION_ISSUER**

  * The expected value in the JWT `iss` (issuer) attribute

  * Default: - 

  * Required: Y  

  * Example: ``http://localhost/authserver``

* **AUTH_DISCOVERY_OIDC_URL**
  
  * URL of the IdP's OpenIdConnect discovery endpoint. If omitted the API Explorer does not render OAuth/OpenId Connect authentication mechanisms. Any API client generated based on the Open API specification may not be able to obtain a JWT
  
  * Default: -
  
  * Required: No


