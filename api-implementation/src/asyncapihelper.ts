import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";
import L from '../server/common/logger';
import Format = Paths.GetApi.Parameters.Format;
import APIParameter = Components.Schemas.APIParameter;
import { isString } from './typehelpers';
import parser, { AsyncAPIDocument } from '@asyncapi/parser';
import { Archiver, create as createArchiver } from 'archiver';

import YAML from 'js-yaml';

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
          for (const msg of d.allMessages()) {
            const p: Buffer = Buffer.from(JSON.stringify(msg[1].originalPayload()));
            archiver.append(p, { name: `${msg[0]}.json` });
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
