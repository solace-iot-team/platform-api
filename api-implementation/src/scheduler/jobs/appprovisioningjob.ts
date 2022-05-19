import { Job } from 'agenda';
import App = Components.Schemas.App;
import Attributes = Components.Schemas.Attributes;
import L from '../../../server/common/logger';
import { AgendaJobSpec, AgendaJobData } from '../taskscheduler';
import BrokerService from '../../../server/api/services/broker.service';
import ContextRunner from '../contextrunner';

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
    L.debug(`run job in context ${data.name} ${data.orgName}`);
    return await ContextRunner(data.org, AppProvisioningJob.doProvision, data);
  }
  public static async doProvision(data: AppProvisioningData): Promise<any> {
    return await BrokerService.reProvisionApp(data.app, data.appPrevious ? data.appPrevious : data.app, data.ownerAttributes);
  }
}