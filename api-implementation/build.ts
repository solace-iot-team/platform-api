import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

const prepare = () => {
    if(s.rm('-rf', outDir).code !== 0) process.exit(1);
    if(s.mkdir('-p', outDir).code !== 0) process.exit(1);    
}
const copyAssets = () => {
    if(s.mkdir('-p', `${outDir}/server/common`).code !== 0) process.exit(1);
    // open api spec
    if(s.cp('server/common/api.yml', `${outDir}/server/common/api.yml`).code !== 0) process.exit(1);    
    // public 
    if(s.cp('-rf', 'public', `${outDir}/public`).code !== 0) process.exit(1);
}
const main = () => {
    prepare();
    copyAssets();
}

main();