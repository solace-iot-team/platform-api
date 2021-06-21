import APIInfo = Components.Schemas.APIInfo;

export interface ApisReadStrategy {
  all(): Promise<string[]>;
  byName(name: string): Promise<string>;
  infoByName(name: string): Promise<APIInfo>;  
}