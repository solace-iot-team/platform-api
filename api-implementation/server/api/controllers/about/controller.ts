import { NextFunction, Request, Response } from 'express';
import About = Components.Schemas.About;
import fs from 'fs';

export class Controller {
  about(req: Request, res: Response, next: NextFunction): void {
    var useProxyModeStr = process.env.APIS_PROXY_MODE || 'false';
    var useProxyMode: boolean = (useProxyModeStr.toLowerCase() == 'true') || (useProxyModeStr.toLowerCase() == '1');
    let response: About = {
      APIS_PROXY_MODE: useProxyMode,
      version: loadAboutJSON(),
    }

    res.json(response);
  }


}
export default new Controller();

const loadAboutJSON = function loadAboutJson(): any {
    try {
      var fileName = './public/about.json';
      var regFile = fs.readFileSync(fileName, 'utf8');
      let obj = JSON.parse(regFile);
     return obj;
    } catch (e) {
      return null;
    }
  }