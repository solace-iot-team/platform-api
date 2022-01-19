import { NextFunction, Request, Response } from 'express';
import About = Components.Schemas.About;
import fs from 'fs';
import path from 'path';
import L from '../../../common/logger';

export class Controller {
  about(req: Request, res: Response, next: NextFunction): void {
    let useProxyModeStr = process.env.APIS_PROXY_MODE || 'false';
    let useProxyMode: boolean = (useProxyModeStr.toLowerCase() == 'true') || (useProxyModeStr.toLowerCase() == '1');
    let response: About = {
      APIS_PROXY_MODE: useProxyMode,
      version: loadAboutJSON(),
    }

    res.json(response);
  }


}
export default new Controller();

const projectPath = path.normalize(__dirname + '../../../../..');
const loadAboutJSON = function loadAboutJson(): any {
    try {
      let fileName = projectPath + '/public/about.json';
      L.info(fileName);
      let regFile = fs.readFileSync(fileName, 'utf8');
      let obj = JSON.parse(regFile);
     return obj;
    } catch (e) {
      return null;
    }
  }