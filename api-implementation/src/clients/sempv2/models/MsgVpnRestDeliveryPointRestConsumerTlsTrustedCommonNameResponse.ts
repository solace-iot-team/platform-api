/* eslint-disable */


import type { MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName } from './MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName';
import type { MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks } from './MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameResponse = {
    data?: MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName;
    links?: MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameLinks;
    meta: SempMeta;
}

export namespace MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameResponse';


}