import express, { NextFunction, Request, Response, response } from 'express';
import fetch from 'fetch-with-proxy';
import https from 'https';
import L from './logger';

const ENV_PREFIX_DISCOVERY = 'AUTH_DISCOVERY';


const redirect = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  try {
    const response = await fetch(process.env[`${ENV_PREFIX_DISCOVERY}_OIDC_URL`], { agent });
    const j = await response.json();
    res.json(j);
  } catch (e) {
    L.warn(e);
    res.status(404).send();
  };

}
export default express
  .Router()
  .get('/.well-known/openid-configuration', redirect);
