/* eslint-disable */

import type { ClientProfileRequest } from '../models/ClientProfileRequest';
import type { CloudRequestStatusResponse } from '../models/CloudRequestStatusResponse';
import type { ServiceResponse } from '../models/ServiceResponse';
import type { ServicesResponse } from '../models/ServicesResponse';
import type { ApiRequestOptions } from '../core/ApiRequestOptions';

export interface ServicesService {

    /**
     * @returns ServicesResponse list of services
     */
    listServices(): Promise<ServicesResponse>;

    /**
     * **used to get the request options without making a http request**
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    listServicesApiRequestOptions(): ApiRequestOptions;

    /**
     * @param serviceId the id of a cloud service
     * @returns ServiceResponse service
     */
    getService(
        serviceId: string,
    ): Promise<ServiceResponse>;

    /**
     * **used to get the request options without making a http request**
     * @param serviceId the id of a cloud service
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    getServiceApiRequestOptions(
        serviceId: string,
    ): ApiRequestOptions;

    /**
     * @param serviceId the id of a cloud service
     * @param requestBody Client Profile Request
     * @returns CloudRequestStatusResponse service
     */
    sendClientProfileRequest(
        serviceId: string,
        requestBody?: ClientProfileRequest,
    ): Promise<CloudRequestStatusResponse>;

    /**
     * **used to get the request options without making a http request**
     * @param serviceId the id of a cloud service
     * @param requestBody Client Profile Request
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    sendClientProfileRequestApiRequestOptions(
        serviceId: string,
        requestBody?: ClientProfileRequest,
    ): ApiRequestOptions;

    /**
     * @param serviceId the id of a cloud service
     * @param requestId the id of a cloud request
     * @param withProgress if response should contain progress information
     * @returns CloudRequestStatusResponse service
     */
    trackCloudRequestStatus(
        serviceId: string,
        requestId: string,
        withProgress: boolean,
    ): Promise<CloudRequestStatusResponse>;

    /**
     * **used to get the request options without making a http request**
     * @param serviceId the id of a cloud service
     * @param requestId the id of a cloud request
     * @param withProgress if response should contain progress information
     * @returns ApiRequestOptions the request options to fulfill a http request
     */
    trackCloudRequestStatusApiRequestOptions(
        serviceId: string,
        requestId: string,
        withProgress: boolean,
    ): ApiRequestOptions;

}