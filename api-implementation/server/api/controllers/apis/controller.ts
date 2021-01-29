import L from '../../../common/logger'; import ApisService from '../../services/apis.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class Controller {
  all(req: Request, res: Response): void {
    ApisService.all().then((r) => res.json(r));
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    ApisService.byName(req.params['name']).then((r) => {
      if (r) res.json(r).send();
      else
        next(new ErrorResponseInternal(404, `Not found`));
    }).catch((e) => next(e));
  }
  create(req: Request, res: Response, next: NextFunction): void {
    ApisService.create(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(201).json(r).send();
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    ApisService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r).send();
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    ApisService.delete(req.params['name']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }


}
export default new Controller();
