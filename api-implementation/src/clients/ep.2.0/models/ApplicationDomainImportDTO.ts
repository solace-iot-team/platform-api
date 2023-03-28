/* eslint-disable */


import type { AddressSpace } from './AddressSpace';
import type { Application } from './Application';
import type { ApplicationDomain } from './ApplicationDomain';
import type { ApplicationVersion } from './ApplicationVersion';
import type { CustomAttributeDefinition } from './CustomAttributeDefinition';
import type { Event } from './Event';
import type { EventApi } from './EventApi';
import type { EventApiProduct } from './EventApiProduct';
import type { EventApiProductVersion } from './EventApiProductVersion';
import type { EventApiVersion } from './EventApiVersion';
import type { EventVersion } from './EventVersion';
import type { SchemaObject } from './SchemaObject';
import type { SchemaVersion } from './SchemaVersion';
import type { TopicAddressEnum } from './TopicAddressEnum';
import type { TopicAddressEnumVersion } from './TopicAddressEnumVersion';
import type { TopicDomain } from './TopicDomain';

export type ApplicationDomainImportDTO = {
    formatVersion?: string;
    applicationDomains?: Array<ApplicationDomain>;
    topicDomains?: Array<TopicDomain>;
    applications?: Array<Application>;
    applicationVersions?: Array<ApplicationVersion>;
    events?: Array<Event>;
    eventVersions?: Array<EventVersion>;
    schemas?: Array<SchemaObject>;
    schemaVersions?: Array<SchemaVersion>;
    enums?: Array<TopicAddressEnum>;
    enumVersions?: Array<TopicAddressEnumVersion>;
    eventApis?: Array<EventApi>;
    eventApiVersions?: Array<EventApiVersion>;
    eventApiProducts?: Array<EventApiProduct>;
    eventApiProductVersions?: Array<EventApiProductVersion>;
    addressSpaces?: Array<AddressSpace>;
    customAttributeDefinitions?: Array<CustomAttributeDefinition>;
}

export namespace ApplicationDomainImportDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomainImportDTO';


}