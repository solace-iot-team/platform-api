import { Dictionary } from "../types";
import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#messageBindingsObject
 */
export interface AsyncApiMessageBindings {
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

export type AsyncApiMessageBindingsLike =
  | AsyncApiMessageBindings
  | AsyncApiReference;
