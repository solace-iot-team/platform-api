import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';
import ErrorResponse = Components.Schemas.ErrorResponse;
//eslint - disable - next - line no - unused - vars, no - shadow
export default function errorHandler(
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  var theError: ErrorResponseInternal = err;
  L.debug(err);
  var statusCode: number = theError.statusCode;
  delete theError.statusCode;
  res.status(statusCode || 500).json(theError);
}




export class ErrorResponseInternal extends Error implements ErrorResponse {
  statusCode: number;
  errorId: string;

  constructor(statusCode: number, message: string) {
    try {
      if (!message) {
        message = "";
      }
      super();
      this.errorId = String(statusCode);
      this.statusCode = statusCode;
      this.message = message;
    } catch (e) {

    }
  }
}


