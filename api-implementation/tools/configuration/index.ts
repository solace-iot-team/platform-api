import fs from 'fs';
import yaml from "js-yaml";
import fetch from 'node-fetch';
import _ from 'lodash';

/** The options to configure an API Management Connector. */
type Options = {

  /** The API Management Connector to configure. */
  server: {
    /** The base URL of the server. */
    baseUrl: string;
    /** The username and password of the server admin. */
    admin: Credentials;
  };

  /** The organization to create. */
  organization: {
    /** The name of the organization. */
    name: string;
    /** The cloud token for the organization. */
    token: string;
    /** The username and password of the organization admin. */
    admin: Credentials;
  };

  /**
   * The names of service IDs of one or more Solace Cloud services.
   * For each service, an environment will be created.
   */
  services: string[];

  /**
   * The APIs to create as a name-value map. The name must be a valid
   * API name and the value can be the name of a file with an API
   * specification or the URL of a web-hosted API specification. The
   * API specification can be in JSON or YAML format.
   * 
   * For each API, an API product will be created with the same name.
   * Any API product will be associated with all environments.
   */
  apis: Record<string, string>;

  /**
   * The team application to create. The created team application
   * will have access to all API products.
   */
  application: {
    /** The name of the application. */
    name: string;
    /** The name of the team that owns the application. */
    owner: string;
    /** The consumer key and secret of the application. */
    credentials: Credentials;
  };
}

/** A username-password pair. */
type Credentials = {
  /** The username. */
  username: string;
  /** The password. */
  password: string;
}

/** An environment. */
type Environment = {

  /** The name of the environment. */
  name: string;
  /** The display name of the environment. */
  displayName: string;
  /** The description of the environment. */
  description: string;
  /** The ID of the corresponding Solace Cloud service. */
  serviceId: string;
  /** The list of protocols that are exposed. */
  exposedProtocols: any[];
}

/**
 * Creates a basic authentication header.
 * 
 * @param credentials 
 *                The credentials (username and password).
 * 
 * @returns The created basic authentication header.
 */
const createBasicAuthentication = (credentials: Credentials): string => {
  const upw = Buffer.from(`${credentials.username}:${credentials.password}`);
  return `Basic ${upw.toString('base64')}`;
}

/**
 * Creates the system organization.
 * 
 * @param options
 *                The options.
 */
const createOrganization = async (options: Options): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/organizations`;
  const organizationName = options.organization.name;

  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Authorization": createBasicAuthentication(options.server.admin),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: organizationName,
      "cloud-token": options.organization.token,
    }),
  }).then(response => {
    if (response.status == 201) {
      console.log(`created organization "${organizationName}"`);
    } else {
      throw new Error(`failed to create organization "${organizationName}"; status=${response.status}`);
    }
  });

} // const createOrganization: (options: Options) => Promise<void>

/**
 * Deletes the system organization.
 * 
 * @param options
 *                The options.
 */
const deleteOrganization = async (options: Options): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/organizations`;
  const organizationName = options.organization.name;

  return fetch(`${baseUrl}/${organizationName}`, {
    method: "DELETE",
    headers: {
      "Authorization": createBasicAuthentication(options.server.admin),
    },
  }).then(response => {
    if (response.status == 204 || response.status == 404) {
      console.log(`deleted organization "${organizationName}"`);
    } else {
      throw new Error(`failed to delete organization "${organizationName}"; status=${response.status}`);
    }
  });

} // const deleteOrganization: (options: Options) => Promise<void>

/**
 * Retrieves the requested list of services and maps them to environments.
 * 
 * @param options
 *                The options.
 * 
 * @returns The list of environments.
 */
const readEnvironments = async (options: Options): Promise<Environment[]> => {

  const baseUrl = `${options.server.baseUrl}/${options.organization.name}`;

  return fetch(`${baseUrl}/services`, {
    method: "GET",
    headers: {
      "Authorization": createBasicAuthentication(options.organization.admin),
    },
  }).then(response => response.json()).then(services => {

    let environments: Environment[] = [];

    if (Array.isArray(services)) {

      const isRequestedService = (service: string) => {
        return (options.services.indexOf(service) != -1);
      }

      services = services.filter(s => {
        return isRequestedService(s.serviceId) || isRequestedService(s.name);
      });

      environments = services.map(service => ({
        name: service.name.toLowerCase().replace(/ /g, "-"),
        displayName: service.name,
        description: `Environment for ${service.name}`,
        serviceId: service.serviceId,
        exposedProtocols: service.messagingProtocols.map(endpoint => endpoint.protocol),
      }));
    }

    return environments;
  });

} // const readEnvironments: async (options: Options) => Promise<Environment[]>

/**
 * Creates an environment.
 * 
 * @param options
 *                The options.
 * @param environment
 *                The environment.
 */
const createEnvironment = async (options: Options, environment: Environment): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/${options.organization.name}`;

  return fetch(`${baseUrl}/environments`, {
    method: "POST",
    headers: {
      "Authorization": createBasicAuthentication(options.organization.admin),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(environment),
  }).then(response => {
    if (response.status == 201) {
      console.log(`created environment "${environment.name}"`);
    } else {
      throw new Error(`failed to create environment "${environment.name}"; status=${response.status}`);
    }
  });

} // const createEnvironment: (options: Options) => Promise<void>

/**
 * Reads an API specification from a file.
 * 
 * @param fileName
 *                The name of the file.
 * 
 * @returns The API specification.
 */
const readApiSpecFromFile = (fileName: string): string => {

  let apiSpec = fs.readFileSync(fileName).toString();
  if (fileName.endsWith(".yml")) {
    apiSpec = JSON.stringify(yaml.load(apiSpec));
  }

  return apiSpec;
}

/**
 * Reads an API specification from a web resource.
 * 
 * @param url
 *                The URL.
 * 
 * @returns The API specification.
 */
const readApiSpecFromURL = async (url: string): Promise<string> => {

  return fetch(url).then(response => response.text()).then(data => {

    let apiSpec: string;
    try {
      apiSpec = JSON.stringify(yaml.load(data));
    } catch {
      apiSpec = data;
    }

    return apiSpec;
  });
}

/**
 * Creates an API.
 * 
 * @param options
 *                The options.
 * @param name
 *                The name of the API.
 * @param apiSpec
 *                The API specification.
 */
const createApi = async (options: Options, name: string, apiSpec: string): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/${options.organization.name}`;

  return fetch(`${baseUrl}/apis/${name}`, {
    method: "PUT",
    headers: {
      "Authorization": createBasicAuthentication(options.organization.admin),
      "Content-Type": "text/plain",
    },
    body: apiSpec,
  }).then(response => {
    if (response.status == 201) {
      console.log(`created API "${name}"`);
    } else {
      throw new Error(`failed to create API "${name}"; status=${response.status}`);
    }
  });

} // const createApi: (options: Options, apiName: string, apiSpec: string) => Promise<void> {

/**
 * Creates an API product.
 * 
 * @param options
 *                The options.
 * @param name
 *                The name of the API product.
 * @param apis
 *                The referenced APIs.
 * @param environments
 *                The referenced environments.
 */
const createApiProduct = async (options: Options, name: string, apis: string[], environments: Environment[]): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/${options.organization.name}`;

  const protocols: Array<any> = [];
  environments.forEach(environment => {
    protocols.push(...environment.exposedProtocols);
  });

  return fetch(`${baseUrl}/apiProducts`, {
    method: "POST",
    headers: {
      "Authorization": createBasicAuthentication(options.organization.admin),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      displayName: name,
      attributes: [],
      apis: apis,
      environments: environments.map(environment => environment.name),
      protocols: _.uniqWith(protocols, _.isEqual),
      subResources: [],
      pubResources: [],
    }),
  }).then(response => {
    if (response.status == 201) {
      console.log(`created API product "${name}"`);
    } else {
      throw new Error(`failed to create API product "${name}"; status=${response.status}`);
    }
  });

} // const createApiProduct: (options: Options, apiName: string, environments: Environment[]) => Promise<void> {

/**
 * Creates the application.
 * 
 * @param options
 *                The options.
 * @param apiProducts 
 *                The API products.
 */
const createApplication = async (options: Options, apiProducts: string[]): Promise<void> => {

  const baseUrl = `${options.server.baseUrl}/${options.organization.name}/teams/${options.application.owner}`;
  const applicationName: string = options.application.name;

  return fetch(`${baseUrl}/apps`, {
    method: "POST",
    headers: {
      "Authorization": createBasicAuthentication(options.organization.admin),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: applicationName,
      apiProducts: apiProducts,
      credentials: {
        secret: {
          consumerKey: options.application.credentials.username,
          consumerSecret: options.application.credentials.password,
        },
      },
    }),
  }).then(response => {
    if (response.status == 201) {
      console.log(`created application "${applicationName}"`);
    } else {
      throw new Error(`failed to create application "${applicationName}"; status=${response.status}`);
    }
  });

} // const createApplication: (options: Options, apiProducts: string[]) => Promise<void>

/**
 * Resolves external references for configuration values.
 * 
 * @param key 
 *                The key.
 * @param value 
 *                The value.
 * 
 * @returns The resolved value.
 */
const configReviver = (key: string, value: any): any => {

  if (typeof value === "string") {

    const match = value.match(/^\$\{([^:]+):([^}]+)\}$/);
    if (match) {
      const type: string = match[1].toLowerCase();
      const name: string = match[2].trim();
      if (type === "env" && process.env.hasOwnProperty(name)) {
        value = process.env[name];
      }
    }
  }

  return value;

} // const configReviver: (key: string, value: any) => any

/**
 * Reads configuration from a file.
 * 
 * @param fileName
 *                The name of the configuration file.
 * 
 * @returns The configuration.
 */
const readConfiguration = (fileName: string): Options => {
  const data: Buffer = fs.readFileSync(fileName);
  return JSON.parse(data.toString(), configReviver);
}

/**
 * Configures an API Management Connector based on a file.
 * 
 * This function uses the API Management Connector OpenAPI to create:
 * - An organization
 * - One or more environments
 * - One or more APIs
 * - For each API, an API product associated with all environments
 * - A team application with access to all API products
 * 
 * @param fileName
 *                The name of the configuration file.
 */
export async function setup(fileName: string): Promise<void> {

  const options = readConfiguration(fileName);

  await createOrganization(options);

  const environments = await readEnvironments(options);
  for (const environment of environments) {
    await createEnvironment(options, environment);
  }

  const apiProducts: string[] = [];
  for (const name in options.apis) {

    let apiSpec: string;

    const uri: string = options.apis[name];
    if (uri.startsWith('http://') || uri.startsWith('https://')) {
      apiSpec = await readApiSpecFromURL(options.apis[name]);
    } else {
      apiSpec = readApiSpecFromFile(options.apis[name]);
    }

    await createApi(options, name, apiSpec);
    await createApiProduct(options, name, [name], environments);

    apiProducts.push(name);
  }

  await createApplication(options, apiProducts);

} // function setup(fileName: string): Promise<void>

/**
 * Deletes an organization from an API Management Connector.
 * 
 * @param fileName
 *                The name of the configuration file.
 */
export async function teardown(fileName: string) {
  const options = readConfiguration(fileName);
  await deleteOrganization(options);
}
