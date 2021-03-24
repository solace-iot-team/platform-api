import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { Paging } from '../services/persistence.service';
import { ErrorResponseInternal } from './error.handler';
import { ns } from './context.handler';


export default function pagingHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.query.pageNumber != null && req.query.pageSize != null) {
    var p: Paging = {
      pageNumber: parseInt(req.query.pageNumber as string),
      pageSize: parseInt(req.query.pageSize as string)
    };
    L.debug(`Found paging parameters ${JSON.stringify(p)}`);
    if (ns != null) {
      L.debug(`PersistenceService: Found namespace ${ns}`);
      ns.getStore().set('paging', p);
      next();

    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }

}
