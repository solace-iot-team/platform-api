import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { Paging } from '../services/persistence.service';
import C from 'cls-hooked';
import { ErrorResponseInternal } from './error.handler';

export default function pagingHandler(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  if (req.query.pageNumber != null && req.query.pageSize != null) {
    var p: Paging = {
      pageNumber: parseInt(req.query.pageNumber as string),
      pageSize: parseInt(req.query.pageSize as string)
    };
    L.debug(`Found paging parameters ${JSON.stringify(p)}`);
    var namespace = C.getNamespace('platform-api');
    if (namespace != null) {
      L.debug(`PersistenceService: Found namespace ${namespace}`);
      namespace.run(function () {
        namespace.set('paging', p);
        next();
      });
    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }
  
}
