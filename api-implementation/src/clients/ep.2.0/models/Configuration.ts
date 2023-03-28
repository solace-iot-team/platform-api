/* eslint-disable */


export type Configuration = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    messagingServiceId: string;
    /**
     * Refer <a href="./cloud/reference/getConfigurationTypes">here</a> for details on configuration types.
     */
    configurationTypeId: string;
    entityType: Configuration.entityType;
    entityId: string;
    value?: Record<string, any>;
    type?: string;
}

export namespace Configuration {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Configuration';

    export enum entityType {
        applicationVersion = 'applicationVersion',
        consumer = 'consumer',
        eventVersion = 'eventVersion',
    }


}