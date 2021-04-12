# Release Notes

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
