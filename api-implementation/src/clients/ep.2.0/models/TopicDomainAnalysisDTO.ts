/* eslint-disable */


import type { ApplicationDomain } from './ApplicationDomain';

export type TopicDomainAnalysisDTO = {
    presentInOtherApplicationDomains?: boolean;
    otherApplicationDomainCount?: number;
    otherEntitledApplicationDomains?: Array<ApplicationDomain>;
}

export namespace TopicDomainAnalysisDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicDomainAnalysisDTO';


}