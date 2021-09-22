import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { SearchInfo } from '../../../src/model/searchinfo';
import { ErrorResponseInternal } from './error.handler';
import { ns } from './context.handler';
import { ContextConstants } from '../../common/constants';


export default function searchHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.query.filter != null) {
    var p: SearchInfo = {
      searchWordList: req.query.filter as string,
    };
    L.debug(`Found search parameters ${JSON.stringify(p)}`);
    if (ns != null) {
      L.debug(`searchHandler: Found namespace ${ns}`);
      ns.getStore().set(ContextConstants.FILTER, p);
      next();

    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }

}
