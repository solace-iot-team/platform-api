import { AsyncApiSchemaLike } from "../model/asyncapi/AsyncApiSchema";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { OpenApiSchema, OpenApiSchemaLike } from "../model/openapi/OpenApiSchema";
import { buildReference } from "./buildRefererence";
import { Dictionary } from "../model/types";

/**
 * Create a list of AsyncAPI schemas from a list of OpenAPI schemas.
 * 
 * @param openApi 
 *                The OpenAPI specification.
 * @param schemas
 *                The list of OpenAPI schemas.
 * 
 * @return The created list of AsyncAPI schemas.
 */
function buildSchemas(openApi: OpenApi, schemas: OpenApiSchemaLike[]): AsyncApiSchemaLike[];

/**
 * Create a set of AsyncAPI schemas from a set of OpenAPI schemas.
 * 
 * @param openApi 
 *                The OpenAPI specification.
 * @param schemas
 *                The set of OpenAPI schemas.
 * 
 * @return The created set of AsyncAPI schemas.
 */
function buildSchemas(openApi: OpenApi, schemas: Dictionary<OpenApiSchemaLike>): Dictionary<AsyncApiSchemaLike>;

/** implementation of overloaded function (see above) */
function buildSchemas(openApi: OpenApi, schemas: unknown): unknown {

  let result: unknown;

  if (Array.isArray(schemas)) {
    result = schemas && schemas.map(item => buildSchema(openApi, item));
  } else if (typeof schemas === "object") {
    result = {};
    for (const key in schemas) {
      if (schemas.hasOwnProperty(key)) {
        result[key] = buildSchema(openApi, schemas[key]);
      }
    }
  }

  return result;
}

/**
 * Creates an AsyncAPI schema from an OpenAPI schema.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param schema
 *                The OpenAPI schema.
 * 
 * @returns The created AsyncAPI schema.
 */
export const buildSchema = (openApi: OpenApi, schema: OpenApiSchemaLike): AsyncApiSchemaLike => {

  let result: AsyncApiSchemaLike;

  if (schema && schema.hasOwnProperty("$ref")) {
    result = buildReference(openApi, schema as OpenApiReference);
  } else if (schema) {
    schema = schema as OpenApiSchema;
    result = {
      title: schema.title,
      type: schema.type,
      required: schema.required,
      multipleOf: schema.multipleOf,
      maximum: schema.exclusiveMaximum ? undefined : schema.maximum,
      exclusiveMaximum: schema.exclusiveMaximum ? schema.maximum : undefined,
      minimum: schema.exclusiveMinimum ? undefined : schema.minimum,
      exclusiveMinimum: schema.exclusiveMinimum ? schema.minimum : undefined,
      maxLength: schema.maxLength,
      minLength: schema.minLength,
      pattern: schema.pattern,
      maxItems: schema.maxItems,
      minItems: schema.minItems,
      uniqueItems: schema.uniqueItems,
      maxProperties: schema.maxProperties,
      minProperties: schema.minProperties,
      enum: schema.enum,
      const: undefined,
      examples: schema.example ? [schema.example] : undefined,
      if: undefined,
      then: undefined,
      else: undefined,
      readOnly: schema.readOnly,
      writeOnly: schema.writeOnly,
      properties: buildSchemas(openApi, schema.properties),
      patternProperties: undefined,
      additionalProperties: typeof schema.additionalProperties === "boolean"
        ? schema.additionalProperties
        : buildSchema(openApi, schema.additionalProperties),
      additionalItems: undefined,
      items: schema.items ? [buildSchema(openApi, schema.items)] : undefined,
      propertyNames: undefined,
      contains: undefined,
      allOf: buildSchemas(openApi, schema.allOf),
      oneOf: buildSchemas(openApi, schema.oneOf),
      anyOf: buildSchemas(openApi, schema.anyOf),
      not: buildSchemas(openApi, schema.not),
      description: schema.description,
      format: schema.format,
      default: schema.default,
      discriminator: schema.discriminator?.propertyName,
      // TODO: Are external documents referenced in an OpenAPI schema still meaningful
      //       in the generated AsyncAPI schema?
      // externalDocs: buildExternalDocs(openApi, schema.externalDocs),
      deprecated: schema.deprecated,
    }
  }

  return result;
}
