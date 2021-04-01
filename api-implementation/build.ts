import s from 'shelljs';
import fs from 'fs';
import yaml from 'js-yaml';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;
const packageJson = require('./package.json');
const inputApiSpecFile = './server/common/api.yml';
let about: About;

type About = {
    name: string,
    homepage: string,
    repository: {
        type: string,
        url: string,
        revision: {
            sha1: string
        }
    },
    author: string,
    license: string,
    version: {
        'platform-api-openapi': string,
        'platform-api-server': string
    }
}
const loadYamlFileAsJson = (apiSpecPath: string): any => {
    const b: Buffer = fs.readFileSync(apiSpecPath);
    return yaml.load(b.toString());
}
const prepare = () => {
    if(s.rm('-rf', outDir).code !== 0) process.exit(1);
    if(s.mkdir('-p', outDir).code !== 0) process.exit(1);
}
const buildAbout = () => {
    let apiSpec = loadYamlFileAsJson(inputApiSpecFile);
    let sha1 = s.exec('git rev-parse HEAD').stdout.slice(0, -1);
    about = {
        name: packageJson.name,
        homepage: packageJson.homepage,
        author: packageJson.author,
        license: packageJson.license,
        version: {
            "platform-api-openapi": apiSpec.info.version,
            "platform-api-server": packageJson.version
        },
        repository: {
            type: packageJson.repository.type,
            url: packageJson.repository.url,
            revision: {
                sha1: sha1
            }
        }
    }
}
const copyAssets = () => {
    if(s.mkdir('-p', `${outDir}/server/common`).code !== 0) process.exit(1);
    // open api spec
    if(s.cp(`${inputApiSpecFile}`, `${outDir}/server/common/api.yml`).code !== 0) process.exit(1);
    // public
    if(s.cp('-rf', 'public', `${outDir}/public`).code !== 0) process.exit(1);
    try {
        fs.writeFileSync(`${outDir}/public/about.json`, JSON.stringify(about, null, 2));
    } catch(e) {
        console.log('error writing about file: ', JSON.stringify(e, null, 2));
        process.exit(1);
    }
}
const main = () => {
    prepare();
    buildAbout();
    copyAssets();

    s.exec(`cat ${outDir}/public/about.json`);

    process.exit(1);
}

main();
