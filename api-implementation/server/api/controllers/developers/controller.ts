import DevelopersService from '../../services/developers.service';
import { Request, Response } from 'express';
import L from '../../../common/logger';

export class Controller {
  all(req: Request, res: Response): void {
    DevelopersService.all().then((r) => res.json(r));
  }

  create(req: Request, res: Response): void {
    DevelopersService.create(req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      res.status(e).end()
    });
  }


  update(req: Request, res: Response): void {
    DevelopersService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      res.status(e).end()
    });
  }
  byName(req: Request, res: Response): void {
    DevelopersService.byName(req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    }).catch((e) => {
      res.status(e).end();
    });
  }

  delete(req: Request, res: Response): void {
    DevelopersService.delete(req.params['name']).then((r) => {
      res.status(r).end();
    }).catch((e) => {
      
      res.status(e).end();
    });
  }


  // developer apps
  allApps(req: Request, res: Response): void {
    DevelopersService.allDevelopersApps(req.params['developer']).then((r) => res.json(r));
  }
  appByName(req: Request, res: Response): void {
    DevelopersService.appByName(req.params['developer'], req.params['name']).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    }).catch((e) => {
      res.status(e).end();
    });
  }
  createApp(req: Request, res: Response): void {
    DevelopersService.createApp(req.params['developer'],req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      L.error(`Error in createApp ${e}`);
      res.status(e).send("");
    });
  }

  updateApp(req: Request, res: Response): void {
    DevelopersService.updateApp(req.params['developer'], req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else res.status(500).end();
    }).catch((e) => {
      res.status(e).end()
    });
  }  

   deleteApp(req: Request, res: Response): void {
    DevelopersService.deleteApp(req.params['developer'], req.params['name']).then((r) => {
      res.status(r).end();
    }).catch((e) => {
      res.status(e).end();
    });
  } 
}
export default new Controller();
