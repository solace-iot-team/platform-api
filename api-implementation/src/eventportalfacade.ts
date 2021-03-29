import L from '../server/common/logger';

import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

import APIListItem = Components.Schemas.APIListItem;
import APIDomain = Components.Schemas.APIDomain;
import API = Components.Schemas.API;
import { ApiError, AsyncApiService, Application, ApplicationDomainsResponse, ApplicationDomainsService, ApplicationResponse, ApplicationsService, OpenAPI, GenerateAsyncAPIRequest, TagsResponse, IdsResponse, TagsService, Tag, ApplicationsResponse } from "./clients/eventportal";
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';
import { Paging } from './model/paging';


import { getEventPortalBaseUrl, getEventPortalToken, validateToken } from './cloudtokenhelper';
import { ContextConstants } from '../server/common/constants';

const tagCache = new CacheContainer(new MemoryStorage());
const apiDomainsCache = new CacheContainer(new MemoryStorage());
const appResponseCache = new CacheContainer(new MemoryStorage());
const appTagsCache = new CacheContainer(new MemoryStorage());

class EventPortalFacade {
  constructor() {
    OpenAPI.TOKEN = getEventPortalToken;
    OpenAPI.BASE = getEventPortalBaseUrl;
  }

  public async validate(token: string, baseUrl?: string): Promise<boolean> {
    let url: string = `${OpenAPI.BASE}/api/v1/eventPortal/applicationDomains`;
    if (baseUrl !=null){
      url = `${baseUrl}/api/v1/eventPortal/applicationDomains`;
    }
    return validateToken(token, url);
  }

  @Cache(apiDomainsCache, { ttl: 60 })
  public async getApiDomainsServiceCall(): Promise<ApplicationDomainsResponse> {
    var appDomains: ApplicationDomainsResponse = await ApplicationDomainsService.list(100, 1);
    return appDomains;
  }

  @Cache(tagCache, { ttl: 3600 })
  public async getTags(): Promise<Tag[]> {
    const tags: TagsResponse = await TagsService.list11(100, 1);
    return tags.data;
  }

  private async getApiDomainNameById(domainId: string): Promise<string> {
    const apiDomains = await this.getApiDomainsServiceCall();
    const apiDomain = apiDomains.data.find((a) =>
      a.id == domainId
    );
    return apiDomain.name;
  }

  private async getTagValuesByIds(ids: string[]): Promise<string[]> {
    const tagValues: string[] = [];
    const tags: Tag[] = await this.getTags();
    tags.filter((val: Tag) => ids.includes(val.id)).forEach((t: Tag) => tagValues.push(t.name));
    return tagValues;
  }

  private async getApplicationResponse(applicationId: string): Promise<ApplicationResponse> {
    const cachedResponse = await appResponseCache.getItem(applicationId);
    if (cachedResponse) {
      L.trace(`returning cached api ${applicationId}`);
      return cachedResponse;
    } else {
      const apiResponse: ApplicationResponse = await ApplicationsService.get1(applicationId);
      await appResponseCache.setItem(applicationId, apiResponse, { ttl: 60 });
      L.trace(`retrieved api ${applicationId} from backend`);
      return apiResponse;
    }
  }

  private async getApplicationTags(applicationId: string): Promise<string[]> {
    const cachedResponse: string[] = await appTagsCache.getItem(applicationId);
    if (cachedResponse) {
      L.trace(`returning cached api ${applicationId}`);
      return cachedResponse;
    } else {
      const tagIds: IdsResponse = await ApplicationsService.list3(applicationId);
      const tags = await this.getTagValuesByIds(tagIds.data);
      await appTagsCache.setItem(applicationId, tags, { ttl: 60 });
      L.trace(`retrieved tag ${applicationId} from backend`);
      return tags;
    }
  }

  public async getApis(tags?: string[], apiDomain?: string): Promise<APIListItem[]> {
    try {
      let paging: Paging = ns.getStore().get(ContextConstants.PAGING);
      L.debug(`paging ${paging}`);
      if (paging == null) {
        paging = {
          pageNumber: 1,
          pageSize: 100,
        };
      }

      const apis: ApplicationsResponse = await ApplicationsService.list2(paging.pageSize, paging.pageNumber);
      var apiList: APIListItem[] = [];

      for (const api of apis.data) {
        let include = true;
        let matchesTag = true;
        const tagNames = await this.getApplicationTags(api.id);
        const apiDomainName = await this.getApiDomainNameById(api.applicationDomainId);
        if (tags != null && tags.length > 0) {
          matchesTag = (tagNames.filter((s) => tags.includes(s)).length > 0);
        }
        let matchesDomain = true;
        if (apiDomain != null && apiDomain != apiDomainName) {
          matchesDomain = false;
        }
        include = (matchesTag && matchesDomain);
        if (include) {
          apiList.push({
            name: api.name,
            apiDomain: apiDomainName,
            description: api.description,
            tags: tagNames,
          });
        }
      }
      return apiList;
    } catch (error) {
      L.error(error);
      throw new ErrorResponseInternal(error.status, error.message);
    }
  }

  public async getApiDomains(name?: string): Promise<APIDomain[]> {
    L.info(`Looking up APIDomain ${name}`);
    try {
      var value: ApplicationDomainsResponse = await await ApplicationDomainsService.list(100, 1, name);
      var apiDomainList: APIDomain[] = [];

      if (value.data.length < 1) {
        L.info(`Resolving ${value.data.length}`);
        return apiDomainList;
      } else {
        for (const appDomain of value.data) {
          const apis: string[] = [];
          for (const applicationId of appDomain.applicationIds) {
            const api = await this.getApplicationResponse(applicationId);
            apis.push(api.data.name);
          };
          var d: APIDomain = {
            name: appDomain.name,
            createdTime: appDomain.createdTime,
            updatedTime: appDomain.updatedTime,
            createdBy: appDomain.createdBy,
            changedBy: appDomain.changedBy,
            id: appDomain.id,
            description: appDomain.description,
            topicDomain: appDomain.topicDomain,
            enforceUniqueTopicNames: appDomain.enforceUniqueTopicNames,
            type: appDomain.type,
            apis: apis
          };
          apiDomainList.push(d);
        }
      }
      return apiDomainList;
    } catch (val) {
      throw new ErrorResponseInternal(val.status, val.message);
    }
  }

  public async getApi(name: string): Promise<API> {
    try {
      var result: ApplicationsResponse = await ApplicationsService.list2(100, 1, name);
      var app: Application = result.data[0];
      if (!app) {
        throw new ErrorResponseInternal(404, `Entity ${name} does not exist`);
      }
      var output: API = {
        name: app.name,
        createdTime: app.createdTime,
        updatedTime: app.updatedTime,
        createdBy: app.createdBy,
        changedBy: app.changedBy,
        id: app.id,
        version: app.version,
        description: app.description,
        apiDomainName: await this.getApiDomainNameById(app.applicationDomainId),
        revisionNumber: app.revisionNumber,
        apiClass: app.applicationClass,
        tags: await this.getApplicationTags(app.id),
      };
      return output;
    } catch (val) {
      throw new ErrorResponseInternal(val.status, val.message);
    }
  }

  public async getApiSpec(name: string, asyncAPIVersion?: string): Promise<string> {
    try {
      if (!asyncAPIVersion) {
        asyncAPIVersion = "2.0.0";
      }
      var value: ApplicationResponse = await ApplicationsService.list2(100, 1, name);
      var app: Application = value.data[0];
      if (!app) {
        throw new ErrorResponseInternal(404, `Entity ${name} does not exist`);
      }
      var apiId = app.id;
      var asyncAPIRequestBody: GenerateAsyncAPIRequest = { asyncApiVersion: asyncAPIVersion };
      L.debug(`Requesting Async API ${apiId} spec ${JSON.stringify(asyncAPIRequestBody)}`);
      var asyncAPIResponse: any = await AsyncApiService.generateAsyncApi(apiId, asyncAPIRequestBody);
      L.debug(`Parsing API spec `);

      Object.keys(asyncAPIResponse.channels).forEach(e => {
        if (asyncAPIResponse.channels[e].parameters == null) {
          var x = e.match(/(?<=\{)[^}]*(?=\})/g);
          var parameters = {};
          if (x) {
            x.forEach(match => {
              parameters[match] = {
                description: match,
                schema: { type: "string" }
              };
            });
            asyncAPIResponse.channels[e].parameters = parameters;
          }
        }
      });
      return asyncAPIResponse;
    } catch (val) {
      throw new ErrorResponseInternal(val.status, val.message);
    }
  }
}

export default new EventPortalFacade();
