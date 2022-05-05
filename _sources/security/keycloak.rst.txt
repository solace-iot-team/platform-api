Configure Keycloak for use with the API Server
==============================================

Steps to configure a keycloak realm to issue suitable tokens for the API
Server.

Create a new realm
------------------

.. figure:: https://user-images.githubusercontent.com/3858485/116523509-358b8f00-a8ce-11eb-8f01-39e8821806e2.png
   :alt: image

   image

Configure Organizations - Add groups
------------------------------------

Currently organizations are not propagated to the IdP. You need to add
organizations manually. In Keycloak we use the groups concept to
represent an organization.

The example below adds a ``my-org`` organization:

.. figure:: https://user-images.githubusercontent.com/3858485/116524862-c747cc00-a8cf-11eb-9c8f-abe0bce3656a.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116524920-dd558c80-a8cf-11eb-8992-180bd98c0e4c.png
   :alt: image

   image

Add a user
----------

First add a user, then on the newly created user set the password -
|image1|

.. figure:: https://user-images.githubusercontent.com/3858485/116525325-4e953f80-a8d0-11eb-9a39-41d570b0973f.png
   :alt: image

   image

Add client configuration for the API Server
-------------------------------------------

Add a new client and set the callback url and web-origin (for CORS). Use
the correct host name and port according to your deployment.

.. figure:: https://user-images.githubusercontent.com/3858485/116525752-bea3c580-a8d0-11eb-9bf0-e4ad08d54397.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116531936-98355880-a8d7-11eb-87bf-0fc6b72035a4.png
   :alt: image

   image

Add roles to the client
-----------------------

Now we need to add the roles (org-admin, platform-admin) to the client

.. figure:: https://user-images.githubusercontent.com/3858485/116526248-4d184700-a8d1-11eb-8e0c-35c5e3407e36.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116527096-38887e80-a8d2-11eb-8b01-ed4c8c92485a.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116527183-50f89900-a8d2-11eb-9f38-4b546394b9a8.png
   :alt: image

   image

Add roles to user
-----------------

Navigate to the user you created and switch to the role mappings tab -
then in the “client roles” field select the name of the client you
created (in the example ``platform-api-server``). This will load the
roles and you can assign both of the roles created previously to the
user

.. figure:: https://user-images.githubusercontent.com/3858485/116527413-8b623600-a8d2-11eb-8831-88ad0aaecf9d.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116527637-d2502b80-a8d2-11eb-9d83-e59d33e08a1e.png
   :alt: image

   image

Add groups to user
------------------

Navigate to the user you created and switch to the groups tab. Add the
``my-org`` group to the user:

.. figure:: https://user-images.githubusercontent.com/3858485/116529497-f01e9000-a8d4-11eb-8719-4fe68aed2444.png
   :alt: image

   image

Add mappers to the client
-------------------------

The issued JWT token must include the roles and groups as well as the
audience (``aud``) claim. We need to set up mappers for these
attributes.

.. figure:: https://user-images.githubusercontent.com/3858485/116528266-88b41080-a8d3-11eb-9da2-5c51b2c04de2.png
   :alt: image

   image

Add groups (organizations) mapper
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Click “Create” to add a new mapper. Set the new mapper up as follows:

.. figure:: https://user-images.githubusercontent.com/3858485/116529175-8ef6bc80-a8d4-11eb-8a5a-a4664e71dbc9.png
   :alt: image

   image

Add audience (aud) mapper
~~~~~~~~~~~~~~~~~~~~~~~~~

Click “Create” to add a new mapper. Set the new mapper up as follows:
|image2|

Modify the Client Scope settings
--------------------------------

Disable “Full Scope Allowed”: |image3|

Setup the Client Scopes
-----------------------

Go to the “Client Scopes” tab of your client and the sub-tab “Setup”.
Set the default and optional client scopes as shown below:

.. figure:: https://user-images.githubusercontent.com/3858485/116530936-83a49080-a8d6-11eb-9f61-b8c8def5e57e.png
   :alt: image

   image

Preview the JWT token
---------------------

Go to the “Client Scopes” tab of your client and the sub-tab “Evaluate”.
Select the user you created previously:

.. figure:: https://user-images.githubusercontent.com/3858485/116530446-f5c8a580-a8d5-11eb-822e-78c4b06b9c08.png
   :alt: image

   image

Then you can preview the token, check that it contains the right
``aud``, ``resource_access / roles`` and ``organizations`` attributes:

.. figure:: https://user-images.githubusercontent.com/3858485/116530797-5526b580-a8d6-11eb-8d82-826907bb00a0.png
   :alt: image

   image

Here is an example:

::

   {
     "exp": 1619689009,
     "iat": 1619688709,
     "jti": "dd8c2095-e96f-4ee8-96c6-f3262b1508f9",
     "iss": "http://localhost:8180/auth/realms/apim-connector",
     "aud": "platform-api-server",
     "sub": "bfd13823-9987-446c-b4f8-5f9793be50bf",
     "typ": "Bearer",
     "azp": "platform-api-server",
     "session_state": "297121ef-77d0-4d3d-85ef-64ab2c9ef208",
     "acr": "1",
     "resource_access": {
       "platform-api-server": {
         "roles": [
           "org-admin",
           "platform-admin"
         ]
       }
     },
     "scope": "openid profile",
     "organizations": [
       "my-org"
     ],
     "name": "Harry H",
     "preferred_username": "harry",
     "given_name": "Harry",
     "family_name": "H"
   }

Configure the API Server
------------------------

Properties for claim and username extraction:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   AUTH_EXTRACTION_USER_PRINCIPAL=$.preferred_username

Will evaluate to “harry” given the JWT example above.

::

   AUTH_EXTRACTION_ORGS=$.organizations

Will evaluate to

::

   [
       "my-org"
     ]

::

   AUTH_EXTRACTION_ROLES=$.resource_access['platform-api-server'].roles

Will evaluate to

::

   [
           "org-admin",
           "platform-admin"
         ]

Properties for JWT verification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   AUTH_VERIFICATION_AUD=platform-api-server

Must match the ``aud`` property in the JWT token - see example above

::

   AUTH_VERIFICATION_ISSUER=http://localhost:8180/auth/realms/apim-connector

The URL of your keycloak realm, ``apim-connector`` is the realm name.
Replace if you use another realm.

::

   AUTH_VERIFICATION_KEY=/Users/swenhelge/platform-api-tmp/keycloak_local_key.pem

The location of public key used by keycloak - you need to download it
from the “Realm Settings” in keycloak: |image4|

Set the OpenId Connect Discovery URL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Will be in the format below. Replace host, port and realm
(``apim-connector`` in the example below) with the correct values for
your deployment:

::

   AUTH_DISCOVERY_OIDC_URL=http://localhost:8180/auth/realms/apim-connector/.well-known/openid-configuration

.. |image1| image:: https://user-images.githubusercontent.com/3858485/116525193-2c9bbd00-a8d0-11eb-9dba-18b13b476023.png
.. |image2| image:: https://user-images.githubusercontent.com/3858485/116529816-3bd13980-a8d5-11eb-9675-d3b853f5c855.png
.. |image3| image:: https://user-images.githubusercontent.com/3858485/116530151-9b2f4980-a8d5-11eb-8779-88423079278f.png
.. |image4| image:: https://user-images.githubusercontent.com/3858485/116533161-f4e54300-a8d8-11eb-92d9-8a0544e5cd81.png
