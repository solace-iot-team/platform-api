import ImportersService from '../../services/importer.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    ImportersService.all().then((r) => res.json(r));
  }

  allTypes(req: Request, res: Response, next: NextFunction): void {
    ImportersService.allImporterTypes().then((r) => res.json(r));
  }

  create(req: Request, res: Response, next: NextFunction): void {
    ImportersService.create(req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    ImportersService.update(req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(200).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }
  byName(req: Request, res: Response, next: NextFunction): void {
    ImportersService.byName(req.params['name'])
      .then((r) => {
        if (r) res.json(r);
        else
          next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    ImportersService.delete(req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

  run(req: Request, res: Response, next: NextFunction): void {
    ImportersService.run(req.params['name'])
      .then((r) => {
        if (r) res.json(r);
        else
          next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

}
export default new Controller();
