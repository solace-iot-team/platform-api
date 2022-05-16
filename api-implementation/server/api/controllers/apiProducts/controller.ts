import ApiProductsService from '../../services/apiProducts.service';
import { NextFunction, Request, Response } from 'express';
import L from '../../../common/logger';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import AsyncAPIHelper from '../../../../src/asyncapihelper';

export class Controller {
  all(req: Request, res: Response): void {
    ApiProductsService.all().then((r) => res.json(r));
  }

  create(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.create(req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }


  update(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.update(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  byName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.byName(req.params['name']).then((r) => {
      if (r) res.status(200).json(r);
      else res.status(404).send();
    }).catch((e) => next(e));
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.delete(req.params['name']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }

  allApis(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.apiList(req.params['name'])
      .then((r) => res.json(r))
      .catch(e => {
        L.error(e);
        next(e);
      });
  }

  apiByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.apiByName(req.params['name'], req.params['api'])
      .then((r) => {
        AsyncAPIHelper.handleResponse(r, req, res, next);
      })
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  appsByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.appsByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  derivedByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.derivedByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

  createDerived(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.createDerived(req.params['name'], req.body).then((r) => {
      if (r) {
        res.status(201).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  allRevisions(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.revisionList(req.params['name'])
      .then((r) => res.json(r))
      .catch(e => {
        L.error(e);
        next(e);
      });
  }
  revisionByVersion(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.revisionByVersion(req.params['name'], req.params['semver'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

}
export default new Controller();
