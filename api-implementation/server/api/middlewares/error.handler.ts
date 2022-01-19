import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';

//eslint - disable - next - line no - unused - vars, no - shadow
export default function errorHandler(
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let theError: ErrorResponseInternal = err;
  if (!(typeof theError.message === 'string') && !(theError.message as any instanceof String)){
    theError.message = JSON.stringify(theError.message);
  }
  let statusCode: number = theError.statusCode;
  if (!statusCode){
    statusCode = err['status'];
  }
  L.debug(`errorHandler ${statusCode} - ${err.message}`);
  L.debug(err);
  delete theError.statusCode;
  res.status(statusCode || 500).json(theError);
}

export class ErrorResponseInternal extends Error {
  statusCode: number;
  errorId: string;
  message: string;

  constructor(statusCode: number, message: string) {
    L.debug(`creating error ${message}`);
    try {
      if (!message) {
        message = "";
      }
      super();
      this.errorId = String(statusCode);
      this.statusCode = statusCode;
      this.message = message;
    } catch (e) {
      L.debug('cant create error');
    }
  }
}