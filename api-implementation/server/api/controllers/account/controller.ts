import { Request, Response } from 'express';
import SolaceCloudFacade from '../../../../src/solacecloudfacade';

export class Controller {
  services(req: Request, res: Response): void {
    SolaceCloudFacade.getServices().then((r) => res.json(r));
  }
}




export default new Controller();
