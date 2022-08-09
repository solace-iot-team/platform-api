import { Job } from 'agenda';
import App = Components.Schemas.App;
import Attributes = Components.Schemas.Attributes;
import L from '../../../server/common/logger';
import { AgendaJobSpec, AgendaJobData } from '../taskscheduler';
import BrokerFactory from '../../../server/api/services/broker.factory';
import ContextRunner from '../contextrunner';
import organizationsService from '../../../server/api/services/organizations.service';

export interface AppProvisioningData extends AgendaJobData {
  app: App,
  appPrevious?: App,
  ownerAttributes: Attributes
}

export class AppProvisioningJobSpec implements AgendaJobSpec {
  jobName: string;
  orgName: string;
  data: AppProvisioningData;

  constructor() {
    this.jobName = 'reprovisionApp';
  }

}
export class AppProvisioningJob {
  public static async provision(job: Job): Promise<any> {
    const data: AppProvisioningData = job.attrs.data as AppProvisioningData;
    const org = await organizationsService.byName(data.orgName);
    L.debug(`run job in context ${data.name} ${data.orgName}`);
    return await ContextRunner(org, AppProvisioningJob.doProvision, data);
  }
  public static async doProvision(data: AppProvisioningData): Promise<any> {
    return await BrokerFactory.getBroker().reprovision(data.app, data.appPrevious ? data.appPrevious : data.app, data.ownerAttributes);
  }
}