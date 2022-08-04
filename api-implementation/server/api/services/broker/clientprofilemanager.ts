import L from '../../../common/logger';

import BrokerUtils from './brokerutils';
import ACLManager from './aclmanager';
import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;
import Permissions = Components.Schemas.Permissions;
import APIProductsTypeHelper from '../../../../src/apiproductstypehelper';

import MsgVpnClientProfile = Components.Schemas.MsgVpnClientProfile;
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
  compressionEnabled: true, 
  environments: [],
}

const GuaranteedMessagingSendOnlyProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_SEND_ONLY,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: false,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true,
  environments: [],
}

const GuaranteedMessagingReceiveSendProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_SEND,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true,
  environments: [],
}

const GuaranteedMessagingReceiveSendCreateProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_SEND_CREATE,
  allowGuaranteedMsgSendEnabled: true,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: true,
  compressionEnabled: true,
  environments: [],
}

const GuaranteedMessagingReceiveCreateProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_CREATE,
  allowGuaranteedMsgSendEnabled: false,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: true,
  compressionEnabled: true,
  environments: [],
}

const GuaranteedMessagingReceiveOnlyProfile: MsgVpnClientProfile = {
  clientProfileName: GUARANTEED_MESSAGING_RECEIVE_ONLY,
  allowGuaranteedMsgSendEnabled: false,
  allowTransactedSessionsEnabled: true,
  allowGuaranteedMsgReceiveEnabled: true,
  allowGuaranteedEndpointCreateEnabled: false,
  compressionEnabled: true,
  environments: [],
}

class ClientProfileManager {


  public async selectClientProfile(app: App, apiProducts: APIProduct[], ownerAttributes: Attributes): Promise<MsgVpnClientProfile> {
    let clientProfileName = NO_GUARANTEED_MESSAGING;
    let receiveGM: boolean = false;
    let createEndPoints: boolean = false;
    let sendGM: boolean = false;
    let permissions: Permissions = await ACLManager.getClientACLExceptions(app, apiProducts, ownerAttributes, undefined);

    const tags: string[] = [];
    L.debug(`${this.isQueueRequiredForAnyAPIProduct(apiProducts)} ${JSON.stringify(permissions.publish)}`);
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
    tags.push(`receiveGM: ${receiveGM}, sendGM: ${sendGM}, createEndpoints: ${createEndPoints}`);
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
    const profile = this.getCreateRequestByClientProfileName(clientProfileName);
    profile.tags = tags;
    return profile;
  }

  private isQueueRequiredForAnyAPIProduct(apiProducts: APIProduct[]): boolean {
    for (const apiProduct of apiProducts) {
      const isRequiredForProduct: boolean = APIProductsTypeHelper.isGuaranteedMessagingEnabled(apiProduct) && apiProduct.clientOptions.guaranteedMessaging.requireQueue;
      if (isRequiredForProduct) {
        return true;
      }
    }
    return false;
  }

  private isSendRequiredForAnyAPIProduct(apiProducts: APIProduct[]): boolean {
    for (const apiProduct of apiProducts) {

      const isRequiredForProduct: boolean = APIProductsTypeHelper.isGuaranteedMessagingEnabled(apiProduct);
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