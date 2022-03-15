import * as fs from "fs";
import * as yaml from "js-yaml";

import { AsyncApi } from "./model/asyncapi/AsyncApi";
import { OpenApiTag } from "./model/openapi/OpenApiTag";
import { buildChannels, ChannelOperation } from "./client/buildChannels";
import { buildComponents } from "./client/buildComponents";
import { buildInfo } from "./client/buildInfo";
import { buildTags } from "./client/buildTags";
import { writeApiSpec, OutputFormat } from "./client/writeApiSpec";

export type { ChannelOperation } from "./client/buildChannels";
export type { OutputFormat } from "./client/writeApiSpec";

/**
 * The options for creating one or more AsyncAPI specifications from an OpenAPI specification.
 */
export class Options {

  /** The OpenAPI specification file. */
  input: string;
  /** The target directory. */
  output: string;
  /** The output format ("json" or "yaml"). */
  outputFormat: OutputFormat;
  /** The base URL for the OpenAPI API. */
  baseUrl: string;
  /** The channel prefix. */
  channelPrefix: string;
  /** The AsyncAPI operation to create for all channels (publish or subscribe). */
  channelOperation: ChannelOperation;
  /** 
   * The relative path to the OpenAPI operation request body or an OpenAPI operation response. The
   * referenced request body or response will be used to create the definition of the message that
   * will be published or received.
   */
  messagePath: string;
  /**
   * Whether to split the OpenAPI specification into multiple AsyncAPI specifications. If 'true',
   * the created AsyncAPI channels will be grouped based on the assigned tags and for each group,
   * a separate AsyncAPI specification will be created.
   */
  split: boolean;
}

/**
 * Creates one or more AsyncAPI specifications from an OpenAPI specification.
 * 
 * @param options 
 *                The options.
 */
export function generate(options: Options) {

  const data = fs.readFileSync(options.input);

  let openApi: any;
  if (options.input.endsWith('.json')) {
    openApi = JSON.parse(data.toString());
  } else if (options.input.endsWith('.yml')) {
    openApi = yaml.load(data.toString());
  }

  const info = buildInfo(openApi);
  const channels = buildChannels(
    openApi,
    options.baseUrl,
    options.channelPrefix,
    options.channelOperation,
    options.messagePath
  );

  let canSplitByTag: boolean = true;
  for (const name in channels) {
    const tags = channels[name][options.channelOperation].tags;
    if (!tags) {
      canSplitByTag = false;
    }
  }

  if (options.split === false || !canSplitByTag) {

    const asyncApi: AsyncApi = {
      asyncapi: "2.3.0",
      info: info,
      channels: channels,
      components: buildComponents(openApi, channels),
      tags: buildTags(openApi, openApi.tags?.map((tag: OpenApiTag) => tag.name)),
    }

    writeApiSpec(asyncApi, "api", options.output, options.outputFormat);

  } else {

    const asyncApis: Record<string, AsyncApi> = {};

    for (const name in channels) {

      const channel = channels[name];
      const tags = channel[options.channelOperation].tags || [];

      tags.forEach(tag => {

        const asyncApi = asyncApis[tag.name] || {
          asyncapi: "2.3.0",
          info: {
            ...info,
            title: `${info.title} (${tag.name})`,
            description: tag.description,
          },
          channels: {},
          tags: [{ ...tag }],
        }

        asyncApi.channels[name] = channel;
        asyncApis[tag.name] = asyncApi;
      });
    }

    for (const name in asyncApis) {

      const asyncApi = {
        ...asyncApis[name],
        components: buildComponents(openApi, asyncApis[name].channels),
      }

      writeApiSpec(asyncApi, `${name}`, options.output, options.outputFormat);
    }
  }
}
