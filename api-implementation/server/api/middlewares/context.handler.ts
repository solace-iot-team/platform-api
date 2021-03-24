import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import { v4 } from 'uuid';

const { AsyncLocalStorage } = require("async_hooks");

export const ns = new AsyncLocalStorage();


export default function contextHandler(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  
  L.debug('create context and run next()');
  ns.run(new Map(), () => {
    ns.getStore().set('requestId', v4());
    next();
  });
}







