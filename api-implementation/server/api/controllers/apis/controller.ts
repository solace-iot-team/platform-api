import L from '../../../common/logger';import ApisService from '../../services/apis.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ApisService.all().then((r) => res.json(r));
  }

  byName(req: Request, res: Response): void {
    ApisService.byName(req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
 create(req: Request, res: Response): void {
    ApisService.create(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      res.status(e).end()
    });
  }


  update(req: Request, res: Response): void {
    ApisService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      L.info(e);
      res.status(e).end()
    });
  }

  delete(req: Request, res: Response): void {
    ApisService.delete(req.params['name']).then((r) => {
      res.status(r).end();
    }).catch((e) => {
      res.status(e).end();
    });
  }


}
export default new Controller();
