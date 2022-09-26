/* eslint-disable */


export type EnvironmentMessagingService = {
    createdTime?: string;
    updatedTime?: string;
    createdBy?: string;
    changedBy?: string;
    id?: string;
    eventMeshId?: string;
    solaceCloudMessagingServiceId?: string;
    messagingServiceType?: EnvironmentMessagingService.messagingServiceType;
    name?: string;
    bindings?: {
        management?: {
            msgVpn?: string,
            sempUsername?: string,
            sempPassword?: string,
            connections?: Array<{
                name?: string,
                authenticationType?: 'basicAuthentication',
                url?: string,
                msgVpn?: string,
                users?: Array<{
                    name?: string,
                    username?: string,
                    password?: string,
                }>,
            }>,
        },
    };
    type?: string;
}

export namespace EnvironmentMessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnvironmentMessagingService';

    export enum messagingServiceType {
        solace = 'solace',
    }


}