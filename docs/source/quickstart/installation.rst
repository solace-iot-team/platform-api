Installing the API Management Connector
=======================================

The Connector consists of multiple docker containers. The minimum
deployment consists of the Connector Server and Mongo DB for data
storage. We provide a `simple docker compose
template <https://github.com/solace-iot-team/platform-api/tree/main/simple-docker-compose>`__
that also deploys a demo API Management portal for Async APIs that is
useful for debugging and prototype/POC activities.

Environment Variables
---------------------

For the docker deployment you’ll need an environment file and we provide
a `sample environment configuration
file <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/.env>`__.

The core variables required by the connector are documented
`here <./Environment-Configuration-Variables>`__.

Docker based Deployment
-----------------------

The sample docker template sets up all components of the API-Management
Connector using docker-compose: \* Connector Services \* Database
Backend - Mongodb \* Sample/Demo Portal Application \* Nginx as reverse
proxy

The `README of the simple docker
template <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/README.md>`__
contains more detailed information on the files that are part of the
template: 

1. `Files on the host system <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/README.md#files-on-host-systems>`__
2. `Configuration of the user registry <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/README.md#files-on-host-systems>`__
3. `Configuring the environment variables <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/README.md#configuring-the-environment-variables>`__
4. `Running docker compose <https://github.com/solace-iot-team/platform-api/blob/main/simple-docker-compose/README.md#running-docker-compose>`__
