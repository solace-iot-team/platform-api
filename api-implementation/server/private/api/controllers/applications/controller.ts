import L from '../../../../common/logger'; 
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../../../api/middlewares/error.handler';
import applicationService from '../../services/application.service';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
  }

  byName(req: Request, res: Response, next: NextFunction): void {
  };

  import(req: Request, res: Response, next: NextFunction): void {
    applicationService.import(req.body)
      .then(async (r) => {
        res.json(r);
      })
      .catch((e) => next(e));
  }

  update(req: Request, res: Response, next: NextFunction): void {
  }

  delete(req: Request, res: Response, next: NextFunction): void {
  }
  allRevisions(req: Request, res: Response, next: NextFunction): void {
  }
  
}
export default new Controller();
