import { User } from "../../../src/model/user";
import HistoryService from '../services/history.service';
import History = Components.Schemas.History;
import L from '../../common/logger';
import AuditHandlerEventsEmitter from '../services/connector-events/connectoreventemitter';
import ConnectorEventRepublisher from '../services/connector-events/connectoreventrepublisher';
import { ns } from './context.handler';
import { ContextConstants } from "../../common/constants";

const auditableVerbs: string[] = ['POST', 'PUT', 'DELETE', 'PATCH'];
 AuditHandlerEventsEmitter.on('activity', ConnectorEventRepublisher.republishEvent);
export default function auditHandler(req, res, next) {
  res.on("finish", function () {
    L.info(`finish response ${req.method}`);
    if (auditableVerbs.includes(req.method)) {
      let user: User = req['user'] as User;
      const url: string = `${req.baseUrl}/${req.url}`.replace('//', '/');
      let h: History = {
        at: Date.now(),
        operation: req.method,
        requestBody: req.body,
        requestURI: url,
        title: `${req.method} ${url}`,
        user: `${user.name} (${user.sub})`,
        responseCode: res.statusCode
      };
      HistoryService.create(h);
      L.debug(`auditable request: ${req.method}, ${url}, ${res.statusCode}`);
      const r: boolean = AuditHandlerEventsEmitter.emit('activity', ns.getStore().get(ContextConstants.ORG_NAME), req, res);
      L.trace(`could emit ${r} ${AuditHandlerEventsEmitter.listenerCount('activity')}`);
     
    };

  });
  next();
}