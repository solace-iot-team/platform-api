import L from '../../../common/logger';
import { Importer } from "./importer";
import ImporterInfo = Components.Schemas.ImporterInfo;
import EventPortalImporter from './eventportalimporter';

export class ImporterRegistry {
  private importers: Map<string, Importer>;

  constructor() {
    this.importers = new Map<string, Importer>();
    this.register(EventPortalImporter.info().name, EventPortalImporter);
  }

  public register(name: string, importer: Importer) {
    L.info(`registering importer ${name}`);
    this.importers.set(name, importer);
  }
  public getByType(name: string): Importer {
    return this.importers.get(name);
  }

  public all(): Map<string, Importer>{
  return this.importers;
  }

  public getTypes(): string[] {
    const keys: string[] = [];
    this.importers.forEach((v, k) => keys.push(k));
    return keys;
  }

  public hasType(name: string): boolean {
    let hasType: boolean = false;
    this.importers.forEach((v, k) => {
      if (k==name){
        hasType = true;
      }
    });
    return hasType;
  }

  public getTypesInfo(): ImporterInfo[] {
    const infos: ImporterInfo[] = [];
    this.importers.forEach((v) => infos.push(v.info()));
    return infos;
  }
}

export default new ImporterRegistry();