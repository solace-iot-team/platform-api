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
        L.info(e);
        next(e);
      });
  }

  apiByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.apiByName(req.params['name'], req.params['api'])
      .then(async (r) => {
        await AsyncAPIHelper.handleResponse(r, req, res, next, 200, req.params['api']);
      })
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };

  appsByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.appsByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };

  derivedByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.derivedByName(req.params['name'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.info(e);
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
        L.info(e);
        next(e);
      });
  }
  revisionByVersion(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.revisionByVersion(req.params['name'], req.params['semver'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };

  /**
   * Attributes resource
   */
  attributeByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.attributeByName(req.params['name'], req.params['attributeName'])
      .then((r) => {
        res.status(200).json(r);
      })
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };
  createAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.createAttribute(req.params['name'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  updateAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.updateAttribute(req.params['name'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  deleteAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.deleteAttribute(req.params['name'], req.params['attributeName']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }


  /**
   * Meta Attributes resource
   */
  metaAttributeByName(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.metaAttributeByName(req.params['name'], req.params['attributeName'])
      .then((r) => {
        res.status(200).json(r);
      })
      .catch((e) => {
        L.info(e);
        next(e);
      });
  };
  createMetaAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.createMetaAttribute(req.params['name'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }
  updateMetaAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.updateMetaAttribute(req.params['name'], req.params['attributeName'], req.body).then((r) => {
      if (r) {
        res.status(200).json(r);
      }
      else
        next(new ErrorResponseInternal(500, `No response`));
    }).catch((e) => next(e));
  }

  deleteMetaAttribute(req: Request, res: Response, next: NextFunction): void {
    ApiProductsService.deleteMetaAttribute(req.params['name'], req.params['attributeName']).then((r) => {
      res.status(r).send();
    }).catch((e) => next(e));
  }
}
export default new Controller();
