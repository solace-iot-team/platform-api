import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";
import L from '../server/common/logger';
import Format = Paths.GetApi.Parameters.Format;
import APIParameter = Components.Schemas.APIParameter;
import { isString } from './typehelpers';
import parser, { AsyncAPIDocument, ChannelParameter } from '@asyncapi/parser';
import { Archiver, create as createArchiver } from 'archiver';
import Attributes = Components.Schemas.Attributes;
import YAML from 'js-yaml';

export enum Direction {
  Publish = 'Publish',
  Subscribe = 'Subscribe',
}
export class AsyncAPIHelper {
  getContentType(apiSpec: string): string {
    try {
      const o = JSON.parse(apiSpec);
      if (o && typeof o === "object") {
        return "application/json";
      } else {
        return "application/x-yaml";
      }
    }
    catch (e) {
      return "application/x-yaml";
    }
  }

  YAMLtoJSON(apiSpec: string): string {
    if (this.getContentType(apiSpec) == "application/x-yaml") {
      const o = YAML.load(apiSpec, { schema: YAML.DEFAULT_SCHEMA });
      return JSON.stringify(o);
    } else {
      throw new ErrorResponseInternal(500, "Invalid YAMl");
    }
  }
  JSONtoYAML(apiSpec: string): string {
    if (this.getContentType(apiSpec) == "application/json") {
      const o = JSON.parse(apiSpec);
      return YAML.dump(o);
    } else {
      throw new ErrorResponseInternal(500, "Invalid JSON");
    }
  }
  YAMLtoObject(apiSpec: string): any {
    if (this.getContentType(apiSpec) == "application/x-yaml") {
      const o = YAML.load(apiSpec);
      return o;
    } else {
      throw new ErrorResponseInternal(500, "Invalid YAMl");
    }
  }

  async handleResponse(r, req, res, next, statusCode: number = 200, name?: string) {

    if (r != null) {
      const contentType: Format = req.query['format'] as Format;
      L.info(contentType);
      if (contentType == "application/json") {
        if (this.getContentType(r) == "application/json") {
          if (isString(r))
            res.status(statusCode).contentType(contentType).json(JSON.parse(r));
          else
            res.status(statusCode).contentType(contentType).json(r);
        } else {
          res.status(statusCode).contentType(contentType).json(this.YAMLtoJSON(r));
        }
      } else if (contentType == "application/x-yaml") {
        if (this.getContentType(r) == "application/x-yaml") {
          res.status(statusCode).contentType(contentType).send(r);
        } else {
          res.status(statusCode).contentType(contentType).send(this.JSONtoYAML(r));
        }
      } else if (contentType == "application/zip") {
        const archiver: Archiver = createArchiver('zip');
        archiver.on('finish', function (error) {
          L.debug(`Archiver signaled finished - res end`);
          return res.end();
        });
        try {
          const d: AsyncAPIDocument = await parser.parse(r);
          res.attachment(name ? `${name}.zip` : `spec.zip`);
          res.status(statusCode).contentType(contentType);

          archiver.pipe(res);
          let extension: string = 'json';
          if (this.getContentType(r) == "application/x-yaml") {
            extension = 'yaml'
          }

          archiver.append(r as string, { name: name ? `${name}.${extension}` : `spec.${extension}` });
          const schemaNames: string[] = [];
          for (const msg of d.allMessages()) {
            const schemaName: string = msg[1].payload().json()["x-parser-schema-id"];
            if (!schemaNames.find(s => s == schemaName)) {
              const p: Buffer = Buffer.from(JSON.stringify(msg[1].originalPayload()));
              archiver.append(p, { name: `schemas/${schemaName}.json` });
              schemaNames.push(schemaName);
            }
          }
          await archiver.finalize();
        } catch (e) {
          L.error(e);
          next(new ErrorResponseInternal(500, 'Invalid AsyncAPI in storage'));
        }

      } else {
        if (this.getContentType(r) == "application/json") {
          if (isString(r)) {
            res.status(statusCode).contentType("application/json").json(JSON.parse(r));
          } else {
            res.status(statusCode).contentType("application/json").json(r);
          }
        } else {
          res.status(statusCode).contentType("application/json").json(this.YAMLtoJSON(r));
        }
      }
    } else {
      next(new ErrorResponseInternal(404, `Not found`));
    }
  }

  public async getChannelResources(specification: string, direction: Direction): Promise<string[]>{
    const resources: string[] =[];
    try {
      const parsedSpec: AsyncAPIDocument = await parser.parse(specification);
      for (const s of parsedSpec.channelNames()) {
        const channel = parsedSpec.channel(s);
        if (direction == Direction.Subscribe && channel.hasSubscribe()) {
          resources.push(s);
        }
        if (direction == Direction.Publish && channel.hasPublish()) {
          resources.push(s);
        }
      }
      return resources;
    } catch (e) {
      L.warn(e);
      throw new ErrorResponseInternal(500, `Unable to parse, ${e.title}, ${e.detail}`);
    }
  }

  public async getParameterEnums(specification: string): Promise<Attributes> {
    const attributes: Attributes = []
    try {
      const parsedSpec: AsyncAPIDocument = await parser.parse(specification);
      for (const s of parsedSpec.channelNames()) {
        const channel = parsedSpec.channel(s);
        if (channel.hasParameters()) {
          for (const [key, parameter] of Object.entries<ChannelParameter>(channel.parameters())) {
            if (!attributes.find(a => a.name == key) && parameter.schema().enum() && parameter.schema().enum().length > 0) {
              attributes.push({
                name: key,
                value: parameter.schema().enum().join(','),
              });
            }
          }
        }
      }
      return attributes;
    } catch (e) {
      L.warn(e);
      throw new ErrorResponseInternal(500, `Unable to parse, ${e.title}, ${e.detail}`);
    }
  }

  public async getAsyncAPIParameters(spec: string): Promise<APIParameter[]> {
    try {
      let parameterNames: APIParameter[] = [];
      const d: AsyncAPIDocument = await parser
        .parse(spec);
      d.channelNames().forEach(s => {
        const c = d.channel(s);
        if (c.hasParameters()) {
          const keys = Object.keys(c.parameters());
          keys.forEach(k => {
            const param: APIParameter = {
              name: k,
              type: (c.parameter(k).schema().type() as string) == "string" ? "string" : "number"
            };
            if (c.parameter(k).schema().enum()) {
              param.enum = c.parameter(k).schema().enum();
            }
            parameterNames.push(param);
          });
        }
      });

      return this.uniqueLastVal(parameterNames, it => it.name);
    } catch (e) {
      L.error(`Unable to parse Async API spec ${e.title}, ${e.detail}`)
      throw new ErrorResponseInternal(400, `Unable to parse, ${e.title}, ${e.detail}`);
    }
  }

  private uniqueLastVal(data: any[], key: any): any[] {
    return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ]
  }

}

export default new AsyncAPIHelper();
