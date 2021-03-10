import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir('-p', outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/server/common/swagger`);
s.cp('server/common/api.yml', `${outDir}/server/common/api.yml`);
