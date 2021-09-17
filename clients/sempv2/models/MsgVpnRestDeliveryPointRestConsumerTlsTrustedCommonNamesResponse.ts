/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName } from './MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName';
import type { MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks } from './MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNamesResponse = {
    data?: Array<MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName>;
    links?: Array<MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks>;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNamesResponse';


}