import pino from 'pino';
import pinoCaller from 'pino-caller';
import { ns } from '../api/middlewares/context.handler';
const logFile: string = process.env.LOG_FILE;
import { ContextConstants } from './constants';
const getRequestId = function(){
 if(ns != null && ns.getStore()&& ns.getStore().get(ContextConstants.REQUEST_ID)){
  return ns.getStore().get(ContextConstants.REQUEST_ID);
 } else {
   return 'n/a';
 }
}

let logger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
}, logFile ? pino.destination(logFile) : pino.destination(1));
logger = process.env.NODE_ENV === 'development'?pinoCaller(logger):logger;
logger = logger.child({
  requestId: getRequestId,
});
export default logger;
