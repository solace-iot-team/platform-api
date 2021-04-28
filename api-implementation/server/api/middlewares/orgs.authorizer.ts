import { User } from "../../../src/model/user";
import { ContextConstants } from "../../common/constants";
import OrganizationsService from "../services/organizations.service";
import { ns } from './context.handler';
import { ErrorResponseInternal } from "./error.handler";
import L from '../../common/logger';
import Organization = Components.Schemas.Organization;

export default function orgAuthorizer(req, res, next, org) {
    const url: string = `${req.baseUrl}/${req.url}`.replace('//', '/');
    L.info(`extracting org for ${url}`);
    L.info(`org in namespace is ${ns.getStore().get(ContextConstants.ORG_NAME)}`);
    L.trace("param org is " + org + ' ' + ns.getStore().get(ContextConstants.REQUEST_ID) + ` ${JSON.stringify(ns)}`);
    let user: User = req['user'] as User;
    let err: ErrorResponseInternal = null;
    if (user.groups !== null  && !user.groups.includes(org)) {
      err = new ErrorResponseInternal(401,
        `User ${user.name} is not a member of [${org}]`
      );
      next(err);
      return;
    }
    OrganizationsService.byName(org).then((r: Organization) => {
      L.trace(`router.param org is  ${JSON.stringify(r)}`);
      ns.getStore().set(ContextConstants.ORG_NAME, org);
      ns.getStore().set(ContextConstants.CLOUD_TOKEN, r[ContextConstants.CLOUD_TOKEN]);
      L.trace(`router.param ${url} ns org is ` + ns.getStore().get(ContextConstants.ORG_NAME) + ' ' + ns.getStore().get(ContextConstants.REQUEST_ID) + ` ${JSON.stringify(ns)}`);
      next();
    }).catch(e => {
      L.debug(`no org matching URI ${req.baseUrl} ${e}`);
      next(new ErrorResponseInternal(404, `Not found`));
    });
  }