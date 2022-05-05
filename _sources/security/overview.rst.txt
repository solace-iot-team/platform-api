Security / Auth Overview
=======================================

The API server provides both HTTP Basic Authentication and Bearer
Token/JWT mechanisms. Either of the mechanisms are sufficient for
authentication. Basic Authentication is deprecated and only provided for
backwards compatibility.

Basic Authentication relies on a simple file based user registry. The
JWT token is locally validated and multiple Identity Providers were
tested as a token issuer.

Users are granted access to organizations (tenants) and privileges
within the tenant based on the claims that are present in the JWT. Users
who were authenticated using basic authentication are granted access to
ALL tenants and provided privileges associated with the user roles.

Currently there are two roles: \* platform-admin: grants access to the
platform management APIs. \* org-admin: grants access to specific
organizations and privileges for all organization level resources.

The role model may be refined in subsequent releases.

File Based User Registry
~~~~~~~~~~~~~~~~~~~~~~~~

Basic authentication uses a file based user registry. It is intended for
demo/test purposes as it stores passwords in clear text. See below for a
short example, the repo contains a full example:

::

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

Users are configured as properties of the root JSON object. Each user is
defined by an object with the properties - password: string, user
password - roles: string array, roles associated with the user.
Currently supported roles ``platform-admin`` and ``org-admin``

The file based user registry is a JSON file listing users, their
passwords and roles. The location of the user registry is configurable
(see “Environment Configuration”)

Identity Provider Integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

JWT tokens are validated locally, the validation and extraction of user
roles, groups is configurable (see “Environment Configuration”).

JWT should be obtained from a suitable IdP and it is validated by
signature verification and expected values in specific attributes. The
public key or certificate of the IdP must be provided in PEM format, the
attributes ``iss`` (issuer) and ``aud`` (audience) must match the
expected values as configured in the API Server.

The IdP must be configured to include attributes in the JWT that
describe a user’s name (principal), roles and organization membership.
These attribute names differ between IdPs and the extraction paths from
the JWT can be configured accordingly. The ``principal`` attribute MUST
be a string. The ``roles`` and ``organizations`` attributes can be
either a string array or a string listing values separated by space
characters. For example both of these are valid values for these
attributes:

::

   "roles": ["org-admin","platform-admin"]

::

   "roles": "org-admin platform-admin"

Here is an example payload extracted from a JWT Id token obtained from
Okta: - principal name (user name) is contained in the
``preferred_username`` attribute - roles attribute is ``groups`` -
organizations attribute is ``organization``

The user authenticated with this token is ``api1@gmail.com``, belongs to
one organization ``my-org`` and has the ``org-admin`` role.

::

   {
     "sub": "00uncii0ixg9gTgie5d6",
     "name": "API user-1",
     "ver": 1,
     "iss": "https://dev-12123555.okta.com/oauth2/default",
     "aud": "0oancf26sFegoXz8l5d6",
     "iat": 1619616618,
     "exp": 1619620218,
     "jti": "ID.jmgMSJuaYFHqumM1pYQkNdDZxjLYbgt6dGOXgnB3fzs",
     "amr": [
       "pwd"
     ],
     "idp": "00oncdc53KoJbUvfN5d6",
     "preferred_username": "api1@gmail.com",
     "auth_time": 1619616364,
     "at_hash": "oc7VLYmJj8TDuwB0zGrl1w",
     "organization": "my-org",
     "groups": [
       "Everyone",
       "org-admin"
     ]
   }

Example IdP Configurations
~~~~~~~~~~~~~~~~~~~~~~~~~~

Tested with: 
* Keycloak - [[Configure Keycloak for use with the API Server]] 
* WSO2 API Manager (Identity Server) - [[Configure WSO2 API Manager for use with the API Server]] 
* Okta - [[Configure Okta for use with the API Server]]

Obtaining a JWT
~~~~~~~~~~~~~~~

The API Explorer (Swagger UI) can be used to obtain a token. The API
definition is configured with a Open Id Connect Discovery URL that the
API Explorer uses to find out the authorization and token endpoints for
the IdP that the API Server is configured to use.

Alternatively you can provide a JWT Id token - that you have obtained
previously e.g. via postman - as Bearer token in the API Explorer.
