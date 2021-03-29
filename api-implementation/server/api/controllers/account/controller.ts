import { NextFunction, Request, Response } from 'express';
import SolaceCloudFacade from '../../../../src/solacecloudfacade';

export class Controller {
  services(req: Request, res: Response, next: NextFunction): void {
    SolaceCloudFacade.getServices()
      .then((r) => res.json(r))
      .catch((e) => next(e));
  }
}
export default new Controller();
