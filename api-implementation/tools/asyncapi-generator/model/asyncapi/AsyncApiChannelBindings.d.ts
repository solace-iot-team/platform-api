import { Dictionary } from "../types";
import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#channelBindingsObject
 */
export interface AsyncApiChannelBindings {
  http?: Dictionary;
  ws?: Dictionary;
  kafka?: Dictionary;
  anypointmq?: Dictionary;
  amqp?: Dictionary;
  amqp1?: Dictionary;
  mqtt?: Dictionary;
  mqtt5?: Dictionary;
  nats?: Dictionary;
  jms?: Dictionary;
  sns?: Dictionary;
  solace?: Dictionary;
  sqs?: Dictionary;
  stomp?: Dictionary;
  redis?: Dictionary;
  mercure?: Dictionary;
  ibmmq?: Dictionary;
}

export type AsyncApiChannelBindingsLike =
  | AsyncApiChannelBindings
  | AsyncApiReference;
