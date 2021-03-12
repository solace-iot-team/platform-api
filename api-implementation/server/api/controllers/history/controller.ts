import HistoryService from '../../services/history.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {

    HistoryService.all().then((r) => {
      res.status(200).json(r).end();
    }).catch((e) => {
      next(e)
    });
  }


}
export default new Controller();
