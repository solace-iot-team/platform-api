import express, { NextFunction, Request, Response, response } from 'express';
import fetch from 'node-fetch';
import https from 'https';
import L from './logger';

const ENV_PREFIX_DISCOVERY = 'AUTH_DISCOVERY';


const redirect = function (req: Request, res: Response, next: NextFunction): void {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  fetch(process.env[`${ENV_PREFIX_DISCOVERY}_OIDC_URL`], {agent}).then(response => {
    response.json().then(j => res.json(j)).catch(e=>{
      res.status(404).send();
    });
  }
  ).catch(e => {
    L.warn(e);
    res.status(404).send();
  });

}
export default express
  .Router()
  .get('/.well-known/openid-configuration', redirect);
