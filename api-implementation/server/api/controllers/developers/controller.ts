import DevelopersService from '../../services/developers.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.all().then((r) => res.json(r)).catch((e) => next(e));
    ;
  }

  create(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.create(req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.update(req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(200).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }
  byName(req: Request, res: Response, next: NextFunction): void {
    L.info("dev by name");
    DevelopersService
      .byName(req.params['name'])
      .then((r) => {
        if (r) {
          res.json(r);
        } else {
          next(new ErrorResponseInternal(404, `Not found`));
        }
      })
      .catch((e) => {
        next(e)
      });
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.delete(req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }


  // developer apps
  allApps(req: Request, res: Response, next: NextFunction): void {
    let q: any = {
    };
    if (req.query.status) {
      q.status = req.query.status;
    }
    DevelopersService.allDevelopersApps(req.params['developer'], q)
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }
  appByName(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.appByName(req.params['developer'], req.params['name'], req.query['topicSyntax'] as TopicSyntax)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }
  createApp(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.createApp(req.params['developer'], req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }

  updateApp(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.updateApp(req.params['developer'], req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(200).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }

  deleteApp(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.deleteApp(req.params['developer'], req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

  // webhooks
  allAppWebHooks(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.allAppWebHooks(req.params['developer'], req.params['name'])
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }
  webHookByName(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.webHookByName(req.params['developer'], req.params['app'], req.params['name'])
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }

  createWebHook(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.createWebHook(req.params['developer'], req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }

  updateWebHook(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.updateWebHook(req.params['developer'], req.params['app'], req.params['name'], req.body)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

  deleteWebHook(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.deleteWebHook(req.params['developer'], req.params['app'], req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

  /**
   * Attributes resource
   */
  attributeByName(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.attributeByName(req.params['developer'], req.params['app'], req.params['attributeName'])
      .then((r) => {
        res.status(200).json(r);
      })
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };
  createAttribute(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.createAttribute(req.params['developer'], req.params['app'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  updateAttribute(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.updateAttribute(req.params['developer'], req.params['app'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  deleteAttribute(req: Request, res: Response, next: NextFunction): void {
    DevelopersService.deleteAttribute(req.params['developer'], req.params['app'], req.params['attributeName']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }


}
export default new Controller();
