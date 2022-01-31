import L from './logger';

export default function(body, encoding){
  let str: string;
  L.info(body.constructor.name);
  if (body.constructor.name=="Buffer"){
    str = body.toString('utf-8');
  } else {
    str = JSON.stringify(body);
  }
  
  const seed = 2;
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    const hsh = 4294967296 * (2097151 & h2) + (h1>>>0);
    L.info(`etag value ${hsh}`);
    return hsh;  
}