import TeamsService from '../../services/teams.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    TeamsService.all().then((r) => res.json(r)).catch((e) => next(e));
    ;
  }

  create(req: Request, res: Response, next: NextFunction): void {
    TeamsService.create(req.body)
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
    TeamsService.update(req.params['name'], req.body)
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
    TeamsService
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
    TeamsService.delete(req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }


  // team apps
  allApps(req: Request, res: Response, next: NextFunction): void {
    let q: any = {
    };
    if (req.query.status) {
      q.status = req.query.status;
    }
    TeamsService.allTeamsApps(req.params['team'], q)
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }
  appByName(req: Request, res: Response, next: NextFunction): void {
    TeamsService.appByName(req.params['team'], req.params['name'], req.query['topicSyntax'] as TopicSyntax)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }
  createApp(req: Request, res: Response, next: NextFunction): void {
    TeamsService.createApp(req.params['team'], req.body)
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
    TeamsService.updateApp(req.params['team'], req.params['name'], req.body)
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
    TeamsService.deleteApp(req.params['team'], req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

  // webhooks
  allAppWebHooks(req: Request, res: Response, next: NextFunction): void {

    TeamsService.allAppWebHooks(req.params['team'], req.params['name'])
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }

  createWebHook(req: Request, res: Response, next: NextFunction): void {
    TeamsService.createWebHook(req.params['team'], req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }

  webHookByName(req: Request, res: Response, next: NextFunction): void {
    TeamsService.webHookByName(req.params['team'], req.params['app'], req.params['name'])
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }
  updateWebHook(req: Request, res: Response, next: NextFunction): void {
    TeamsService.updateWebHook(req.params['team'], req.params['app'], req.params['name'], req.body)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

    deleteWebHook(req: Request, res: Response, next: NextFunction): void {
    TeamsService.deleteWebHook(req.params['team'], req.params['app'], req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

  /** credentials */

  allAppCredentials(req: Request, res: Response, next: NextFunction): void {
    TeamsService.allAppCredentials(req.params['team'], req.params['name'])
      .then((r) => {
        res.json(r);
      })
      .catch((e) => next(e));
    ;
  }
  createCredentials(req: Request, res: Response, next: NextFunction): void {
    TeamsService.requestCredentials(req.params['team'], req.params['name'], req.body)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        }
        else
          next(new ErrorResponseInternal(500, `No response`));
      })
      .catch((e) => next(e));
  }

  updateCredentials(req: Request, res: Response, next: NextFunction): void {
    TeamsService.updateCredentials(req.params['team'], req.params['app'], req.params['name'], req.body)
      .then((r) => {
        if (r) res.json(r);
        else next(new ErrorResponseInternal(404, `Not found`));
      })
      .catch((e) => next(e));
  }

  deleteCredentials(req: Request, res: Response, next: NextFunction): void {
    TeamsService.deleteCredentials(req.params['team'], req.params['app'], req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }


  /**
   * Attributes resource
   */
  attributeByName(req: Request, res: Response, next: NextFunction): void {
    TeamsService.attributeByName(req.params['team'], req.params['app'], req.params['attributeName'])
      .then((r) => {
        res.status(200).json(r);
      })
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };
  createAttribute(req: Request, res: Response, next: NextFunction): void {
    TeamsService.createAttribute(req.params['team'], req.params['app'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  updateAttribute(req: Request, res: Response, next: NextFunction): void {
    TeamsService.updateAttribute(req.params['team'], req.params['app'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  deleteAttribute(req: Request, res: Response, next: NextFunction): void {
    TeamsService.deleteAttribute(req.params['team'], req.params['app'], req.params['attributeName']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }

}
export default new Controller();
