import { Job, JobAttributesData } from "agenda";
import { Importer } from "./importer";
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;
import ImporterInfo = Components.Schemas.ImporterInfo;
import SuccessResponse = Components.Schemas.SuccessResponse;
import { scheduler } from '../../../index';
import { AgendaJobSpec, AgendaJobData } from '../../../../src/scheduler/taskscheduler';
import Organization = Components.Schemas.Organization;
import contextRunner from '../../../../src/scheduler/contextrunner';
import L from '../../../common/logger';
import EventPortalImporterTaskImpl from "./eventportalimportertaskimpl";
import { ErrorResponseInternal } from "../../middlewares/error.handler";

// global consts

const IMPORTER: string = 'EventPortalImporter';
const INTERVAL: number = 5;


// internal types

interface EventPortalImporterData extends AgendaJobData {
  configuration: ImporterConfiguration,
}

class EventPortalImporterJobSpec implements AgendaJobSpec {
  jobName: string;
  orgName: string;
  data: EventPortalImporterData;

  constructor() {
    this.jobName = IMPORTER;
  }

}


export class EventPortalImporter implements Importer {

  constructor() {
    //ImporterRegistry.register(IMPORTER, this);
  }

  public async create(configuration: ImporterConfiguration, org: Organization): Promise<ImporterConfiguration> {
    await this.schedule(configuration, org);
    return configuration;
  }
  public async update(name: string, configuration: ImporterConfiguration, org: Organization): Promise<ImporterConfiguration> {
    await this.schedule(configuration, org, name);
    return configuration;
  }
  public async run(name: string, org: Organization): Promise<SuccessResponse> {
    try {
      const job = await scheduler.findJobInstanceWithName(name);
      const spec = this.buildJobSpec(job.attrs.data.configuration, org, `${name}-${new Date()}`);
      await scheduler.queueJob(spec);
    } catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, `Error executing importer`);
    }
    return {
      id: '200',
      message: `${name} queued for execution`,

    }
  }
  public async import(job: Job<JobAttributesData>): Promise<any> {
    const data: EventPortalImporterData = job.attrs.data as EventPortalImporterData;
    return await contextRunner(data.orgName, EventPortalImporter.doImport, data);
  }

  public static async doImport(data: EventPortalImporterData): Promise<any> {
    return await EventPortalImporterTaskImpl.doImport(data.configuration);
  }

  public info(): ImporterInfo {
    return {
      name: IMPORTER,
      description: 'Imports Event API Products and its dependencies (environments, Event APIs) from Solace Event Portal',
      filterDescription: 'A list of applicationDomainIds that shal be imported',
      attributeMapDescription: 'Maps applicationDomains from event portal to a set of attributes in the API-M Connector.',
    }
  }

  private async schedule(configuration: ImporterConfiguration, org: Organization, name?: string): Promise<ImporterConfiguration> {

    const spec = this.buildJobSpec(configuration, org, name);
    await scheduler.scheduleJobAtInterval(spec, INTERVAL);
    return configuration;
  }

  private buildJobSpec(configuration: ImporterConfiguration, org: Organization, name?: string): EventPortalImporterJobSpec {
    const data: EventPortalImporterData = {
      configuration: configuration,
      name: name ? name : configuration.name,
      orgName: org.name,
      org: org
    }
    const spec: EventPortalImporterJobSpec = {
      data: data,
      jobName: IMPORTER,
      orgName: org.name
    }
    return spec;

  }
}

export default new EventPortalImporter();