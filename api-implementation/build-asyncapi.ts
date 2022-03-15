import path from 'path';
import * as asyncapi from './tools/asyncapi-generator/index';

const scriptDir: string = path.dirname(__filename);

const openApiSpecFile = `${scriptDir}/server/common/api.yml`;
const outputDirectory = `${scriptDir}/public/notification-api`;

const serverBaseUrl = '/v1';
const channelPrefix = 'apc';

const main = () => {

  asyncapi.generate({
    input: openApiSpecFile,
    output: `${outputDirectory}/producer`,
    outputFormat: 'yaml',
    baseUrl: serverBaseUrl,
    channelPrefix: channelPrefix,
    channelOperation: 'subscribe',
    messagePath: 'responses/2XX',
    split: false,
  });

  console.log("Created AsyncAPI specifications for notifications producer");

  asyncapi.generate({
    input: openApiSpecFile,
    output: `${outputDirectory}/consumer`,
    outputFormat: 'yaml',
    baseUrl: serverBaseUrl,
    channelPrefix: channelPrefix,
    channelOperation: 'publish',
    messagePath: 'responses/2XX',
    split: true,
  });

  console.log("Created AsyncAPI specifications for notifications consumer");
}

main();
