import L from '../../../common/logger'; 
import EventPortalFacade from '../../../../src/eventportalfacade';
import { NextFunction, Request, Response } from 'express';
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
      .then(async (r) => {
        AsyncAPIHelper.handleResponse(r, req, res, next, 200 , req.params['id']);
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

}
export default new Controller();
