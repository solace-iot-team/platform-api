import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { ErrorResponseInternal } from './error.handler';
import { ns } from './context.handler';
import { ContextConstants } from '../../common/constants';


export default function writeModeHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.query.mode != null) {
    const p = req.query.mode as string;
    L.debug(`Found write mode ${p}`);
    if (ns != null) {
      L.debug(`Found namespace ${ns}`);
      ns.getStore().set(ContextConstants.WRITE_MODE, p);
      next();

    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }

}
