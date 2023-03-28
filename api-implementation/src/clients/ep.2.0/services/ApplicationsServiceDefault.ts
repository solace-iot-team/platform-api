/* eslint-disable */

import type { ApplicationsService } from './ApplicationsService';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';
import { request as __request } from '../core/request';
import type { ApiOptions } from '../core/ApiOptions';

export class ApplicationsServiceDefault implements ApplicationsService {

    private readonly config: ApiOptions;

    /**
     * creates a new service
     * @param config the configuration to use
     */
    public constructor(config: ApiOptions) {
        this.config = config;
    }

    public async getApplications(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
        applicationType?: string,
    ): Promise<any> {
        const options = this.getApplicationsApiRequestOptions(
            pageSize,
            pageNumber,
            name,
            applicationDomainId,
            ids,
            sort,
            customAttributes,
            applicationType,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        name?: string,
        applicationDomainId?: string,
        ids?: Array<string>,
        sort?: string,
        customAttributes?: string,
        applicationType?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applications`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'name': name,
                'applicationDomainId': applicationDomainId,
                'ids': ids,
                'sort': sort,
                'customAttributes': customAttributes,
                'applicationType': applicationType,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async createApplication(
        requestBody: any,
    ): Promise<any> {
        const options = this.createApplicationApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createApplicationApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/applications`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplication(
        id: string,
    ): Promise<any> {
        const options = this.getApplicationApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applications/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async deleteApplication(
        id: string,
    ): Promise<void> {
        const options = this.deleteApplicationApiRequestOptions(
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteApplicationApiRequestOptions(
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/applications/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateApplication(
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateApplicationApiRequestOptions(
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationApiRequestOptions(
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applications/${id}`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplicationVersionsForApplication(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getApplicationVersionsForApplicationApiRequestOptions(
            applicationId,
            displayName,
            ids,
            version,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationVersionsForApplicationApiRequestOptions(
        applicationId: string,
        displayName?: string,
        ids?: Array<string>,
        version?: string,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applications/${applicationId}/versions`,
            query: {
                'displayName': displayName,
                'ids': ids,
                'version': version,
                'customAttributes': customAttributes,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async createApplicationVersionForApplication(
        applicationId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.createApplicationVersionForApplicationApiRequestOptions(
            applicationId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/applications/${applicationId}/versions`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<any> {
        const options = this.getApplicationVersionForApplicationApiRequestOptions(
            applicationId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applications/${applicationId}/versions/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async deleteApplicationVersionForApplication(
        applicationId: string,
        id: string,
    ): Promise<void> {
        const options = this.deleteApplicationVersionForApplicationApiRequestOptions(
            applicationId,
            id,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/applications/${applicationId}/versions/${id}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateApplicationVersionForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateApplicationVersionForApplicationApiRequestOptions(
            applicationId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationVersionForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applications/${applicationId}/versions/${id}`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateApplicationVersionStateForApplication(
        applicationId: string,
        id: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateApplicationVersionStateForApplicationApiRequestOptions(
            applicationId,
            id,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationVersionStateForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applications/${applicationId}/versions/${id}/state`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplicationVersionAsyncApiForApplication(
        applicationId: string,
        id: string,
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        asyncApiVersion: string = '2.5.0',
        format: 'json' | 'yaml' = 'json',
        messagingServiceId?: string,
    ): Promise<string> {
        const options = this.getApplicationVersionAsyncApiForApplicationApiRequestOptions(
            applicationId,
            id,
            showVersioning,
            includedExtensions,
            asyncApiVersion,
            format,
            messagingServiceId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationVersionAsyncApiForApplicationApiRequestOptions(
        applicationId: string,
        id: string,
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        asyncApiVersion: string = '2.5.0',
        format: 'json' | 'yaml' = 'json',
        messagingServiceId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applications/${applicationId}/versions/${id}/asyncApi`,
            query: {
                'showVersioning': showVersioning,
                'includedExtensions': includedExtensions,
                'asyncApiVersion': asyncApiVersion,
                'format': format,
                'messagingServiceId': messagingServiceId,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplicationVersions(
        pageSize: number = 20,
        pageNumber: number = 1,
        applicationIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        customAttributes?: string,
    ): Promise<any> {
        const options = this.getApplicationVersionsApiRequestOptions(
            pageSize,
            pageNumber,
            applicationIds,
            ids,
            messagingServiceIds,
            customAttributes,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationVersionsApiRequestOptions(
        pageSize: number = 20,
        pageNumber: number = 1,
        applicationIds?: Array<string>,
        ids?: Array<string>,
        messagingServiceIds?: Array<string>,
        customAttributes?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applicationVersions`,
            query: {
                'pageSize': pageSize,
                'pageNumber': pageNumber,
                'applicationIds': applicationIds,
                'ids': ids,
                'messagingServiceIds': messagingServiceIds,
                'customAttributes': customAttributes,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async createApplicationVersion(
        requestBody: any,
    ): Promise<any> {
        const options = this.createApplicationVersionApiRequestOptions(
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public createApplicationVersionApiRequestOptions(
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'POST',
            path: `/api/v2/architecture/applicationVersions`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getApplicationVersion(
        versionId: string,
    ): Promise<any> {
        const options = this.getApplicationVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getApplicationVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applicationVersions/${versionId}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async deleteApplicationVersion(
        versionId: string,
    ): Promise<void> {
        const options = this.deleteApplicationVersionApiRequestOptions(
            versionId,
        );
        const result = await __request(options);
        return result.body;
    }

    public deleteApplicationVersionApiRequestOptions(
        versionId: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'DELETE',
            path: `/api/v2/architecture/applicationVersions/${versionId}`,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateApplicationVersion(
        versionId: string,
        requestBody: any,
        include?: Array<string>,
        relationsBrokerType?: string,
    ): Promise<any> {
        const options = this.updateApplicationVersionApiRequestOptions(
            versionId,
            requestBody,
            include,
            relationsBrokerType,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationVersionApiRequestOptions(
        versionId: string,
        requestBody: any,
        include?: Array<string>,
        relationsBrokerType?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applicationVersions/${versionId}`,
            query: {
                'include': include,
                'relationsBrokerType': relationsBrokerType,
            },
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateApplicationVersionState(
        versionId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateApplicationVersionStateApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateApplicationVersionStateApiRequestOptions(
        versionId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PATCH',
            path: `/api/v2/architecture/applicationVersions/${versionId}/state`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async updateMsgSvcAssociationForAppVersion(
        versionId: string,
        requestBody: any,
    ): Promise<any> {
        const options = this.updateMsgSvcAssociationForAppVersionApiRequestOptions(
            versionId,
            requestBody,
        );
        const result = await __request(options);
        return result.body;
    }

    public updateMsgSvcAssociationForAppVersionApiRequestOptions(
        versionId: string,
        requestBody: any,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'PUT',
            path: `/api/v2/architecture/applicationVersions/${versionId}/messagingServices`,
            body: requestBody,
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

    public async getAsyncApiForApplicationVersion(
        applicationVersionId: string,
        format: 'json' | 'yaml' = 'json',
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        asyncApiVersion: string = '2.5.0',
        messagingServiceId?: string,
    ): Promise<string> {
        const options = this.getAsyncApiForApplicationVersionApiRequestOptions(
            applicationVersionId,
            format,
            showVersioning,
            includedExtensions,
            asyncApiVersion,
            messagingServiceId,
        );
        const result = await __request(options);
        return result.body;
    }

    public getAsyncApiForApplicationVersionApiRequestOptions(
        applicationVersionId: string,
        format: 'json' | 'yaml' = 'json',
        showVersioning: boolean = false,
        includedExtensions: string = 'all',
        asyncApiVersion: string = '2.5.0',
        messagingServiceId?: string,
    ): ApiRequestOptions {
        return {
            ...this.config,
            method: 'GET',
            path: `/api/v2/architecture/applicationVersions/${applicationVersionId}/asyncApi`,
            query: {
                'format': format,
                'showVersioning': showVersioning,
                'includedExtensions': includedExtensions,
                'asyncApiVersion': asyncApiVersion,
                'messagingServiceId': messagingServiceId,
            },
            errors: {
                400: `Bad Request.`,
                401: `Unauthorized.`,
                403: `Forbidden.`,
                404: `Not Found.`,
                405: `Method Not Allowed`,
                500: `Internal Server Error.`,
                501: `Not Implemented`,
                503: `Service Unavailable.`,
                504: `Gateway Timeout.`,
            },
        };
    }

}