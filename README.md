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

## Prerequisites
* Solace Cloud Account

## Standup a Solace Broker Service
* Solace Cloud: standup a Broker Service
  - enable HTTP/S and MQTT/S messaging
  - make a note of the service-id
* Create a Solace Cloud Token
  - Permissions:
    - Organization Services: Get Services
    - Event Portal: Event Portal Read
  - make a note of the token

## Mongo DB
* use your own Mongo DB
* standup a local Mongo DB

Make a note of the `host` & `port`.

### Local MongoDB

Sample Docker compose file:

````yaml
version: "3.7"
services:
  mongodb:
    container_name: platform-api-mongodb
    image : mongo:latest
    volumes:
      - mongodbdata:/data/db
    ports:
      - 27017:27017
    restart: unless-stopped
volumes:
  mongodbdata:

````

Bash:
````bash
$ docker-compose -f docker-compose.yml up -d
````

## Platform API Server

### Environment

````bash
export CONTAINER_NAME="platform-api-server"
export IMAGE="solaceiotteam/platform-api-server:latest"
export PLATFORM_DATA_MOUNT_PATH="{local-path}/platform-api-server/data}"
export PLATFORM_DATA_INTERNAL_PATH="/platform-api-server/data"
export LOG_LEVEL="error|info|debug"
export APP_ID="platform-api"
export PLATFORM_PORT="3000"
export FILE_USER_REGISTRY="$PLATFORM_DATA_MOUNT_PATH/organization_users.json"
# Configure the URL for Mongo
  # Linux Local
  export MONGO_HOST="127.0.0.1"
  export MONG_PORT="27017"
  export DB_URL="mongodb://$MONGO_HOST:$MONGO_PORT/platform?retryWrites=true&w=majority"

  # Mac Local
  export MONGO_HOST="host.docker.internal"
  export MONG_PORT="27017"
  export DB_URL="mongodb://$MONGO_HOST:$MONGO_PORT/platform?retryWrites=true&w=majority"

````

### User Registry
Create a User Registry File `$PLATFORM_DATA_MOUNT_PATH/organization_users.json`:
````json
{
	"{org0_admin_user}": "{org0_admin_user_password}",
	"{org1_admin_user}": "{org1_admin_user_password}",
	"{org2_admin_user}": "{org2_admin_user_password}"
}
````

### Linux
Sample Docker compose file `linux.docker-compose.yml`:
````yaml
#
# Solace Platform API Server
# Linux
#
version: "3.3"
services:
  platform-api-server:
    container_name: "${CONTAINER_NAME}"
    image: "${IMAGE}"
    network_mode: host
    volumes:
      - ${PLATFORM_DATA_MOUNT_PATH}:${PLATFORM_DATA_INTERNAL_PATH}
    restart: unless-stopped
    environment:
      - DB_URL=${DB_URL}
      - LOG_LEVEL=${LOG_LEVEL}
      - APP_ID=${APP_ID}
      - FILE_USER_REGISTRY=${FILE_USER_REGISTRY}
      - PLATFORM_PORT=${PLATFORM_PORT}
````

````bash
$ docker-compose -f linux.docker-compose.yml up -d
````

### Mac
Sample Docker compose file `mac.docker-compose.yml`:
````yaml
#
# Solace Platform API Server
# MacOS
#
version: "3.3"
services:
  platform-api-server:
    container_name: "${CONTAINER_NAME}"
    image: "${IMAGE}"
    volumes:
      - ${PLATFORM_DATA_MOUNT_PATH}:${PLATFORM_DATA_INTERNAL_PATH}
    ports:
      - ${PLATFORM_PORT}:${PLATFORM_PORT}
    restart: unless-stopped
    environment:
      - DB_URL=${DB_URL}
      - LOG_LEVEL=${LOG_LEVEL}
      - APP_ID=${APP_ID}
      - FILE_USER_REGISTRY=${FILE_USER_REGISTRY}
      - PLATFORM_PORT=${PLATFORM_PORT}

````

````bash
$ docker-compose -f mac.docker-compose.yml up -d
````

### Check Docker Logs
````bash
$ docker logs $CONTAINER_NAME
````

## Bootstrap Example

[See Example](https://github.com/solace-iot-team/platform-api/tree/main/release/platform-api-openapi-client/example).




---
