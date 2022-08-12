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
  public static WRITE_MODE = 'mode';
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
