import L from '../../../common/logger'; 
import EventPortalFacade from '../../../../src/eventportalfacade.2';
import { NextFunction, Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response, next: NextFunction): void {
    EventPortalFacade.getApplicationDomains(parseInt(req.query['pageSize'] as string), parseInt(req.query['pageNumber'] as string)).then((r) => res.json(r)).catch(e => {
      L.error(e);
      next(e);
    });
  }

  byId(req: Request, res: Response, next: NextFunction): void {
    EventPortalFacade.getApplicationDomain(req.params['id'])
      .then((r) => res.json(r))
      .catch((e) => {
        L.error(e);
        next(e);
      });
  };

}
export default new Controller();
