import APIInfo = Components.Schemas.APIInfo;

export interface ApisReadStrategy {
  all(): Promise<string[]>;
  byName(name: string): Promise<string>;
  infoByName(name: string): Promise<APIInfo>; 
  canCreate(name: string): Promise<boolean>;
  canImport(name: string): Promise<boolean>;
}