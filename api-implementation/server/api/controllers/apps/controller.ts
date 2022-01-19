import L from '../../../common/logger';
import AppsService from '../../services/apps.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import AsyncAPIHelper from '../../../../src/asyncapihelper'

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    let q: any = {
    };
    if (req.query.status) {
      q.status = req.query.status;
    }
    AppsService.list(q)
      .then((r) => res.json(r))
      .catch(e => {
        L.error(e);
        next(e);
      });
  }

  allApis(req: Request, res: Response, next: NextFunction): void {
    AppsService.apiList(req.params['app'])
      .then((r) => res.json(r))
      .catch(e => {
        L.error(e);
        next(e);
      });
  }

  apiByName(req: Request, res: Response, next: NextFunction): void {
    AppsService.apiByName(req.params['app'], req.params['name'])
      .then((r) => {
        AsyncAPIHelper.handleResponse(r, req, res, next);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  byName(req: Request, res: Response, next: NextFunction): void {
    const topicSyntax = req.query['topicSyntax']as TopicSyntax;
    L.info(`topic syntax ${topicSyntax}`);
    AppsService.byName(req.params['name'], topicSyntax)
      .then((r) => {
        if (r != null) {
          res.json(r);
        } else {
          next(new ErrorResponseInternal(404, `Not found`));
        }
      }).catch((e) => {
        L.error(e);
        next(e);
      });
  };

    statusByName(req: Request, res: Response, next: NextFunction): void {
    AppsService.statusByName(req.params['name'])
      .then((r) => {
        if (r != null) {
          res.json(r);
        } else {
          next(new ErrorResponseInternal(404, `Not found`));
        }
      }).catch((e) => {
        L.error(e);
        next(e);
      });
  };

}
export default new Controller();
