import ApiDomainsService from '../../services/apiDomains.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import L from '../../../common/logger';
export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    ApiDomainsService.all()
      .then((r) => res.json(r).send())
      .catch((e) => next(e));
    ;
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    ApiDomainsService.byName(req.params['name'])
      .then((r) => {
        L.debug(r);
        if (r) res.json(r).send();
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

}
export default new Controller();
