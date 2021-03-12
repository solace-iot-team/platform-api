import { NextFunction, Request, Response } from 'express';
import SolaceCloudFacade from '../../../../src/solacecloudfacade';

export class Controller {
  services(req: Request, res: Response, next: NextFunction): void {
    SolaceCloudFacade.getServices()
      .then((r) => res.json(r).status(200).send())
      .catch((e) => next(e));
  }
}
export default new Controller();
