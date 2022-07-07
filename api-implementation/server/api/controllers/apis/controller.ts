import L from '../../../common/logger'; import ApisService from '../../services/apis.service';
import { NextFunction, Request, Response } from 'express';
import AsyncAPIHelper from '../../../../src/asyncapihelper'
import ApiListFormat = Components.Parameters.ApiListFormat.Format;

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    ApisService.all(req.query['format'] as ApiListFormat).then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  byName(req: Request, res: Response, next: NextFunction): void {
    ApisService.byName(req.params['name'])
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 200, req.params['name']);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  infoByName(req: Request, res: Response, next: NextFunction): void {
    ApisService.infoByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  apiProductsByName(req: Request, res: Response, next: NextFunction): void {
    ApisService.apiProductsByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  apiProductsByVersion(req: Request, res: Response, next: NextFunction): void {
    ApisService.apiProductsByVersion(req.params['name'], req.params['version'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  create(req: Request, res: Response, next: NextFunction): void {
    ApisService.create(req.params['name'], req.body)
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 201, req.params['name']);
      })
      .catch((e) => next(e));
  }

  import(req: Request, res: Response, next: NextFunction): void {
    ApisService.import(req.body)
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 201);
      })
      .catch((e) => next(e));
  }

  update(req: Request, res: Response, next: NextFunction): void {
    ApisService.update(req.params['name'], req.body)
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 200, req.params['name']);
      })
      .catch((e) => next(e));
  }

  updateInfo(req: Request, res: Response, next: NextFunction): void {
    ApisService.updateInfo(req.params['name'], req.body)
      .then((r) => {
        res.json(r);
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
  allRevisions(req: Request, res: Response, next: NextFunction): void {
    ApisService.revisionList(req.params['name'])
      .then((r) => res.json(r))
      .catch(e => {
        L.error(e);
        next(e);
      });
  }
  revisionByVersion(req: Request, res: Response, next: NextFunction): void {
    ApisService.revisionByVersion(req.params['name'], req.params['version'])
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 200, `${req.params['name']}-${req.params['version']}`);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  infoByVersion(req: Request, res: Response, next: NextFunction): void {
    ApisService.infoByVersion(req.params['name'], req.params['version'])
      .then((r) => {
        res.json(r);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  updateInfoByVersion(req: Request, res: Response, next: NextFunction): void {
    ApisService.updateVersionInfo(req.params['name'], req.params['version'], req.body)
      .then((r) => {
        res.json(r);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

}
export default new Controller();
