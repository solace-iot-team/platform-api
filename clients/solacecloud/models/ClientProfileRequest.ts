/* eslint-disable */


import type { CloudRequestType } from './CloudRequestType';
import type { MsgVpnClientProfile } from './MsgVpnClientProfile';

export type ClientProfileRequest = {
    clientProfile: MsgVpnClientProfile;
    operation: CloudRequestType;
}

export namespace ClientProfileRequest {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientProfileRequest';


}