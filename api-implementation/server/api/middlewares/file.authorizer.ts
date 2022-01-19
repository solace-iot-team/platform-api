import L from '../../common/logger';
import fs from 'fs';
import { User } from '../../../src/model/user';
import { timingSafeEqual } from 'crypto';
let userRegistry = null;
setInterval(loadUserRegistry, 60 * 1000);

export default function fileAuthorizer(
  username: string, password: string
): User {
  if (userRegistry === null) {
    loadUserRegistry();

  }
  L.debug(`Authorizing ${username}`);
  const user = userRegistry[username];
  if (user === undefined) {
    return null;
  }
  let secret = userRegistry[username].password;
  if (secret === null || secret === undefined) {
    L.debug(`Unknown principal ${username}`);
    return null;
  }
  const passwordMatches = safeCompare(password, secret);
  L.debug(`Password valid ${passwordMatches}`);
  if (passwordMatches) {
    const user: User = {
      groups: null,
      jwt: null,
      name: username,
      scopes: '',
      sub: username,
      roles: userRegistry[username].roles,
    }
    return user;
  } else {
    return null;
  }
}

export function loadUserRegistry() {
  let fileName = process.env.FILE_USER_REGISTRY || 'example-users.json';
  try {
    
    let regFile = fs.readFileSync(fileName, 'utf8');
    userRegistry = JSON.parse(regFile);
    L.info(`Loaded user registry from ${fileName}, number of users: ${Object.keys(userRegistry).length}`);
  } catch (e) {
    L.error(e, `Error loading user registry from ${fileName}`);
  }
}

function safeCompare(userInput, secret) {
  const userInputLength = Buffer.byteLength(userInput);
  const secretLength = Buffer.byteLength(secret);

  const userInputBuffer = Buffer.alloc(userInputLength, 0, 'utf8');
  userInputBuffer.write(userInput);
  const secretBuffer = Buffer.alloc(userInputLength, 0, 'utf8');
  secretBuffer.write(secret);

  return !!(timingSafeEqual(userInputBuffer, secretBuffer) && userInputLength === secretLength);
}
