import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";

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

	YAMLtoJSON(apiSpec: string): string{
		if (this.getContentType(apiSpec)=="application/x-yaml"){
			var o = YAML.load(apiSpec);
			return JSON.stringify(o);
		} else {
			throw new ErrorResponseInternal(500, "Invalid YAMl");
		}
		
	}
	JSONtoYAML(apiSpec: string): string{
		if (this.getContentType(apiSpec)=="application/json"){
			var o = JSON.parse(apiSpec);
			return YAML.dump(o);
		} else {
			throw new ErrorResponseInternal(500, "Invalid JSON");
		}
		
	}
}

export default new AsyncAPIHelper();