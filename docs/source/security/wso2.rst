Configure WSO2 API Manager for use with the API Server
======================================================

Add roles
---------

Navigate to “Users and Roles” -> “Add”. Then click “Add new role”. Add
both ``org-admin`` and ``platform-admin`` roles. |image2|

.. figure:: https://user-images.githubusercontent.com/3858485/116538627-adae8080-a8df-11eb-8b50-0af81678d367.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116538736-d3d42080-a8df-11eb-8a29-364ab31f4bb4.png
   :alt: image

   image

Add user
--------

Navigate to “Users and Roles” -> “Add”. Then click “Add new user”.

.. figure:: https://user-images.githubusercontent.com/3858485/116539144-5a88fd80-a8e0-11eb-8272-13eb7a2a3332.png
   :alt: image

   image

In the next step associate roles with the user as required

.. figure:: https://user-images.githubusercontent.com/3858485/116539257-7e4c4380-a8e0-11eb-8f47-2f25859eca10.png
   :alt: image

   image

Add organization association(s)
-------------------------------

We will use the ``organization`` attribute of the user profile to store
organization membership. The API Server expects a list of orgs separated
by space character.

Once the user is created click “User Profile” on your user’s entry in
the list and click to edit the ``default`` profile. Add e.g. “my-org” to
the ``organization`` attribute:

.. figure:: https://user-images.githubusercontent.com/3858485/116539439-b5baf000-a8e0-11eb-93ef-0c19914b70c8.png
   :alt: image

   image

.. figure:: https://user-images.githubusercontent.com/3858485/116539654-05012080-a8e1-11eb-89b9-723defe138d0.png
   :alt: image

   image

Configure OpenId Scope for organization
---------------------------------------

This is necessary so the ``organization`` attribute of the user profile
is included in the JWT

Navigate to “OICD Scope” -> “Add”. Set scope name to ``organization``
and then “Add OIDC Claim” |image2|

Select ``organization`` from the drop down list then click “Finish”:
|image3|

Configure Service Provider for the API Server
---------------------------------------------

Navigate to “Service Provider” -> “Add”, add a name and register the
provider: |image4|

Then edit your service provider selecting it in “Service Provider” ->
“List” |image5|

Claim Configuration
~~~~~~~~~~~~~~~~~~~

Ensure the “Claim Configuration” looks similar: |image6|

OAuth/OpenID Connect Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open the section “Inbound Authentication Configuration” sub section
“OAuth/OpenID Connect Configuration” and click “Edit”:

.. figure:: https://user-images.githubusercontent.com/3858485/116553584-32a29580-a8f2-11eb-9b74-4b29b442b71e.png
   :alt: image

   image

Ensure you set the correct callback url. This depends on your deployment
and how your client app authorizes users and obtains tokens

.. figure:: https://user-images.githubusercontent.com/3858485/116553908-84e3b680-a8f2-11eb-96fe-19987e429d39.png
   :alt: image

   image

Also make sure the service provider is issuing JWT and that you add an
audience claim. If disabled - enable the “Role based scope validator”

.. figure:: https://user-images.githubusercontent.com/3858485/116554183-ce340600-a8f2-11eb-9e01-8e5665283fef.png
   :alt: image

   image

Obtaining a JWT Token
---------------------

The tokens must be requested with the “openid” and “organization” scope.
The latter is required so that the organization attribute of the user is
included in the tokens.

Example JWT
-----------

The payload section of a JWT obtained from WSO2 that contains all
required attributes will look similar to this:

::

   {
     "sub": "harry",
     "aut": "APPLICATION_USER",
     "iss": "https://localhost:9443/oauth2/token",
     "groups": [
       "org-admin",
       "Internal/everyone",
       "platform-admin"
     ],
     "given_name": "Harry",
     "aud": [
       "hTa_o_7z2lBYrELD9cm3lvVK9IMa",
       "platform-api-server"
     ],
     "upn": "harry",
     "nbf": 1619702089,
     "azp": "hTa_o_7z2lBYrELD9cm3lvVK9IMa",
     "scope": "openid organization",
     "organization": "my-org",
     "exp": 1619705689,
     "iat": 1619702089,
     "family_name": "H",
     "jti": "f30911fa-6675-4f30-8d47-19fb3e791888",
     "email": "harry@email.com"
   }

Configure the API Server
------------------------

Properties for claim and username extraction:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   AUTH_EXTRACTION_USER_PRINCIPAL=$.upn

Will evaluate to “harry” given the JWT example above.

::

   AUTH_EXTRACTION_ORGS=$.organization

Will evaluate to

::

   my-org

::

   AUTH_EXTRACTION_ROLES=$.groups

Will evaluate to

::

   [
       "org-admin",
       "Internal/everyone",
       "platform-admin"
     ]

Properties for JWT verification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   AUTH_VERIFICATION_AUD=platform-api-server

Must match the ``aud`` property in the JWT token - see example above

::

   AUTH_VERIFICATION_ISSUER=https://localhost:9443/oauth2/token

The URL of your wso2 realm.

::

   AUTH_VERIFICATION_KEY=/home/admin/platform-api-tmp/wso2-key.pem

You can obtain the public key / cert via the JWKS endpoint (see
https://docs.wso2.com/display/IS541/JSON+Web+Key+Set+Endpoint) and you
then need to convert this to a PEM format. The JWKS URL is at
``https://<IS_HOST>:<IS_HTTPS_PORT>/oauth2/jwks``. Copy the ``key``
element of the payload as below

.. figure:: https://user-images.githubusercontent.com/3858485/116558825-c034b400-a8f7-11eb-95a0-da8bd3e23737.png
   :alt: image

   image

To convert JWKS to PEM you can for example use this web site -
8gwifidotorg/jwkconvertfunctions.jsp. Paste the JWK key and hit
submit, then copy the resulting public key and save it to the local file
system - in the example above it was saved to
``/home/admin/platform-api-tmp/wso2-key.pem``

.. figure:: https://user-images.githubusercontent.com/3858485/116559115-ff630500-a8f7-11eb-96ad-0718ea76c4b1.png
   :alt: image

   image

Set the OpenId Connect Discovery URL
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Will be in the format below. Replace host and port with the correct
values for your deployment:

::

   AUTH_DISCOVERY_OIDC_URL=https://ec2.eu-central.compute.amazonaws.com:9443/oauth2/oidcdiscovery/.well-known/openid-configuration

.. |image1| image:: https://user-images.githubusercontent.com/3858485/116538445-717b2000-a8df-11eb-89b1-9b310968af2a.png
.. |image2| image:: https://user-images.githubusercontent.com/3858485/116539946-6f19c580-a8e1-11eb-856f-aadf1477d551.png
.. |image3| image:: https://user-images.githubusercontent.com/3858485/116540173-b4d68e00-a8e1-11eb-8e29-2e5fb643464a.png
.. |image4| image:: https://user-images.githubusercontent.com/3858485/116540440-0ed75380-a8e2-11eb-8166-fc9674b6a909.png
.. |image5| image:: https://user-images.githubusercontent.com/3858485/116540542-35958a00-a8e2-11eb-85bf-0c9f1d939dad.png
.. |image6| image:: https://user-images.githubusercontent.com/3858485/116552885-73e67580-a8f1-11eb-8ba7-304e4b40c122.png
