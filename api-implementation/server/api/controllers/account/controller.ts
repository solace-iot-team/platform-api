import { NextFunction, Request, Response } from 'express';
import SolaceCloudService from '../../services/solace.cloud.service';

export class Controller {
  services(req: Request, res: Response, next: NextFunction): void {
    SolaceCloudService.all()
      .then((r) => res.json(r))
      .catch((e) => next(e));
  }
}
export default new Controller();
