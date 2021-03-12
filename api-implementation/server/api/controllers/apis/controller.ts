import L from '../../../common/logger'; import ApisService from '../../services/apis.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import Format = Paths.$OrganizationApis$ApiName.Get.Parameters.Format;
import AsyncAPIHelper from '../../../../src/asyncapihelper'

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    ApisService.all().then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    ApisService.byName(req.params['name'])
      .then((r) => {
        Controller.handleResponse(r, req, res, next);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };


  create(req: Request, res: Response, next: NextFunction): void {
    ApisService.create(req.params['name'], req.body)
      .then((r) => {
        Controller.handleResponse(r, req, res, next, 201);
      })
      .catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    ApisService.update(req.params['name'], req.body)
      .then((r) => {
        Controller.handleResponse(r, req, res, next);
      })
      .catch((e) => next(e));
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    ApisService.delete(req.params['name'])
      .then((r) => {
        res.status(r).send();
      })
      .catch((e) => next(e));
  }

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
