import HistoryService from '../../services/history.service';
import { Request, Response } from 'express';
import L from '../../../common/logger';
import { Paging } from '../../services/persistence.service';

export class Controller {
  all(req: Request, res: Response): void {
    var p : Paging = {
      pageNumber: parseInt(req.query.pageNumber as string),
      pageSize: parseInt(req.query.pageSize as string)
    };
    req.query
    HistoryService.all(p).then((r) => res.json(r));
  }


}
export default new Controller();
