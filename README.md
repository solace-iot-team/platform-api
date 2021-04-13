[![integration-test](https://github.com/solace-iot-team/platform-api/actions/workflows/integration-test.yml/badge.svg)](https://github.com/solace-iot-team/platform-api/actions/workflows/integration-test.yml)
[![release-test](https://github.com/solace-iot-team/platform-api/actions/workflows/release-test.yml/badge.svg)](https://github.com/solace-iot-team/platform-api/actions/workflows/release-test.yml)
[![release](https://github.com/solace-iot-team/platform-api/actions/workflows/release.yml/badge.svg)](https://github.com/solace-iot-team/platform-api/actions/workflows/release.yml)

[Issues & Feature Requests](https://github.com/solace-iot-team/platform-api/issues) |
[Release Notes](./ReleaseNotes.md)

# Solace Platform API

Integration server to connect API Management tools with [Solace PubSub+ Platform](http://solace.com) to create a unified OpenAPI and AsyncAPI management & developer experience.

# See also

[Reference Designs and Tutorials](https://github.com/solace-iot-team/solace-apim-reference-designs)

[OpenAPI Client Library (Typescript)](https://www.npmjs.com/package/@solace-iot-team/platform-api-openapi-client)

[Platform API Server Docker](https://hub.docker.com/r/solaceiotteam/platform-api-server)

# How to Use

_**Note: See [Reference Designs and Tutorials / API Management System](https://github.com/solace-iot-team/solace-apim-reference-designs/tree/main/apim-system) for
detailed examples to manage deployments in public cloud environments - from self-contained to H/A setup.**_

## Prerequisites
* Solace Cloud Account
* docker, docker-compose

## Standup a Solace Broker Service
* Solace Cloud: standup a Broker Service
  - Enable at least HTTP/S and MQTT/S messaging
  - Make a note of the service id
* Create a Solace Cloud Token
  - Permissions:
    - Organization Services: Get Services
    - Event Portal: Event Portal Read
  - Make a note of the Token

## Environment
Set the following environment variables:
````bash
export PROJECT_NAME="solace-apim-system"
# create a {local-path} of your choice, create platform-api-server/data directories
export PLATFORM_DATA_MOUNT_PATH="{local-path}/platform-api-server/data"
export PLATFORM_PORT="3000"
export FILE_USER_REGISTRY="$PLATFORM_DATA_MOUNT_PATH/organization_users.json"
export ADMIN_USER="admin"
export ADMIN_PASSWORD="admin"
````

## User Registry
Create a User Registry File `organization_users.json` in `$PLATFORM_DATA_MOUNT_PATH`:
````json
{
	"{org0_admin_user}": "{org0_admin_user_password}",
	"{org1_admin_user}": "{org1_admin_user_password}",
	"{org2_admin_user}": "{org2_admin_user_password}"
}
````

## Docker Compose
Create a Docker compose file `docker-compose.yml`:
````yaml
version: "3.7"
services:
  mongodb:
    container_name: $PROJECT_NAME-mongodb
    image : mongo:latest
    volumes:
      - mongodbdata:/data/db
    restart: unless-stopped
  platform-api-server:
    container_name: $PROJECT_NAME-platform-api-server
    links:
      - mongodb
    image: solaceiotteam/platform-api-server:latest
    ports:
      - ${PLATFORM_PORT}:3000
    volumes:
      - ${PLATFORM_DATA_MOUNT_PATH}:/platform-api-server/data
    restart: unless-stopped
    environment:
      - DB_URL=mongodb://mongodb:27017/platform?retryWrites=true&w=majority
      # error|info|debug
      - LOG_LEVEL=debug
      - APP_ID=platform-api
      - FILE_USER_REGISTRY=${FILE_USER_REGISTRY}
      - PLATFORM_PORT=3000
      - ADMIN_USER=${ADMIN_USER}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
volumes:
  mongodbdata:
````

````bash
$ docker-compose -p $PROJECT_NAME -f docker-compose.yml up -d
# check the logs
$ docker logs $PROJECT_NAME-platform-api-server
````

## Bootstrap the System

See [Example Using Solace Platform API OpenApi Client](https://github.com/solace-iot-team/platform-api/tree/main/release/platform-api-openapi-client/example) to create a simple bootstraped configuration.




---
