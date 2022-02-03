import pino from 'pino';
import pinoCaller from 'pino-caller';
import { ns } from '../api/middlewares/context.handler';
const logFile: string = process.env.LOG_FILE;


export let logger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
}, logFile ? pino.destination(logFile) : pino.destination(1));
logger = process.env.NODE_ENV === 'development'?pinoCaller(logger):logger;

const proxyLogger = new Proxy(logger, {
  get(target, property, receiver) {
    target = ns.getStore()?.get('logger') || target;
    return Reflect.get(target, property, receiver);
  },
});
export default process.env.NODE_ENV === 'development'?proxyLogger:logger;

