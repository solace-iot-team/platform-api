import { AsyncApiChannels } from './AsyncApiChannels';
import { AsyncApiComponents } from './AsyncApiComponents';
import { AsyncApiExternalDocs } from './AsyncApiExternalDocs';
import { AsyncApiInfo } from './AsyncApiInfo';
import { AsyncApiServers } from './AsyncApiServers';
import { AsyncApiTag } from './AsyncApiTag';

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#A2SObject
 */
export interface AsyncApi {
  asyncapi: string;
  id?: string;
  info: AsyncApiInfo;
  servers?: AsyncApiServers;
  defaultContentType?: string;
  channels: AsyncApiChannels;
  components?: AsyncApiComponents;
  tags?: AsyncApiTag[];
  externalDocs?: AsyncApiExternalDocs;
}
