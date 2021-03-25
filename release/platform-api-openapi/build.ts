import s from 'shelljs';
import fs from 'fs';
import yaml from 'js-yaml';
import { HttpClient } from 'openapi-typescript-codegen';
const OpenAPI = require('openapi-typescript-codegen');
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

const apiImplementationDir = '../../api-implementation';
const packageJsonFile = './package.json';
const packageJson = require(`${packageJsonFile}`);

const inputApiSpecFile = `${apiImplementationDir}/server/common/api.yml`;
// const workingDir = "./tmp";
const outputSrcDir = `./src`;
const outputApiSpecFile = `${outputSrcDir}/api.yml`;

const loadYamlFileAsJson = (apiSpecPath: string): any => {
    const b: Buffer = fs.readFileSync(apiSpecPath);
    return yaml.load(b.toString());
}
const prepare = () => {
    s.rm('-rf', outDir);
    s.mkdir('-p', outDir);
    // s.rm('-rf', workingDir);
    // s.mkdir('-p', workingDir);
    s.rm('-rf', outputSrcDir);
    s.mkdir('-p', outputSrcDir);
    s.cp(`${inputApiSpecFile}`, `${outputApiSpecFile}`);
}
const updateVersion = () => {
    let apiSpec = loadYamlFileAsJson(inputApiSpecFile);
    let version = apiSpec.info.version;

    // test: take out again
    version = '0.0.10';

    packageJson.version = version;
    let newPackageJsonString = JSON.stringify(packageJson, null, 2);
    s.cp(`${packageJsonFile}`, `.package.json`);
    fs.writeFileSync(packageJsonFile, newPackageJsonString);
}
const generateCode = () => {
    OpenAPI.generate({
        input: inputApiSpecFile,
        output: outputSrcDir,
        httpClient: HttpClient.NODE
    })
        .then(() => {
            return;
        })
        .catch((error: any) => {
            console.log(error);
            process.exit(1);
        });

}

prepare();
updateVersion();
generateCode();
