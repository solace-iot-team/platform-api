import pino from 'pino';

const logFile: string = process.env.LOG_FILE;

const logger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
}, logFile ? pino.destination(logFile) : pino.destination(1));

export default logger;
