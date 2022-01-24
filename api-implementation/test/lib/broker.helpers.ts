import { OpenAPI, ServicesService } from "../../src/clients/solacecloud";
import { AllService } from "../../src/clients/sempv2";
import { ApiOptions } from '../../src/clients/sempv2/core/ApiOptions';
import { AllServiceDefault } from '../../src/clients/sempv2/services/AllServiceDefault';

/**
 * Helper to create clients to invoke the Solace Cloud API.
 */
export class SolaceCloudClientFactory {

  /**
   * A list of all SEMP v2 clients that have been created.
   */
  private static sempV2Clients: Map<String, AllService> = new Map<String, AllService>();

  /**
   * Set the base URL and acccess token for the Solace Cloud API.
   * 
   * @param base The base URL for the Solace Cloud API.
   * @param token The access token.
   */
  public static initialize = (base: string, token: string) => {
    OpenAPI.BASE = base;
    OpenAPI.TOKEN = token;
  }

  /**
   * Create a SEMP v2 client for a Solace Cloud PubSub+ service.
   * 
   * @param serviceId The service identifier.
   * @returns A SEMP v2 client for the specified Solace Cloud PubSub+ service.
   */
  public static createSempV2Client = async (serviceId: string): Promise<AllService> => {

    let client: AllService = SolaceCloudClientFactory.sempV2Clients.get(serviceId);
    if (client == null) {

      await ServicesService.getService(serviceId).then((response) => {
        const sempProtocol = response.data.managementProtocols.find(i => i.name === "SEMP");
        const options: ApiOptions = {
          baseUrl: sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
          username: sempProtocol.username,
          password: sempProtocol.password,
        };
        SolaceCloudClientFactory.sempV2Clients.set(serviceId, new AllServiceDefault(options));
      });
    }

    return SolaceCloudClientFactory.sempV2Clients.get(serviceId);
  }

} // SolaceCloudClientFactory