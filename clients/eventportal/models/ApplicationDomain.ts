/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Application } from './Application';
import type { ApplicationDomainStats } from './ApplicationDomainStats';
import type { Event } from './Event';
import type { EventSchema } from './EventSchema';

export type ApplicationDomain = {
    readonly createdTime?: number;
    readonly updatedTime?: number;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name?: string;
    topicDomain?: string;
    description?: string;
    enforceUniqueTopicNames: boolean;
    schemas?: Array<EventSchema>;
    events?: Array<Event>;
    applications?: Array<Application>;
    readonly schemaIds?: Array<string>;
    readonly eventIds?: Array<string>;
    readonly applicationIds?: Array<string>;
    stats?: ApplicationDomainStats;
    type?: string;
}
