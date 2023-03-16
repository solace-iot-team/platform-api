import L from '../../common/logger';
import ImporterRegistry from "./importer/importerregistry";
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;
import ImporterInfo = Components.Schemas.ImporterInfo;
import { ContextConstants } from '../../common/constants';
import { ns } from '../middlewares/context.handler';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { Importer } from './importer/importer';
import Organization = Components.Schemas.Organization;
import { scheduler } from '../../index';
import EventportalFacade from '../../../src/eventportalfacade.2';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const appDomainListCache = new CacheContainer(new MemoryStorage())

export class ImporterService {


  /**
   * All importers
   */
  public async allImporterTypes(): Promise<ImporterInfo[]> {
    return ImporterRegistry.getTypesInfo();
  }

  /**
   * Get import jobs
   */
  public async all(): Promise<ImporterConfiguration[]> {
    let results = [];
    for (const t of ImporterRegistry.getTypes()) {
      const jobs = await scheduler.allJobsWithName(t);
      for (const j of jobs) {
        if (j.attrs.repeatInterval)
        results.push((await this.removeInvalidAppDomains(j.attrs.data.configuration)));
      }
    }
    return results;
  }

  /**
 * Get import job by name
 */
  public async byName(name: string): Promise<ImporterConfiguration> {
    return await this.removeInvalidAppDomains((await scheduler.findJobInstanceWithName(name)).attrs.data.configuration);
  }

  /**
   * Create an import job
   * @param configuration 
   */
  public async create(configuration: ImporterConfiguration): Promise<ImporterConfiguration> {
    this.validateConfiguration(configuration);
    // context - org, cloud token - lookup org
    let org = this.getOrg();

    const importer: Importer = ImporterRegistry.getByType('EventPortalImporter');

    await importer.create(configuration, org);
    return await this.removeInvalidAppDomains(configuration);
  }

  /**
   * Update the configuraiton of the given import job
   * @param name 
   * @param configuration 
   */
  public async update(name: string, configuration: ImporterConfiguration) {
    this.validateConfiguration(configuration);
    let org = this.getOrg();

    const importer: Importer = ImporterRegistry.getByType('EventPortalImporter');

    await importer.update(name, configuration, org);
    return this.removeInvalidAppDomains(configuration);
  }

  /**
   * Delete the given import job
   * @param name 
   */
  public async delete(name: string): Promise<number> {
    return scheduler.removeJob(name);
  }

  /**
   * Run a given import job now - still asynchronous but near immediate
   * @param name 
   */
  public async run(name: string): Promise<Components.Schemas.SuccessResponse> {
    const job = await scheduler.findJobInstanceWithName(name);
    const config: ImporterConfiguration = (job.attrs.data.configuration as ImporterConfiguration);
    const importer = ImporterRegistry.getByType(config.importerType);
    return importer.run(name, this.getOrg());
  }

  private getOrg(): Organization {
    if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      const org = ns.getStore().get(ContextConstants.ORG_OBJECT);
      return org;
    } else {
      throw new ErrorResponseInternal(500, 'Internal context not set up');
    }

  }

  private validateConfiguration(config: ImporterConfiguration) {
    if (!ImporterRegistry.hasType(config.importerType)) {
      throw new ErrorResponseInternal(400, `Specified importer type ${config.importerType} is not available, supported types: [${JSON.stringify(ImporterRegistry.getTypes())}]`);
    }
  }

  private async removeInvalidAppDomains(config: ImporterConfiguration ){
    const appDomains: string[] = await this.getApplicationDomains();
    const newConfig: ImporterConfiguration = {
      displayName: config.displayName,
      name: config.name,
      importerType: config.importerType,
    }; 
    if (config.attributeMap){
      newConfig.attributeMap = config.attributeMap.filter(a=>appDomains.find(x => x == a.name));
    }
    if (config.filter){
      newConfig.filter = config.filter.filter(a=>appDomains.find(x => x == a));
    }
    return newConfig;
  }

  private async getApplicationDomains(): Promise<string[]>{
    const org = this.getOrg();
    let appDomainIds: string [] = await appDomainListCache.getItem(org.name);
    if (!appDomainIds || appDomainIds.length==0){
      appDomainIds = (await EventportalFacade.getApplicationDomains(999, 1)).map(a=> {return a.id});
      appDomainListCache.setItem(org.name, appDomainIds, {ttl: 120});
    }
    return appDomainIds;
  }
}

export default new ImporterService();