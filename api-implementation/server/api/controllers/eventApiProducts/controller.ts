import L from '../../../common/logger'; 
import EventPortalFacade from '../../../../src/eventportalfacade';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import Format = Paths.GetApi.Parameters.Format;
import AsyncAPIHelper from '../../../../src/asyncapihelper'

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    EventPortalFacade.getEventApiProducts().then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  specById(req: Request, res: Response, next: NextFunction): void {
    EventPortalFacade.getEventApiProductAsyncApi(req.params['id'])
      .then((r) => {
        Controller.handleResponse(r, req, res, next);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  byId(req: Request, res: Response, next: NextFunction): void {
    EventPortalFacade.getEventApiProduct(req.params['id'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  static handleResponse(r, req, res, next, statusCode: number = 200) {

    if (r) {
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
