import EventPortalApisService from '../../services/eventPortalApis.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    let tags: string[] = [];
    const tagsParam: string = req.query['tags'] as string;
    if (tagsParam !=null){
      tags = tagsParam.split(',');
    }
    EventPortalApisService.all(tags, req.query['apiDomainName'] as string)
      .then((r) => res.json(r))
      .catch((e)=> next(e));
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    EventPortalApisService.byName(req.params['name'])
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, "Not found"));
      })
      .catch((e) => next(e));
  }

  specByName(req: Request, res: Response, next: NextFunction): void {
    let asyncAPIVersionParam = req.query.async_api_version;
    let asyncAPIVersion: string = '2.0.0';
    if (asyncAPIVersionParam) {
      asyncAPIVersion = asyncAPIVersionParam.toString();
    }
    EventPortalApisService.specByName(req.params['name'], asyncAPIVersion)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, "Not found"));
      })
      .catch((e) => next(e));
  }

}
export default new Controller();
