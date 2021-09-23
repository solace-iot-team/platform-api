import ApiListFormat = Components.Parameters.ApiListFormat.Format;
import APIInfo = Components.Schemas.APIInfo;

export interface ApisReadStrategy {
  all(format?: ApiListFormat): Promise<any[]>;
  byName(name: string): Promise<string>;
  infoByName(name: string): Promise<APIInfo>; 
  canCreate(name: string): Promise<boolean>;
  canImport(name: string): Promise<boolean>;
}