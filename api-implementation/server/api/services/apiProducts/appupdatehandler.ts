import AppUpdates from './appUpdateEventEmitter';
import { scheduler } from '../../../index';
import { AppProvisioningJobSpec } from '../../../../src/scheduler/jobs/appprovisioningjob';
import L from '../../../common/logger';
import { ns } from '../../middlewares/context.handler';
import AppsService from '../apps.service';
import ApisService from '../apis.service';
import ApiProductsService from '../apiProducts.service';
import TeamsService from '../teams.service';
import DevelopersService from '../developers.service';
import { ContextConstants } from '../../../common/constants';
import CommonEntitiNamesList = Components.Schemas.CommonEntityNameList;
import Organization = Components.Schemas.Organization;
import Attributes = Components.Schemas.Attributes;
import AppApiProductsComplex = Components.Schemas.AppApiProductsComplex;
import ContextRunner from '../../../../src/scheduler/contextrunner';
import apiProductsService from '../apiProducts.service';
import SemVerSorter from 'semver-sort';
import _ from 'lodash';
import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';
interface TaskData {
  organization: string,
  name: string,
  org: Organization,
  requiresAPIProductDelta: boolean
}

export default class AppUpdateHandler {

  constructor() {
    AppUpdates.on('apiUpdate', this.processApiUpdate);
    AppUpdates.on('apiProductUpdate', this.processApiProductUpdate);
  }
  public async processApiUpdate(organization: string, name: string) {
    L.debug(`got event for ${organization} API: ${name}`);
    try {
      const data: TaskData = AppUpdateHandler.getTaskData(organization, name);
      await ContextRunner(data.org, AppUpdateHandler.doProcessApiUpdate, data);
    } catch (e) {
      L.error(e);
    }
  }

  public async processApiProductUpdate(organization: string, name: string) {
    L.debug(`got event for ${organization} API Product: ${name}`);
    try {
      const data: TaskData = AppUpdateHandler.getTaskData(organization, name);
      data.requiresAPIProductDelta = true;
      await ContextRunner(data.org, AppUpdateHandler.doProcessApiProductUpdate, data);
    } catch (e) {
      L.error(e);
    }
  }

  public static async doProcessApiUpdate(data: TaskData) {
    let allAppNames: CommonEntitiNamesList = [];
    // find all the products associated with the api
    const productNames = await ApisService.apiProductsByName(data.name);
    // find all the apps associated with the apiproducts
    for (const productName of productNames) {
      const appNames = await ApiProductsService.appsByName(productName.name);
      allAppNames = allAppNames.concat(appNames);
    }
    await AppUpdateHandler.queueAppUpdates(data, allAppNames);
  }
  public static async doProcessApiProductUpdate(data: TaskData) {
    const allAppNames = await ApiProductsService.appsByName(data.name);
    await AppUpdateHandler.queueAppUpdates(data, allAppNames);
  }

  public static async queueAppUpdates(data: TaskData, allAppNames: CommonEntitiNamesList) {
    // schedule an app update job for each app - trigger type "apiUpdate" (which means simply reprovision the app)
    for (const appName of allAppNames) {
      const jobSpec = new AppProvisioningJobSpec();
      const app = await AppsService.byName(appName.name, 'smf');
      let attributes: Attributes = [];
      switch (app['appType']) {
        case 'team': {
          attributes = (await TeamsService.byName(app['ownerId'])).attributes;
          break;
        }
        case 'developer': {
          attributes = (await DevelopersService.byName(app['ownerId'])).attributes;
          break;
        }
        default: {
          break;
        }
      }


      jobSpec.data = {
        app: app,
        name: app.name,
        org: data.org,
        orgName: data.organization,
        ownerAttributes: attributes,
      };
      jobSpec.orgName = data.organization;
      if (data.requiresAPIProductDelta) {
        // we need to provide a version of the app referencing the previous revision of the api product
        const apiProductName = data.name;
        //find out the previous revision number of the product, if there is only one revision we don;t have a previous revision to refer to
        const revisions: string[] = await apiProductsService.revisionList(apiProductName);
       
        if (revisions.length > 1) {
          const sortedRevisions = SemVerSorter.desc(revisions);
          const previousRevision = sortedRevisions[1];
          // clone the app object
          const previousApp = _.cloneDeep(app);
          let apiProductReference = previousApp.apiProducts.find(productReference => apiProductName == APIProductsTypeHelper.apiProductReferenceToString(productReference));
          // adjust the reference to add in the revision
          const newAPIProductName = `${APIProductsTypeHelper.apiProductReferenceToString(apiProductReference)}@${previousRevision}`;

          
          apiProductReference = APIProductsTypeHelper.setApiProductReferenceName(apiProductReference, newAPIProductName);
          //L.error(`${JSON.stringify(apiProductReference)}`);
          // add the modified app to the job spec
          const apiProducts = previousApp.apiProducts.filter(productReference => apiProductName != APIProductsTypeHelper.apiProductReferenceToString(productReference));
          apiProducts.push(apiProductReference);
          previousApp.apiProducts = apiProducts;
          jobSpec.data.appPrevious = previousApp;
        }
      }
      await scheduler.queueJob(jobSpec);
    }

  }

  private static getTaskData(organization: string, name: string) {
    const org = ns.getStore().get(ContextConstants.ORG_OBJECT);
    const data: TaskData = {
      name: name,
      org: org,
      organization: organization,
      requiresAPIProductDelta: false,
    }
    return data;
  }
}