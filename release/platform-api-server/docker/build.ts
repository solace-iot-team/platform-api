import s from 'shelljs';
import path from 'path';

const scriptDir: string = __dirname;
const scriptName: string = path.basename(__filename);
const sourceApiImplementationDir = '../../../api-implementation';
const workingDir = "./tmp";
const workingApiImplmentationDir = `${workingDir}/api-implementation`;
const dockerAssetDir = './assets';
const dockerFile = './Dockerfile';
const dockerContextDir = `${workingDir}/docker-context`;
const dockerContextApiImplementationDir = `${dockerContextDir}/api-implementation`;
const packageJson = require(`${workingApiImplmentationDir}/package.json`);
const dockerImageName = packageJson.name;
const dockerImageTag = `${dockerImageName}:${packageJson.version}`;
const dockerImageTagLatest = `${dockerImageName}:latest`;

const dockerContextInclude = [
    'dist',
    'node_modules',
    '.env'
]
const dockerContextAssetsInclude = [
    'example-users.json',
    'start.server.sh'
]
const prepare = () => {
    if(s.rm('-rf', workingDir).code !== 0) process.exit(1);
    if(s.mkdir('-p', workingDir).code !== 0) process.exit(1);
    if(s.cp('-rf', sourceApiImplementationDir, workingApiImplmentationDir).code !== 0) process.exit(1);
}
const compile = () => {
    if(s.cd(workingApiImplmentationDir).code !== 0) process.exit(1);
    if(s.exec('npm install').code !== 0) process.exit(1);
    if(s.exec('npm run server:build').code !== 0) process.exit(1);
    if(s.exec('npm prune --production --json').code !== 0) process.exit(1);
    if(s.cd(scriptDir).code !== 0) process.exit(1);
}
const buildDockerContext = () => {
    console.log(`[${scriptName}]: building docker context ...`);
    if(s.mkdir('-p', dockerContextApiImplementationDir).code !== 0) process.exit(1);
    for(let include of dockerContextInclude) {
        let includeFile = `${workingApiImplmentationDir}/${include}`;
        console.log(`include = ${includeFile}`);
        if(s.cp('-rf', `${includeFile}`, dockerContextApiImplementationDir).code !== 0) process.exit(1);
    }
    for(let include of dockerContextAssetsInclude) {
        let includeFile = `${dockerAssetDir}/${include}`;
        console.log(`include = ${includeFile}`);
        if(s.cp('-rf', `${includeFile}`, dockerContextApiImplementationDir).code !== 0) process.exit(1);
    }
}
const removeDockerContainersByImageName = () => {
    console.log(`[${scriptName}]: removing any existing containers for image: ${dockerImageName}`);
    let cmd = `docker ps | awk '{split($2,image,":"); print $1, image[1]}' | awk -v image=${dockerImageName} '$2 == image {print $1}'`;
    let {stdout, stderr, code } = s.exec(cmd, { silent: false });
    if(code !== 0) process.exit(1);
    let containerIds: string[] = stdout.split("\n");
    for(let containerId of containerIds) {
        if(containerId.length > 0) {
            console.log(`remove containerId = '${containerId}'`);
            if(s.exec(`docker rm -f ${containerId}`, { silent: false }).code !== 0) process.exit(1);
        }
    }
}
const buildDockerImage = () => {
    console.log(`[${scriptName}]: removing any existing images, tags=${dockerImageTag}, ${dockerImageTagLatest}`);
    if(s.exec(`docker rmi -f ${dockerImageTag} ${dockerImageTagLatest}`, { silent: true }).code !== 0) process.exit(1);
    
    console.log(`[${scriptName}]: building new image, tags=${dockerImageTag}, ${dockerImageTagLatest}`);
    // if(s.exec(`docker build --no-cache --build-arg PLATFORM_API_SERVER_NAME=${dockerImageName} --tag ${dockerImageTag} -f ${dockerFile} ${workingApiImplmentationDir}`).code !== 0) process.exit(1);
    if(s.exec(`docker build --no-cache --tag ${dockerImageTag} -f ${dockerFile} ${dockerContextDir}`).code !== 0) process.exit(1);
    if(s.exec(`docker tag ${dockerImageTag} ${dockerImageTagLatest}`).code !== 0) process.exit(1);
}
const main = () => {

    prepare();
    compile();
    buildDockerContext();
    removeDockerContainersByImageName();
    buildDockerImage();
}

main();
