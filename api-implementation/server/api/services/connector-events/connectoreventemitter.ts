import { Request, Response } from 'express';
import { TypedEmitter } from 'tiny-typed-emitter';

interface AuditHandlerEvents {
  'activity': (organization: string, req: Request, res: Response ) => void;
}
class AuditHandlerEventsEmitter extends TypedEmitter<AuditHandlerEvents> {
  constructor() {
    super();
  }
}
export default new AuditHandlerEventsEmitter();