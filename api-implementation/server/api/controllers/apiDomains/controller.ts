import ApiDomainsService from '../../services/apiDomains.service';
import { NextFunction, Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    ApiDomainsService.all().then((r) => res.json(r)).catch((e) => next(e));
    ;
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    ApiDomainsService.byName(req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    }).catch((e) => next(e));
  }

}
export default new Controller();
