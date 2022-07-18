import { Job } from 'agenda';
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;
import ImporterInfo = Components.Schemas.ImporterInfo;
import Organization = Components.Schemas.Organization;

export interface Importer {
    /**
  * Create an import job
  * @param configuration 
  */
  create(configuration: ImporterConfiguration, organization: Organization): Promise<ImporterConfiguration>;

  /**
   * Update the configuraiton of the given import job
   * @param name 
   * @param configuration 
   */
  update(name: string, configuration: ImporterConfiguration, organization: Organization): Promise<ImporterConfiguration>;

  /**
   * Run a given import job now - still asynchronous but near immediate
   * @param name 
   */
  run(name: string, organization: Organization): Promise<Components.Schemas.SuccessResponse>;

  /**
   * 
   */
  import(job: Job): Promise<any>;

  /**
   * 
   */
  info(): ImporterInfo;

}