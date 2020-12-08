import EventPortalApisService from '../../services/eventPortalApis.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    EventPortalApisService.all().then((r) => res.json(r));
  }

  byName(req: Request, res: Response): void {
    EventPortalApisService.byName(req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  specByName(req: Request, res: Response): void {
    let asyncAPIVersionParam = req.query.async_api_version;
    let asyncAPIVersion: string = '2.0.0';
    if (asyncAPIVersionParam){
      asyncAPIVersion = asyncAPIVersionParam.toString();
    }
    EventPortalApisService.specByName(req.params['name'], asyncAPIVersion).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    }).catch((e)=>{res.status(e).end()});
  }

}
export default new Controller();
