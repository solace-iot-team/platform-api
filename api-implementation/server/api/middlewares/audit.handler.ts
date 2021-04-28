import { User } from "../../../src/model/user";
import HistoryService from '../services/history.service';
import History = Components.Schemas.History;
import L from '../../common/logger';
const auditableVerbs: string[] = ['POST', 'PUT', 'DELETE', 'PATCH'];
export default function auditHandler(req, res, next) {
  res.on("finish", function () {
    L.info(`finish response ${req.method}`);
    if (auditableVerbs.includes(req.method)) {
      let user: User = req['user'] as User;
      const url: string = `${req.baseUrl}/${req.url}`.replace('//', '/');
      var h: History = {
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
    };

  });
  next();
}