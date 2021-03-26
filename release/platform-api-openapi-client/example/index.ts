// import s from 'shelljs';
// import fs from 'fs';
// import yaml from 'js-yaml';
// import { HttpClient } from 'openapi-typescript-codegen';
// const OpenAPI = require('openapi-typescript-codegen');
// const config = require('./tsconfig.json');
// const outDir = config.compilerOptions.outDir;

// const apiImplementationDir = '../../api-implementation';
// const packageJsonFile = './package.json';
// const packageJson = require(`${packageJsonFile}`);

// const inputApiSpecFile = `${apiImplementationDir}/server/common/api.yml`;
// // const workingDir = "./tmp";
// const outputSrcDir = `./src`;
// const outputApiSpecFile = `${outputSrcDir}/api.yml`;

// const loadYamlFileAsJson = (apiSpecPath: string): any => {
//     const b: Buffer = fs.readFileSync(apiSpecPath);
//     return yaml.load(b.toString());
// }
// const prepare = () => {
//     s.rm('-rf', outDir);
//     s.mkdir('-p', outDir);
//     // s.rm('-rf', workingDir);
//     // s.mkdir('-p', workingDir);
//     s.rm('-rf', outputSrcDir);
//     s.mkdir('-p', outputSrcDir);
//     s.cp(`${inputApiSpecFile}`, `${outputApiSpecFile}`);
// }
// const updateVersion = () => {
//     let apiSpec = loadYamlFileAsJson(inputApiSpecFile);
//     let version = apiSpec.info.version;

//     // test: take out again
//     version = '0.0.9';

//     packageJson.version = version;
//     let newPackageJsonString = JSON.stringify(packageJson, null, 2);
//     s.cp(`${packageJsonFile}`, `.package.json`);
//     fs.writeFileSync(packageJsonFile, newPackageJsonString);
// }
// const generateCode = () => {
//     OpenAPI.generate({
//         input: inputApiSpecFile,
//         output: outputSrcDir,
//         httpClient: HttpClient.NODE
//     })
//         .then(() => {
//             return;
//         })
//         .catch((error: any) => {
//             console.log(error);
//             process.exit(1);
//         });

// }

// import path from 'path';
import { PlatformAPIClient } from './platformapiclient';
import type { Organization } from '@solace-iot-team/platform-api-openapi';
import { PlatformManagementService, Environment, EnvironmentsService } from '@solace-iot-team/platform-api-openapi';

const getMandatoryEnvVarValue = (envVar: string): string => {
    const value: any = (process.env[envVar] === undefined) ? null : process.env[envVar];
    if (value == null) throw new Error(`>>> ERROR: missing env var: ${envVar}`);
    return value;
}

const sampleEnv = {
    PLATFORM_PROTOCOL: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_PLATFORM_PROTOCOL'),
    PLATFORM_HOST: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_PLATFORM_HOST'),
    PLATFORM_PORT: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_PLATFORM_PORT'),
    PLATFORM_ADMIN_USER: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER'),
    PLATFORM_ADMIN_PASSWORD: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD'),
    ORG_API_USR: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_ORG_API_USR'),
    ORG_API_PWD: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_ORG_API_PWD'),
    SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN'),
    SOLACE_CLOUD_SERVICE_ID: getMandatoryEnvVarValue('APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID'),
    ORG_NAME: "sample-org",
    ENV_NAME: "dev-env"
  }

const initializeOpenAPI = () => {
    const base: string = PlatformAPIClient.getBaseUrl(sampleEnv.PLATFORM_PROTOCOL, sampleEnv.PLATFORM_HOST, sampleEnv.PLATFORM_PORT);
    PlatformAPIClient.initialize(base, sampleEnv.PLATFORM_ADMIN_USER, sampleEnv.PLATFORM_ADMIN_PASSWORD, sampleEnv.ORG_API_USR, sampleEnv.ORG_API_PWD);  
}

const deleteOrg = async() => {
    console.log('deleting org ...');
    PlatformAPIClient.setManagementUser();
    try {
        await PlatformManagementService.deleteOrganization(sampleEnv.ORG_NAME);
    } catch(e) {
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
        let response: Organization = await PlatformManagementService.createOrganization(request);
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
        serviceId: sampleEnv.SOLACE_CLOUD_SERVICE_ID
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
    PlatformAPIClient.setApiUser();
    
    TODO

    let request: Environment = {
        name: sampleEnv.ENV_NAME,
        description: 'development solace cloud service',
        serviceId: sampleEnv.SOLACE_CLOUD_SERVICE_ID
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

const main = async() => {
    initializeOpenAPI();
    await deleteOrg();
    await createOrg();
    await registerSolaceCloudServiceWithOrg();
    await createApi();
    await deleteOrg();
}

main();



