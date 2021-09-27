import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";
import L from '../server/common/logger';
import Format = Paths.GetApi.Parameters.Format;

var YAML = require('js-yaml');

export class AsyncAPIHelper {
  getContentType(apiSpec: string): string {
    try {
      var o = JSON.parse(apiSpec);
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
      var o = YAML.load(apiSpec);
      return JSON.stringify(o);
    } else {
      throw new ErrorResponseInternal(500, "Invalid YAMl");
    }
  }
  JSONtoYAML(apiSpec: string): string {
    if (this.getContentType(apiSpec) == "application/json") {
      var o = JSON.parse(apiSpec);
      return YAML.dump(o);
    } else {
      throw new ErrorResponseInternal(500, "Invalid JSON");
    }
  }
  YAMLtoObject(apiSpec: string): any {
    if (this.getContentType(apiSpec) == "application/x-yaml") {
      var o = YAML.load(apiSpec);
      return o;
    } else {
      throw new ErrorResponseInternal(500, "Invalid YAMl");
    }
  }

  handleResponse(r, req, res, next, statusCode: number = 200) {

    if (r != null) {
      var contentType: Format = req.query['format'] as Format;
      L.info(contentType);
      if (contentType == "application/json") {
        if (this.getContentType(r) == "application/json") {
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
      } else {
        res.status(statusCode).contentType(this.getContentType(r)).send(r);
      }
    } else {
      next(new ErrorResponseInternal(404, `Not found`));
    }
  }

}

export default new AsyncAPIHelper();
