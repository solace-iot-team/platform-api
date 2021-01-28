import OrganizationsService from '../../services/organizations.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    OrganizationsService.all().then((r) => res.json(r)).catch((e) => next(e));
    ;
  }

  create(req: Request, res: Response, next: NextFunction): void {
    OrganizationsService.create(req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else 
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));

  }


  update(req: Request, res: Response, next: NextFunction): void {
    OrganizationsService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));

  }
  byName(req: Request, res: Response, next: NextFunction): void {
    OrganizationsService.byName(req.params['name']).then((r) => {
      if (r) 
        res.status(200).json(r);
      else 
        next(new ErrorResponseInternal(404, `No response`));
    }).catch((e) => {
      L.debug(e);
      next(e);
    });

  }

  delete(req: Request, res: Response, next: NextFunction): void {
    OrganizationsService.delete(req.params['name']).then((r) => {
      res.status(r).end();
    }).catch((e) => next(e));

  }

}
export default new Controller();
