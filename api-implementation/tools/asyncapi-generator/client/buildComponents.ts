import { AsyncApiChannels } from "../model/asyncapi/AsyncApiChannels";
import { AsyncApiComponents } from "../model/asyncapi/AsyncApiComponents";
import { AsyncApiMessage } from "../model/asyncapi/AsyncApiMessage";
import { AsyncApiOperation } from "../model/asyncapi/AsyncApiOperation";
import { AsyncApiParameter, AsyncApiParameterLike } from "../model/asyncapi/AsyncApiParameter";
import { AsyncApiReference } from "../model/asyncapi/AsyncApiReference";
import { AsyncApiSchema, AsyncApiSchemaLike } from "../model/asyncapi/AsyncApiSchema";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiParameter } from "../model/openapi/OpenApiParameter";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { OpenApiSchema } from "../model/openapi/OpenApiSchema";
import { buildParameter } from "./buildParameter";
import { buildSchema } from "./buildSchema";
import { getRef } from "./getRef";
import { Dictionary } from "../model/types";

/**
 * The component name of the event notification header.
 */
const NOTIFICATION_HEADER = "NotificationHeader";

/**
 * Retrieves the last element of a "$ref" string.
 * 
 * @param reference
 *                The reference.
 *
 * @returns The last element of the "$ref" string.
 */
const getLastItem = (reference: OpenApiReference): string => {
  const paths = reference.$ref.replace(/^#/g, "").split("/").filter(item => item);
  return paths[paths.length - 1];
}

function readSchemas(openApi: OpenApi, schemas: AsyncApiSchemaLike[], components: AsyncApiComponents): void;
function readSchemas(openApi: OpenApi, schemas: Dictionary<AsyncApiSchemaLike>, components: AsyncApiComponents): void;

/** implementation of overloaded function (see above) */
function readSchemas(openApi: OpenApi, schemas: unknown, components: AsyncApiComponents): void {

  if (Array.isArray(schemas)) {
    schemas.forEach(schema => readSchema(openApi, schema, components));
  } else if (schemas) {
    Object.entries(schemas).forEach(([_, schema]) => readSchema(openApi, schema, components));
  }
}

/**
 * Adds all components referenced in an AsyncAPI schema to a set of shared components.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param schema 
 *                The AsyncAPI schema (or reference to a schema).
 * @param components 
 *                The set of shared components.
 */
const readSchema = (openApi: OpenApi, schema: AsyncApiSchemaLike, components: AsyncApiComponents): void => {

  const schemas = components.schemas ?? {};

  if (schema && schema.hasOwnProperty("$ref") && schema["$ref"]) {
    const reference: OpenApiReference = { $ref: schema["$ref"] };
    const name: string = getLastItem(reference);
    if (name !== NOTIFICATION_HEADER) {
      schema = buildSchema(openApi, getRef<OpenApiSchema>(openApi, reference));
      schemas[name] = schema;
    }
  }

  schema = schema as AsyncApiSchema;
  if (schema) {

    readSchemas(openApi, schema.properties, components);
    if (typeof schema.additionalProperties !== "boolean") {
      readSchema(openApi, schema.additionalProperties, components);
    }
    readSchema(openApi, schema.propertyNames, components);

    readSchemas(openApi, schema.items, components);
    readSchema(openApi, schema.additionalItems, components);
    readSchema(openApi, schema.contains, components);

    readSchema(openApi, schema.if, components);
    readSchema(openApi, schema.then, components);
    readSchema(openApi, schema.else, components);

    readSchemas(openApi, schema.allOf, components);
    readSchemas(openApi, schema.anyOf, components);
    readSchemas(openApi, schema.oneOf, components);
    readSchemas(openApi, schema.not, components);
  }

  components.schemas = schemas;
}

/**
 * Adds all components referenced in an AsyncAPI parameter to a set of shared components.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param parameter 
 *                The AsyncAPI parameter (or reference to a parameter).
 * @param components 
 *                The set of shared components.
 */
const readParameter = (openApi: OpenApi, parameter: AsyncApiParameterLike, components: AsyncApiComponents): void => {

  const schemas = components.schemas ?? {};
  const parameters = components.parameters ?? {};

  if (parameter && parameter.hasOwnProperty("$ref") && parameter["$ref"]) {
    const reference: OpenApiReference = { $ref: parameter["$ref"] };
    const name: string = getLastItem(reference);
    parameter = buildParameter(openApi, getRef<OpenApiParameter>(openApi, reference));
    parameters[name] = parameter;
  }

  parameter = parameter as AsyncApiParameter;
  if (parameter) {
    readSchema(openApi, parameter.schema, components);
  }

  components.schemas = schemas;
  components.parameters = parameters;
}

/**
 * Adds all components referenced in an AsyncAPI operation to a set of shared components.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param operation 
 *                The AsyncAPI operation.
 * @param components 
 *                The set of shared components.
 */
const readOperation = (openApi: OpenApi, operation: AsyncApiOperation, components: AsyncApiComponents): void => {

  const schemas = components.schemas ?? {};

  if (operation && operation.message?.hasOwnProperty("payload")) {
    const message = operation.message as AsyncApiMessage;
    if (message.payload && message.payload.hasOwnProperty("type")) {
      readSchema(openApi, message.payload as AsyncApiSchema, components);
    }
  }

  components.schemas = schemas;
}

/**
 * Creates a set of reusable objects for a set of AsyncAPI channels from an OpenAPI specification.
 * 
 * This function parses a set of AsyncAPI channels for references to schemas and parameters and
 * creates a set of reusable objects for all references found.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param channels 
 *                The set of AsyncAPI channels.
 * 
 * @returns The set of reusable objects for the list of AsyncAPI channels.
 */
export const buildComponents = (openApi: OpenApi, channels: AsyncApiChannels): AsyncApiComponents => {

  const notificationHeader: AsyncApiSchema = {
    type: "object",
    required: ["org", "time", "topic"],
    additionalProperties: false,
    properties: {
      org: {
        type: "string",
        maxLength: 188,
        minLength: 4,
        pattern: "^[a-zA-Z0-9_-]*$",
        description: "The name of the organization"
      },
      time: {
        type: "string",
        description: "The date and time when the event was created",
        format: "date-time"
      },
      topic: {
        type: "string",
        description: "The topic string",
      },
    },
  };

  const components: AsyncApiComponents = {
    schemas: {
      [NOTIFICATION_HEADER]: notificationHeader,
    },
    parameters: {},
  };

  for (const channelName in channels) {

    const channel = channels[channelName];

    for (const key in channel.parameters) {
      readParameter(openApi, channel.parameters[key], components);
    }
    readOperation(openApi, channel.publish, components);
    readOperation(openApi, channel.subscribe, components);
  }

  if (Object.keys(components.parameters).length === 0) {
    delete components.parameters;
  }

  return components;
}
