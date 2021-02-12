import L from '../../../common/logger';
import ApisService from '../../services/apis.service';
import AppsService from '../../services/apps.service';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import Format = Paths.$OrganizationApis$ApiName.Get.Parameters.Format;
import AsyncAPIHelper from '../../../../src/asyncapihelper'
import { resolve } from 'path';
import { Paging } from '../../services/persistence.service';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    var p: Paging = {
      pageNumber: parseInt(req.query.pageNumber as string),
      pageSize: parseInt(req.query.pageSize as string)
    };
    var q: any = {

    }
    if (req.query.status) {
      q.status = req.query.status;
    }
    AppsService.list(p, q).then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  allApis(req: Request, res: Response, next: NextFunction): void {
    AppsService.apiList(req.params['app']).then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  async apiByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    return new Promise<any>(async (reject, resolve) => {
      var r: string = await AppsService.apiByName(req.params['app'], req.params['name']);
      Controller.handleResponse(r, req, res, next);
      resolve();
    }).catch((e) => {
      L.error(e);
      next(e);
      resolve();
    });
  };

  async byName(req: Request, res: Response, next: NextFunction): Promise<void> {
    return new Promise<any>(async (reject, resolve) => {
      var r = await AppsService.byName(req.params['name']);
      if (r != null) {
        res.json(r).send();
      } else {
        next(new ErrorResponseInternal(404, `Not found`));
      }
      resolve();
    }).catch((e) => {
      L.error(e);
      next(e);
      resolve();
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
