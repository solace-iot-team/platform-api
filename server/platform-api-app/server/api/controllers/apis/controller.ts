import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ExamplesService.all().then((r) => res.json(r));
  }

  byName(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['name']);
    ExamplesService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

}
export default new Controller();
