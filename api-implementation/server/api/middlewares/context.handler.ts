import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { Paging } from '../services/persistence.service';
import C from 'cls-hooked';

export default function contextHandler(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  var ns = C.createNamespace('platform-api');
  ns.run(function () {
    next();
  });
}







