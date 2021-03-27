# Example Using Solace Platform API OpenApi Client

Sequence (`index.ts`):

- initialize the client library with the management & api user usernames & passwords (`platformapiclient.ts`)
- delete the organization
- create the organization
- register Solace Cloud Service (the API Gateway) with the organization
- create the API (`ApiMaintenance.async-api-spec.yml`)
- create the API Product with the API
- register a developer
- create a developer app
- delete the organization

## Prerequisites

- running instance of the Platform-Api Server
- Solace Cloud account with rights to create a token
- 1 service in Solace Cloud to act as the API Gateway

## Install

```bash
npm install
```

## Configure

Set the environment variables defined in `template.source.env.sh`.

```bash
cp template.source.env.sh source.env.sh

# edit the values ...

source source.env.sh

# check:
env | grep APIM_EXAMPLE
```

## Run

```bash
npm start
```

---
