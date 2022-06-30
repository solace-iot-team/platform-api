import JobService from '../../services/job.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {

    JobService.all(req.query['status'] as string).then((r) => {
      res.status(200).json(r);
    }).catch((e) => {
      next(e)
    });
  }


}
export default new Controller();
