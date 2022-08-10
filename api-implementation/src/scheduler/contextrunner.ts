import { ns } from '../../server/api/middlewares/context.handler';
import { ContextConstants } from '../../server/common/constants';
import L from '../../server/common/logger';
import organizationsService from '../../server/api/services/organizations.service';

import Organization = Components.Schemas.Organization;

export default async function (org: Organization, task: (data?: any) => Promise<void>, data?: any): Promise<any> {
  const start: number = Date.now();
  let result: any = null;
  await ns.run(new Map(), async () => {
    L.debug(`Context Runner ${org.name}`);
    if (!ns.getStore().get(ContextConstants.ORG_NAME)) {
      const currentOrg = await organizationsService.byName(org.name);
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