import ApiDomainsService from '../../services/apiDomains.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ApiDomainsService.all().then((r) => res.json(r));
  }

  byName(req: Request, res: Response): void {
    ApiDomainsService.byName(req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

}
export default new Controller();
