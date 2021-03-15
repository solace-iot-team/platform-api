/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Service = {
    type?: string;
    timestamp?: number;
    userId?: string;
    serviceId?: string;
    infrastructureId?: string;
    name?: string;
    msgVpnName?: string;
    datacenterId?: string;
    datacenterProvider?: string;
    serviceTypeId?: string;
    serviceClassId?: string;
    adminState?: string;
    adminProgress?: string;
    created?: number;
    creationState?: string;
    messagingProtocols?: Array<{
        name: string,
        username: string,
        password: string,
        endPoints: Array<{
            name: string,
            transport: string,
            uris: Array<string>,
            secured: string,
            compressed: string,
        }>,
        limits: any,
    }>;
    managementProtocols?: Array<{
        name: string,
        username: string,
        password: string,
        endPoints: Array<{
            name: string,
            uris: Array<string>,
            secured: string,
            authenticated: string,
        }>,
        limits: any,
    }>;
    msgVpnAttributes?: {
        vpnEventLargeMsgThreshold: string,
        authenticationClientCertValidateDateEnabled: string,
        vpnMaxConnectionCount: string,
        vpnAdminUsername: string,
        vpnMaxTransactedSessionCount: string,
        subDomainName: string,
        vmrVersion: string,
        vpnAdminPassword: string,
        vpnName: string,
        vpnMaxTransactionCount: string,
        vpnMaxMsgSpoolUsage: string,
        vpnMaxEndpointCount: string,
        vpnMaxEgressFlowCount: string,
        vpnMaxSubscriptionCount: string,
        authenticationClientCertEnabled: string,
        vpnEnabled: string,
        truststoreUri: string,
        authenticationBasicEnabled: string,
        vpnMaxIngressFlowCount: string,
    };
    locked?: boolean;
    messagingStorage?: number;
    serviceStage?: string;
    servicePackageId?: string;
    serviceClassDisplayedAttributes?: {
        'High Availability': string,
        'Network Speed': string,
        Storage: string,
        'Message Broker Tenancy': string,
        Queues: string,
        Clients: string,
        'Network Usage': string,
    };
    accountingLimits?: Array<{
        id: string,
        value: string,
        unit: string,
        thresholds: Array<{
            type: string,
            value: string,
        }>,
    }>;
    certificateAuthorities?: Array<string>;
    clientProfiles?: Array<string>;
    cluster?: {
        name: string,
        password: string,
        remoteAddress: string,
        primaryRouterName: string,
        supportedAuthenticationMode: Array<string>,
    };
    redundancyGroupSslEnabled?: boolean;
    configSyncSslEnabled?: boolean;
}
