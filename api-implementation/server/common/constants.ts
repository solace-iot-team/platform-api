import semver from 'semver';
import Meta = Components.Schemas.Meta;

export class PlatformConstants {
  public static PLATFORM_DB = 'platform';
  public static PLATFORM_COLLECTIONS = ['organizations', 'history'];

}

export class ContextConstants {
  public static ORG_NAME = 'org';
  public static ORG_OBJECT = 'organization';
  public static CLOUD_TOKEN = 'cloud-token';
  public static PAGING = 'paging';
  public static SORT = 'sort';
  public static IF_MATCH_ETAG = 'if-match';
  public static FILTER = 'filter';
  public static REQUEST_ID = 'requestId';
  public static AUTHENTICATED_USER = 'user';
  public static RESPONSE_OBJECT = 'responseObject';
  
}

export class TopicWildcards {
  public static SINGLE_LEVEL_SMF = '*';
  public static SINGLE_LEVEL_MQTT = '+';

  public static MULTI_LEVEL_SMF = '>';
  public static MULTI_LEVEL_MQTT = '#';
}

export class Versioning {
  public static INTERNAL_REVISION = 'internalRevision';
  public static INITIAL_VERSION = 'default';
  public static INITIAL_REVISION:number = 1;
  public static nextRevision(current: number): number{
    return current + 1;
  }
  public static validateNewVersion(newVersion: Meta, previousVersion: Meta): boolean {
    if (!newVersion){
      return true;
    }
    let semVerPrev = previousVersion.version==Versioning.INITIAL_VERSION?`1.${previousVersion[Versioning.INTERNAL_REVISION]}.0`:previousVersion.version;

    return semver.gt(newVersion.version,semVerPrev);
  }
}