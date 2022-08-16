import { ns } from '../../server/api/middlewares/context.handler';
import { ContextConstants } from '../../server/common/constants';
import L from '../../server/common/logger';
import organizationsService from '../../server/api/services/organizations.service';
import { isString } from '../typehelpers';
import Organization = Components.Schemas.Organization;
export default async function (org: Organization | string, task: (data?: any) => Promise<void>, data?: any): Promise<any> {
  const start: number = Date.now();
  let result: any = null;
  await ns.run(new Map(), async function (){
    L.debug(`Context Runner ${JSON.stringify(org)}`);
    if (!ns.getStore().get(ContextConstants.ORG_NAME)) {
      let currentOrg: Organization = isString(org)?await organizationsService.byName(org as any):(org as Organization);
      ns.getStore().set(ContextConstants.ORG_NAME, currentOrg.name);
      ns.getStore().set(ContextConstants.ORG_OBJECT, currentOrg);
      ns.getStore().set(ContextConstants.CLOUD_TOKEN, currentOrg[ContextConstants.CLOUD_TOKEN]);
      ns.getStore().set(ContextConstants.AUTHENTICATED_USER, `context-runner-${currentOrg.name}`);
    }
    try {
      L.debug(`running task ${task.name}`);
      result = await task(data);
      L.trace('finished task');
    } catch (e) {
      L.error(e);
      result = e;
    }
    const end: number = Date.now();
    L.debug(`Duration: ${(end - start)} ms`);

  });
  return result;

}