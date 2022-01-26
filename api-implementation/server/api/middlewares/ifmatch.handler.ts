import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { ErrorResponseInternal } from './error.handler';
import { ns } from './context.handler';
import { ContextConstants } from '../../common/constants';


export default function ifMatchHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ifMatch = req.headers['if-match'] ? req.headers['if-match'] : req.headers['If-Match'];
  L.info(`Found if-match header ${ifMatch}`);
  if (ifMatch && ifMatch.length>0 && ifMatch!= 'undefined') {

    L.info(`Found if-match header ${ifMatch}`);
    if (ns != null) {
      L.debug(`ifMatchHandler: Found namespace ${ns}`);
      ns.getStore().set(ContextConstants.IF_MATCH_ETAG, ifMatch);
      next();

    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }

}
