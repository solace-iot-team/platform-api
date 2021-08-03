import fs from 'fs';
import yaml from "js-yaml";
import { PlatformAPIClient } from './platformapiclient';
import type { Organization } from '@solace-iot-team/platform-api-openapi-client';
import { AdministrationService, Environment, EnvironmentsService, ApisService, APIProduct, Protocol, ApiProductsService, Developer, DevelopersService, App, AppsService } from '@solace-iot-team/platform-api-openapi-client';

const getMandatoryEnvVarValue = (envVar: string): string => {
    const value: any = (process.env[envVar] === undefined) ? null : process.env[envVar];
    if (value == null) throw new Error(`>>> ERROR: missing env var: ${envVar}`);
    return value;
}

const sampleEnv = {
    PLATFORM_PROTOCOL: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_PROTOCOL'),
    PLATFORM_HOST: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_HOST'),
    PLATFORM_PORT: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_PORT'),
    PLATFORM_ADMIN_USER: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_ADMIN_USER'),
    PLATFORM_ADMIN_PASSWORD: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_ADMIN_PASSWORD'),
    ORG_API_USR: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_ORG_API_USR'),
    ORG_API_PWD: getMandatoryEnvVarValue('APIM_EXAMPLE_PLATFORM_SERVER_ORG_API_PWD'),
    SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue('APIM_EXAMPLE_SOLACE_CLOUD_TOKEN'),
    SOLACE_CLOUD_SERVICE_ID: getMandatoryEnvVarValue('APIM_EXAMPLE_SOLACE_CLOUD_GW_SERVICE_ID'),
    ORG_NAME: "sample-org",
    ENV_NAME: "dev-env",
    API_SPEC_FILE: "./ApiMaintenance.async-api-spec.yml",
    API_NAME: "maintenance-api",
    API_PRODUCT_NAME: "maintenance-product",
    API_PERMISSIONS: [
        { name: 'resource_region_id', value: 'fr, de, us-east, us-west' }, 
        { name: 'resource_type', value: 'elev-make-1, elev-make-2' },
        { name: 'resource_id', value: '*' }
    ],
    DEVELOPER_USERNAME: 'dev@sample.com'
}
console.log(`sampleEnv=\n${JSON.stringify(sampleEnv, null, 2)}`);

const loadYamlFileAsJsonString = (apiSpecPath: string): string => {
    const b: Buffer = fs.readFileSync(apiSpecPath);
    const obj = yaml.load(b.toString());
    return JSON.stringify(obj);
}
const initializeOpenAPI = () => {
    const base: string = PlatformAPIClient.getBaseUrl(sampleEnv.PLATFORM_PROTOCOL, sampleEnv.PLATFORM_HOST, sampleEnv.PLATFORM_PORT);
    PlatformAPIClient.initialize(base, sampleEnv.PLATFORM_ADMIN_USER, sampleEnv.PLATFORM_ADMIN_PASSWORD, sampleEnv.ORG_API_USR, sampleEnv.ORG_API_PWD);  
}

const deleteOrg = async() => {
    console.log('deleting org ...');
    PlatformAPIClient.setManagementUser();
    try {
        await AdministrationService.deleteOrganization(sampleEnv.ORG_NAME);
    } catch(e) {
        console.log(`deleteOrg error = ${JSON.stringify(e, null, 2)}`);
        if(e.status !== 404 && e.status !== 201) {
            console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
            process.exit(1);
        }
    }
    console.log('success.');
}
const createOrg = async() => {
    console.log('creating org ...');
    PlatformAPIClient.setManagementUser();
    let request: Organization = {
        name: sampleEnv.ORG_NAME,
        'cloud-token': sampleEnv.SOLACE_CLOUD_TOKEN
    }
    try {
        let response: Organization = await AdministrationService.createOrganization(request);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}
const registerSolaceCloudServiceWithOrg = async() => {
    console.log('register solace cloud service with org ...');
    PlatformAPIClient.setApiUser();
    let request: Environment = {
        name: sampleEnv.ENV_NAME,
        description: 'development solace cloud service',
        serviceId: sampleEnv.SOLACE_CLOUD_SERVICE_ID,
        exposedProtocols: [ {
          name: Protocol.name.AMQP,
          version: '1.0.0'
        }
        ] 
    };
    try {
        let response: Environment = await EnvironmentsService.createEnvironment(sampleEnv.ORG_NAME, request);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}
const createApi = async() => {
    console.log('create api ...');
    const apiSpec: string = loadYamlFileAsJsonString(sampleEnv.API_SPEC_FILE);
    PlatformAPIClient.setApiUser();    
    try {
        let response: string = await ApisService.createApi(sampleEnv.ORG_NAME, sampleEnv.API_NAME, apiSpec);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}
const createApiProduct = async() => {
    console.log('create api product ...');
    PlatformAPIClient.setApiUser();    
    let request: APIProduct = {
        name: sampleEnv.API_PRODUCT_NAME,
        displayName: sampleEnv.API_PRODUCT_NAME,
        description: `description for ${sampleEnv.API_PRODUCT_NAME}`,
        apis: [ sampleEnv.API_NAME ],
        approvalType: APIProduct.approvalType.AUTO,
        attributes: sampleEnv.API_PERMISSIONS,
        environments: [ sampleEnv.ENV_NAME ],
        protocols: [ { name: Protocol.name.MQTT, version: '3.1.1' } ],
        pubResources: [],
        subResources: []
      };
    try {
        let response: APIProduct = await ApiProductsService.createApiProduct(sampleEnv.ORG_NAME, request);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}
const createDeveloper = async() => {
    console.log('create developer ...');
    PlatformAPIClient.setApiUser();    
    let request: Developer = {
        email: 'dev1@sample.com',
        firstName: 'dev1',
        lastName: 'developer',
        userName: sampleEnv.DEVELOPER_USERNAME
    }
    try {
        let response: Developer = await DevelopersService.createDeveloper(sampleEnv.ORG_NAME, request);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}
const createDeveloperApp = async() => {
    console.log('create developer app ...');
    PlatformAPIClient.setApiUser();    
    let request: App = {
        name: 'my-first-app',
        apiProducts: [ sampleEnv.API_PRODUCT_NAME ],
        credentials: {
            expiresAt: -1
        }
    }
    try {
        let response: App = await AppsService.createDeveloperApp(sampleEnv.ORG_NAME, sampleEnv.DEVELOPER_USERNAME, request);
        console.log(`response=${JSON.stringify(response, null, 2)}`);
    } catch(e) {
        console.log(`>>> ERROR: ${JSON.stringify(e, null, 2)}`);
        process.exit(1);
    }
    console.log('success.');
}

const main = async() => {
    initializeOpenAPI();
    await deleteOrg();
    await createOrg();
    await registerSolaceCloudServiceWithOrg();
    await createApi();
    await createApiProduct();
    await createDeveloper();
    await createDeveloperApp();
    await deleteOrg();
}

main();



