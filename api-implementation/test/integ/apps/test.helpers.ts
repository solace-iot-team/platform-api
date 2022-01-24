import { expect } from 'chai';
import { SolaceCloudClientFactory } from '../../lib/broker.helpers';
import type { Developer, Environment } from "../../lib/generated/openapi";
import { WebHook } from "../../lib/generated/openapi";
import {
  MsgVpnAclProfile,
  MsgVpnAclProfilePublishExceptionsResponse,
  MsgVpnAclProfileSubscribeExceptionsResponse,
  MsgVpnQueue,
  MsgVpnQueueResponse,
  MsgVpnRestDeliveryPointQueueBindingsResponse,
  MsgVpnRestDeliveryPointRestConsumersResponse
} from "../../../src/clients/sempv2";
import { msgVpnNamePerEnvironment } from './setup';

/**
 * Event broker ACL profile.
 */
export type AclProfile = {
  pubTopicExceptions: Array<string>,
  subTopicExceptions: Array<string>,
}

/**
 * Event broker message queue.
 */
export type Queue = {
  accessType: Queue.accessType,
  maxTimeToLive: number,
}

export namespace Queue {
  export import accessType = MsgVpnQueue.accessType
}

/**
 * Event broker REST delivery point.
 */
export type RestDeliveryPoint = {
  consumerRemoteHost: string,
  consumerRemotePort: number,
  consumerHttpMethod: string,
  queueBindingPostRequestTarget: string,
}

/**
 * Create a developer profile with test values.
 * 
 * @param organizationName The organization name.
 * @param developerName The developer name.
 * 
 * @returns The created developer profile.
 */
 export function createDeveloperProfile(organizationName: string, developerName: string): Developer {

  const developer: Developer = {
    email: `${developerName}@mycompany.com`,
    firstName: "firstName",
    lastName: "lastname",
    userName: `${developerName}@${organizationName}`,
  }

  return developer;
}

/**
 * Create a {@link RestDeliveryPoint} from a {@link WebHook}.
 * 
 * @param webHook The web hook.
 * @return The expected REST delivery point configuration.
 */
export function createRestDeliveryPointFromWebHook(webHook: WebHook): RestDeliveryPoint {

  const url = new URL(webHook.uri);

  let remotePort: number;
  if (url.port !== '') {
    remotePort = +url.port;
  } else if (url.protocol === 'https:') {
    remotePort = 443;
  } else {
    remotePort = 80;
  }

  const restDeliveryPoint: RestDeliveryPoint = {
    consumerRemoteHost: url.hostname,
    consumerRemotePort: remotePort,
    consumerHttpMethod: webHook.method.toLocaleLowerCase(),
    queueBindingPostRequestTarget: url.pathname,
  }

  return restDeliveryPoint;
}

/**
 * Verify the event broker configuration for an ACL profile.
 * 
 * @param environmentName The name of the environment.
 * @param aclProfileName The name of the ACL profile.
 * @param aclProfile The expected configuration (null, if no ACL profile is expected).
 */
export async function verifyAclProfile(environment: Environment, aclProfileName: string, aclProfile: AclProfile): Promise<void> {

  const msgVpnName: string = msgVpnNamePerEnvironment.get(environment.name);
  let apiClient = await SolaceCloudClientFactory.createSempV2Client(environment.serviceId);

  if (!aclProfile) {

    let isFound = true;
    await apiClient.getMsgVpnAclProfile(msgVpnName, aclProfileName).catch((reason) => {
      expect(reason.status, `${environment.name}: status code is not correct`).to.be.greaterThanOrEqual(400);
      isFound = false;
    });
    expect(isFound, `${environment.name}: unexpected ACL profile found`).to.be.false;

  } else {

    const response = await apiClient.getMsgVpnAclProfile(msgVpnName, aclProfileName).catch((reason) => {
      expect.fail(`${environment.name}: failed to get ACL profile; res="${JSON.stringify(reason, null, 2)}"`);
    });

    expect(response, `${environment.name}: default action for a connect is not correct`).to.have.nested.property(
      'data.clientConnectDefaultAction', MsgVpnAclProfile.clientConnectDefaultAction.ALLOW
    );
    expect(response, `${environment.name}: default action for publish is not correct`).to.have.nested.property(
      'data.publishTopicDefaultAction', MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW
    );
    expect(response, `${environment.name}: default action for subscribe is not correct`).to.have.nested.property(
      'data.subscribeTopicDefaultAction', MsgVpnAclProfile.publishTopicDefaultAction.DISALLOW
    );

    const pubTopicExcRes = await apiClient.getMsgVpnAclProfilePublishTopicExceptions(msgVpnName, aclProfileName, 10).catch((reason) => {
      expect.fail(`${environment.name}: failed to get publish topic exceptions; res="${JSON.stringify(reason, null, 2)}"`);
    }) as MsgVpnAclProfilePublishExceptionsResponse;

    let pubTopicExceptions: string[] = [];
    pubTopicExcRes.data.forEach((item) => {
      // the exception is returned as 'publishTopicException',
      // which is not part of the exported Typescript type
      pubTopicExceptions.push(item['publishTopicException']);
    });
    expect(pubTopicExceptions).to.be.have.members(
      aclProfile.pubTopicExceptions, `${environment.name}: publish topic exceptions are not correct`
    );

    const subTopicExcRes = await apiClient.getMsgVpnAclProfileSubscribeTopicExceptions(msgVpnName, aclProfileName, 10).catch((reason) => {
      expect.fail(`${environment.name}: failed to get subscribe topic exceptions; res="${JSON.stringify(reason, null, 2)}"`);
    }) as MsgVpnAclProfileSubscribeExceptionsResponse;

    let subTopicExceptions: string[] = [];
    subTopicExcRes.data.forEach((item) => {
      // the exception is returned as 'subscribeTopicException',
      // which is not part of the exported Typescript type
      subTopicExceptions.push(item['subscribeTopicException']);
    });
    expect(subTopicExceptions).to.be.have.members(
      aclProfile.subTopicExceptions, `${environment.name}: list of subscribe topic exceptions is not correct`
    );
  }
}

/**
 * Verify the event broker configuration for a message queue.
 * 
 * @param environmentName The name of the environment.
 * @param queueName The name of the message queue.
 * @param queue The expected configuration (null, if no queue is expected).
 */
export async function verifyMessageQueue(environment: Environment, queueName: string, queue: Queue): Promise<void> {

  const msgVpnName: string = msgVpnNamePerEnvironment.get(environment.name);
  let apiClient = await SolaceCloudClientFactory.createSempV2Client(environment.serviceId);

  if (!queue) {

    let isFound = true;
    await apiClient.getMsgVpnQueue(msgVpnName, queueName).catch((reason) => {
      expect(reason.status, `${environment.name}: status code is not correct`).to.be.greaterThanOrEqual(400);
      isFound = false;
    });
    expect(isFound, `${environment.name}: unexpected queue found`).to.be.false;

  } else {

    let queueResponse = await apiClient.getMsgVpnQueue(msgVpnName, queueName).catch((reason) => {
      expect.fail(`${environment.name}: failed to get queue; res="${JSON.stringify(reason, null, 2)}"`);
    }) as MsgVpnQueueResponse;

    console.log(JSON.stringify(queueResponse, null, 2));
    expect(queueResponse.data.accessType, "").to.be.equals(queue.accessType);
  }
}

/**
 * Verify the event broker configuration for a REST delivery point.
 * 
 * @param environmentName The name of the environment.
 * @param restDeliveryPointName The name of the REST delivery point.
 * @param restDeliveryPoint The expected configuration (null, if no web hook is expected).
 */
export async function verifyRestDeliveryPoint(environment: Environment, restDeliveryPointName: string, restDeliveryPoint: RestDeliveryPoint): Promise<void> {

  const msgVpnName: string = msgVpnNamePerEnvironment.get(environment.name);
  let apiClient = await SolaceCloudClientFactory.createSempV2Client(environment.serviceId);

  if (!restDeliveryPoint) {

    let isFound = true;
    await apiClient.getMsgVpnRestDeliveryPoint(msgVpnName, restDeliveryPointName).catch((reason) => {
      expect(reason.status, `${environment.name}: status code is not correct`).to.be.greaterThanOrEqual(400);
      isFound = false;
    });
    expect(isFound, `${environment.name}: unexpected REST delivery point found`).to.be.false;

  } else {

    let response = await apiClient.getMsgVpnRestDeliveryPoint(msgVpnName, restDeliveryPointName).catch((reason) => {
      expect.fail(`${environment.name}: failed to get REST delivery point; res="${JSON.stringify(reason, null, 2)}"`);
    });

    expect(response, `${environment.name}: REST delivery point is not enabled`).to.have.nested.property('data.enabled', true);

    const consumersResponse = await apiClient.getMsgVpnRestDeliveryPointRestConsumers(msgVpnName, restDeliveryPointName, 10).catch((reason) => {
      expect.fail(`${environment.name}: failed to get a list of all consumers; res="${JSON.stringify(reason, null, 2)}"`);
    }) as MsgVpnRestDeliveryPointRestConsumersResponse;

    expect(consumersResponse.data, `${environment.name}: no REST consumer found`).to.be.an('array').that.has.lengthOf(1);

    expect(consumersResponse.data[0], `${environment.name}: REST consumer is not correct`).to.deep.include({
      'restDeliveryPointName': restDeliveryPointName,
      'remoteHost': restDeliveryPoint.consumerRemoteHost,
      'remotePort': restDeliveryPoint.consumerRemotePort,
      'httpMethod': restDeliveryPoint.consumerHttpMethod,
    });

    const queueBindingsResponse = await apiClient.getMsgVpnRestDeliveryPointQueueBindings(msgVpnName, restDeliveryPointName, 10).catch((reason) => {
      expect.fail(`${environment.name}: failed to get queue bindings; res="${JSON.stringify(reason, null, 2)}"`);
    }) as MsgVpnRestDeliveryPointQueueBindingsResponse;

    expect(queueBindingsResponse.data, `${environment.name}: no queue binding found`).to.be.an('array').that.has.lengthOf(1);

    expect(queueBindingsResponse.data[0], `${environment.name}: queue binding is not correct`).to.deep.include({
      'restDeliveryPointName': restDeliveryPointName,
      'postRequestTarget': restDeliveryPoint.queueBindingPostRequestTarget,
    });
  }
}