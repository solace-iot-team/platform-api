/* eslint-disable */


export type ConfigurationType = {
    readonly id?: string;
    name: string;
    brokerType: string;
    associatedEntityTypes?: Array<string>;
    readonly createdTime?: string;
    readonly updatedTime?: string;
    valueSchema?: Record<string, any>;
    type?: string;
}

export namespace ConfigurationType {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ConfigurationType';


}