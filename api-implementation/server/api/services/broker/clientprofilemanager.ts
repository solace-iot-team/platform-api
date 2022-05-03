import L from '../../../common/logger';

import { BrokerResourceManager } from './brokerresourcemanager';
import BrokerUtils from './brokerutils';
import ACLManager from './aclmanager';
import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;

import { Service } from '../../../../src/clients/solacecloud/models/Service';
import {
  AllService,
  MsgVpnClientProfile
} from '../../../../src/clients/sempv2';

import SempV2ClientFactory from '../broker/sempv2clientfactory';
import { ErrorResponseInternal } from '../../middlewares/error.handler';


import SolaceCloudFacade from '../../../../src/solacecloudfacade';
const PROFILE_PREFIX = 'APIM-';

const GUARANTEED_MESSAGING_RECEIVE_ONLY: string = `${PROFILE_PREFIX}ReceiveOnlyGM`;
const GUARANTEED_MESSAGING_RECEIVE_CREATE: string = `${PROFILE_PREFIX}ReceiveCreateEndpGM`;
const GUARANTEED_MESSAGING_RECEIVE_SEND_CREATE: string = `${PROFILE_PREFIX}ReceiveSendCreateEndpGM`;
const GUARANTEED_MESSAGING_RECEIVE_SEND: string = `${PROFILE_PREFIX}ReceiveSendGM`;
const GUARANTEED_MESSAGING_SEND_ONLY: string = `${PROFILE_PREFIX}SendOnlyGM`;
const NO_GUARANTEED_MESSAGING: string = `${PROFILE_PREFIX}NoGM`;

const NoGuaranteedMessagingProfile: MsgVpnClientProfile = {
  clientProfileName: NO_GUARANTEED_MESSAGING,
  allowGuaranteedMsgSendEnabled: false,
  allowTransactedSessionsEnabled: false,
  allowGuaranteedMsgReceiveEnabled: false,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true
}

const GuaranteedMessagingSendOnlyProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_SEND_ONLY,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: false,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true
}

const GuaranteedMessagingReceiveSendProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_SEND,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true
}

const GuaranteedMessagingReceiveSendCreateProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_SEND_CREATE,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: true,
  compressionEnabled: true
}

const GuaranteedMessagingReceiveCreateProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_CREATE,
  allowGuaranteedMsgSendEnabled: false,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: true,
  compressionEnabled: true
}

const GuaranteedMessagingReceiveOnlyProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_ONLY,
  allowGuaranteedMsgSendEnabled: false,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true
}

class ClientProfileManager implements BrokerResourceManager<string>{
  /**
   * Create a required client profiel if it doesn't exist and returns thew appaorpriate client profile name that must be 
   * associated with the client username
   * @param app  
   * @param services 
   * @param apiProducts 
   * @param ownerAttributes
   * @returns the name of the client profile that must be assoicated with the client username
   */
  public async create(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<string> {
    const clientProfileName = await this.selectClientProfile(app, apiProducts, ownerAttributes);
    try {
      await this.provisionClientProfile(clientProfileName, services);
    } catch(e){
      L.warn(`No permission to create clientProfiles on any services associated with the organization, this is likely due to insufficient solace cloud privileges`);
      return 'default';
    }
    return clientProfileName;
  }

  public async delete(app: App, services: Service[]): Promise<void> {
    // do nothing, client profiles are generic and can be left on broker
  }

  private async selectClientProfile(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<string> {
    let clientProfileName = NO_GUARANTEED_MESSAGING;
    let receiveGM: boolean = false;
    let createEndPoints: boolean = false;
    let sendGM: boolean = false;
    let permissions: Permissions = await ACLManager.getClientACLExceptions(app, apiProducts, ownerAttributes, undefined);
    L.warn(`${this.isQueueRequiredForAnyAPIProduct(apiProducts)} ${JSON.stringify(permissions.publish)}`);
    if (permissions.publish !== undefined && permissions.publish.length > 0 && this.isQueueRequiredForAnyAPIProduct(apiProducts)) {
      receiveGM = true;
      if (BrokerUtils.isMQTTSessionRequired(apiProducts)) {
        createEndPoints = true;
      }
    }
    if (permissions.subscribe !== undefined && permissions.subscribe.length > 0 && this.isSendRequiredForAnyAPIProduct(apiProducts)) {
      sendGM = true;
    }
    L.info(`receiveGM: ${receiveGM}, sendGM: ${sendGM}, createEndpoints: ${createEndPoints}`);
    if (receiveGM && createEndPoints && sendGM) {
      clientProfileName = GUARANTEED_MESSAGING_RECEIVE_SEND_CREATE;
    }
    if (receiveGM && createEndPoints && !sendGM) {
      clientProfileName = GUARANTEED_MESSAGING_RECEIVE_CREATE;
    }
    if (receiveGM && !createEndPoints && !sendGM) {
      clientProfileName = GUARANTEED_MESSAGING_RECEIVE_ONLY;
    }
    if (receiveGM && !createEndPoints && sendGM) {
      clientProfileName = GUARANTEED_MESSAGING_RECEIVE_SEND;
    }
    if (!receiveGM && !createEndPoints && sendGM) {
      clientProfileName = GUARANTEED_MESSAGING_SEND_ONLY;
    }

    return clientProfileName;
  }

  private async provisionClientProfile(clientProfileName: string, services: Service[]) {
    for (const service of services) {
      const apiClient: AllService = SempV2ClientFactory.getSEMPv2Client(service);
      try {
        const clientProfile = await apiClient.getMsgVpnClientProfile(service.msgVpnName, clientProfileName);
        // happy if we found the profile, nothing to do
        L.info(`CLientProfile ${clientProfileName} exists on service ${service.serviceId}`);
      } catch (e) {
        // not found, let's create the profile
        L.info(`ClientProfile ${clientProfileName} not found on service ${service.serviceId}`);
        const createRequest: MsgVpnClientProfile = this.getCreateRequestByClientProfileName(clientProfileName);
        // first try cloud - if error try broker directly
        try {
          await SolaceCloudFacade.createClientProfile(service, (createRequest as any));
          L.info(`ClientProfile ${clientProfileName} created via Cloud API on service ${service.serviceId}`);
        } catch (cloudError) {
          try {
            await apiClient.createMsgVpnClientProfile(service.msgVpnName, createRequest);
            L.info(`ClientProfile ${clientProfileName} created via SEMPv2 on service ${service.serviceId}`);
          } catch (sempError) {
            L.error(`ClientProfile ${clientProfileName} could not be created on service ${service.serviceId}`, sempError);
            throw new ErrorResponseInternal(500, `Create client profile ${clientProfileName} failed on service ${service.serviceId}`)
          }
        }
      }
    }
  }

  private isQueueRequiredForAnyAPIProduct(apiProducts: APIProduct[]): boolean {
    for (const apiProduct of apiProducts) {
      const isRequiredForProduct: boolean = apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging && apiProduct.clientOptions.guaranteedMessaging.requireQueue;
      if (isRequiredForProduct) {
        return true;
      }
    }
    return false;
  }

  private isSendRequiredForAnyAPIProduct(apiProducts: APIProduct[]): boolean {
    for (const apiProduct of apiProducts) {

      const isRequiredForProduct: boolean = (apiProduct.clientOptions && apiProduct.clientOptions.guaranteedMessaging) ? true : false;
      if (isRequiredForProduct) {
        return true;
      }
    }
    return false;
  }
  private getCreateRequestByClientProfileName(clientProfileName: string): MsgVpnClientProfile {
    let createRequest = NoGuaranteedMessagingProfile;
    switch (clientProfileName) {
      case GUARANTEED_MESSAGING_RECEIVE_CREATE: {
        createRequest = GuaranteedMessagingReceiveCreateProfile;
        break;
      }
      case GUARANTEED_MESSAGING_RECEIVE_ONLY: {
        createRequest = GuaranteedMessagingReceiveOnlyProfile;
        break;
      }
      case GUARANTEED_MESSAGING_RECEIVE_SEND: {
        createRequest = GuaranteedMessagingReceiveSendProfile;
        break;
      }
      case GUARANTEED_MESSAGING_RECEIVE_SEND_CREATE: {
        createRequest = GuaranteedMessagingReceiveSendCreateProfile;
        break;
      }
      case GUARANTEED_MESSAGING_SEND_ONLY: {
        createRequest = GuaranteedMessagingSendOnlyProfile;
        break;
      }

    }
    return createRequest;
  }
}

export default new ClientProfileManager();