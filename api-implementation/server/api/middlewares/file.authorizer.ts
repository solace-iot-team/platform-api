import L from '../../common/logger';
import basicAuth from 'express-basic-auth';
import fs from 'fs';

let userRegistry = null;
setInterval(loadUserRegistry, 60*1000);

export default function fileAuthorizer(
  username: string, password: string
): boolean {
  if (userRegistry === null) {
    loadUserRegistry();
    
  }
  L.debug(`Authorizing ${username}`);
  var secret = userRegistry[username];
  if (secret ===null || secret === undefined){
    L.debug(`Unknown principal ${username}`);
    return false;
  }
  const passwordMatches = basicAuth.safeCompare(password, secret);
  L.debug(`Password valid ${passwordMatches}`);
  return passwordMatches;
}

export function loadUserRegistry(){
  try {
    var fileName = process.env.FILE_USER_REGISTRY || 'example-users.json';
    var regFile = fs.readFileSync(fileName,'utf8');
    userRegistry = JSON.parse(regFile);
    L.info(`Loaded user registry from ${fileName}, number of users: ${Object.keys(userRegistry).length}`);
  } catch (e){
    L.error(e, `Error loading user registry from ${fileName}`);
  }
}
