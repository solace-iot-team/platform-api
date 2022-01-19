import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { SortDirection, SortInfo } from '../../../src/model/sortinfo';
import { ErrorResponseInternal } from './error.handler';
import { ns } from './context.handler';
import { ContextConstants } from '../../common/constants';


export default function sortHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.query.sortFieldName != null) {
    const dirParam = req.query.sortDirection as string;
    let direction: SortDirection = (dirParam == 'desc')?SortDirection.desc:SortDirection.asc;

    let p: SortInfo = {
      direction: direction,
      fieldName: req.query.sortFieldName as string
    };
    L.info(`Found sort parameters ${JSON.stringify(p)}`);
    if (ns != null) {
      L.info(`sortHandler: Found namespace ${ns}`);
      ns.getStore().set(ContextConstants.SORT, p);
      next();

    } else {
      L.error("Namespace is null");
      next(new ErrorResponseInternal(500, "No context initalised"));
    }
  } else {
    next();
  }

}
