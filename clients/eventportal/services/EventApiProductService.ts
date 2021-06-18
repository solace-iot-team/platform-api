/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventAPIProductListResponse } from '../models/EventAPIProductListResponse';
import type { EventAPIProductResponse } from '../models/EventAPIProductResponse';
import { request as __request } from '../core/request';

export class EventApiProductService {

    /**
     * get api products
     * @returns EventAPIProductListResponse
     * @throws ApiError
     */
    public static async getapiproducts(): Promise<EventAPIProductListResponse> {
        const result = await __request({
            method: 'GET',
            path: `/apiProducts`,
        });
        return result.body;
    }

    /**
     * get api product
     * @param productId
     * @returns EventAPIProductResponse
     * @throws ApiError
     */
    public static async getapiproduct(
        productId: string,
    ): Promise<EventAPIProductResponse> {
        const result = await __request({
            method: 'GET',
            path: `/apiProducts/${productId}`,
        });
        return result.body;
    }

    /**
     * get async api
     * @param productId
     * @returns any
     * @throws ApiError
     */
    public static async getasyncapiJson(
        productId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/apiProducts/${productId}/asyncApi.json`,
        });
        return result.body;
    }

    /**
     * get async api
     * @param productId
     * @returns string
     * @throws ApiError
     */
    public static async getasyncapiYaml(
        productId: string,
    ): Promise<string> {
        const result = await __request({
            method: 'GET',
            path: `/apiProducts/${productId}/asyncApi.yaml`,
        });
        return result.body;
    }

}