import { OpenApi } from '../model/openapi/OpenApi';
import { AsyncApiInfo } from '../model/asyncapi/AsyncApiInfo';

/**
 * Creates AsyncAPI metadata from an OpenAPI specification.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * 
 * @returns The created AsyncAPI metadata.
 */
export const buildInfo = (openApi: OpenApi): AsyncApiInfo => {

  const info: AsyncApiInfo = {
    title: openApi.info.title,
    description: openApi.info.description,
    termsOfService: openApi.info.termsOfService,
    version: openApi.info.version,
  };

  const contact = openApi.info.contact;
  if (contact) {
    info.contact = {
      name: contact.name,
      url: contact.url,
      email: contact.email,
    };
  }

  const license = openApi.info.license;
  if (license) {
    info.license = {
      name: license.name,
      url: license.url,
    };
  }

  return info;
}
