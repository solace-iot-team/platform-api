import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import {logger} from  '../../common/logger';
import { v4 } from 'uuid';
import { ContextConstants } from '../../common/constants';
import  { AsyncLocalStorage } from 'async_hooks';

export const ns = new AsyncLocalStorage<Map<string, any>>();

export default function contextHandler(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  
  L.debug('create context and run next()');
  ns.run(new Map(), () => {
    const requestId: string = v4();
    ns.getStore().set(ContextConstants.REQUEST_ID, requestId);
    const child = logger.child({ requestId: requestId });
    ns.getStore().set('logger', child);
    next();
  });
}
