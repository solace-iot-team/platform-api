import * as fs from "fs";
import * as yaml from "js-yaml";
import { AsyncApi } from "../model/asyncapi/AsyncApi";

/**
 * The output format (JSON or YAML).
 */
 export type OutputFormat = "json" | "yaml";

/**
 * Writes an AsyncAPI specification to a file.
 * 
 * @param asyncApi 
 *                The AsyncAPI specification.
 * @param name 
 *                A short name of the AsyncAPI specification.
 * @param directory 
 *                The target directory.
 * @param format 
 *                The output format.
 */
 export const writeApiSpec = (asyncApi: AsyncApi, name: string, directory: string, format: OutputFormat): void => {

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  switch (format) {
    case "json":
      fs.writeFileSync(`${directory}/${name}.json`, JSON.stringify(asyncApi, null, 2));
      break;
    case "yaml":
      fs.writeFileSync(`${directory}/${name}.yml`, yaml.dump(asyncApi));
      break;
  }
}
