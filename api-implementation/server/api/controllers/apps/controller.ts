import L from '../../../common/logger';
import AppsService from '../../services/apps.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import Format = Paths.GetApi.Parameters.Format;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import AsyncAPIHelper from '../../../../src/asyncapihelper'

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    var q: any = {
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
        Controller.handleResponse(r, req, res, next);
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
          res.json(r).end();
        } else {
          next(new ErrorResponseInternal(404, `Not found`));
        }
      }).catch((e) => {
        L.error(e);
        next(e);
      });
  };
  static handleResponse(r, req, res, next, statusCode: number = 200) {

    if (r != null) {
      var contentType: Format = req.query['format'] as Format;
      L.info(contentType);
      if (contentType == "application/json") {
        if (AsyncAPIHelper.getContentType(r) == "application/json") {
          res.status(statusCode).contentType(contentType).send(r);
        } else {
          res.status(statusCode).contentType(contentType).send(AsyncAPIHelper.YAMLtoJSON(r));
        }
      } else if (contentType == "application/x-yaml") {
        if (AsyncAPIHelper.getContentType(r) == "application/x-yaml") {
          res.status(statusCode).contentType(contentType).send(r);
        } else {
          res.status(statusCode).contentType(contentType).send(AsyncAPIHelper.JSONtoYAML(r));
        }
      } else {
        res.status(statusCode).contentType(AsyncAPIHelper.getContentType(r)).send(r);
      }
    } else {
      next(new ErrorResponseInternal(404, `Not found`));
    }
  }


}
export default new Controller();
