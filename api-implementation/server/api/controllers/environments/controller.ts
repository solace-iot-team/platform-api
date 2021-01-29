import EnvironmentsService from '../../services/environments.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    EnvironmentsService.all().then((r) => res.json(r));
  }

  create(req: Request, res: Response, next: NextFunction): void {
    EnvironmentsService.create(req.body).then((r) => {
      if (r) {
        res.status(201).json(r).send();
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    EnvironmentsService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r).send();
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  byName(req: Request, res: Response, next: NextFunction): void {
    EnvironmentsService.byName(req.params['name']).then((r) => {
      if (r) res.json(r).send();
      else
        next(new ErrorResponseInternal(404, `Not found`));
    }).catch((e) => next(e));
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    EnvironmentsService.delete(req.params['name']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }

}
export default new Controller();
