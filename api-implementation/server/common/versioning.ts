import semver, { minor } from 'semver';
import Meta = Components.Schemas.Meta;
import MetaEntityStage = Components.Schemas.MetaEntityStage;
import { ns } from '../api/middlewares/context.handler';
import L from './logger'
import { ContextConstants } from './constants';
import { PersistenceService } from '../api/services/persistence.service';

export class Versioning {
  public static INTERNAL_REVISION = 'internalRevision';
  public static INITIAL_VERSION = 'default';
  public static INITIAL_REVISION: number = 1;
  public static nextRevision(current: number): number {
    return current + 1;
  }

  public static isRecognizedVersion(version: string): boolean {
    const isSemVer: boolean = semver.parse(version) != null;
    const isInteger: boolean = !isNaN(version as any);
    return isSemVer || isInteger;
  }

  public static createSemver(version: string, revisionNumber?: number): string {
    const isSemVer: boolean = semver.parse(version) != null;
    const isInteger: boolean = !isNaN(version as any);
    if (isSemVer) {
      return version;
    } else if (isInteger) {
      return Versioning.numericToSemVer(version);
    } else {
      if (revisionNumber){
        return `${Versioning.numericToSemVer(revisionNumber.toString())}-${version}`;
      } else {
        return `1.0.0-${version}`;
      }
    }
  }

  public static incrementVersion(version: string): string {
    const isSemVer: boolean = semver.parse(version) != null;
    const isInteger: boolean = !isNaN(version as any);
    if (isSemVer) {
      let semVer = semver.parse(version);
      return semver.inc(semVer, 'minor');
    } else if (isInteger) {
      return Versioning.nextRevision(parseInt(version)).toString();
    } else {
      return version;
    }
  }


  public static validateNewVersionString(newVersion: string, previousVersion: string): boolean {
    // version is mandatory, do not accept null values
    if (!previousVersion || !newVersion) {
      return false;
    }
    const isSemVer: boolean = (semver.parse(newVersion) != null && semver.parse(previousVersion) != null);
    const isInteger: boolean = !isNaN(newVersion as any) && !isNaN(previousVersion as any);
    if (isSemVer) {
      return semver.gt(newVersion, previousVersion);
    } else if (isInteger) {
      return parseInt(newVersion) > parseInt(previousVersion);
    } else {
      return (newVersion != previousVersion);
    }
  }
  public static validateNewVersion(newVersion: Meta, previousVersion: Meta): boolean {
    if (!previousVersion && !newVersion) {
      return true;
    }
    // if the caller has not provided a new version and it was set manually before we reject the request
    if (!newVersion && previousVersion && previousVersion.version != Versioning.INITIAL_VERSION) {
      return false;
    }
    // if the caller has not supplied a new version and it was not set manually before we accept the request
    if (!newVersion && previousVersion && previousVersion.version == Versioning.INITIAL_VERSION) {
      return true;
    }
    let semVerPrev = (previousVersion && previousVersion.version == Versioning.INITIAL_VERSION) ?
      `1.${previousVersion[Versioning.INTERNAL_REVISION]}.0` :
      (previousVersion && previousVersion.version) ? previousVersion.version : Versioning.INITIAL_VERSION;
    return Versioning.validateNewVersionString(newVersion.version, semVerPrev);
  }
  public static createMeta(version?: string, stage?: MetaEntityStage): Meta {
    const ts: number = Date.now();
    const user: string = ns.getStore().get(ContextConstants.AUTHENTICATED_USER);
    const m: Meta = {
      version: version ? version : Versioning.INITIAL_VERSION,
      created: ts,
      lastModified: ts,
      createdBy: user,
      lastModifiedBy: user,
    };
    m[Versioning.INTERNAL_REVISION] = Versioning.INITIAL_REVISION;
    if (stage) {
      m.stage = stage;
    }
    return m;
  }

  public static createMetaFromRequest(newMeta: Meta): Meta {
    if (!newMeta) {
      return Versioning.createMeta();
    }

    // chekc if we have an internal revision number and preserve it
    const internalRevision = newMeta[Versioning.INTERNAL_REVISION];
    // the request can contain - stage, version, createdBy,  modifiedBy
    const m: Meta = Versioning.createMeta(newMeta.version, newMeta.stage);
    if (internalRevision){
      m[Versioning.INTERNAL_REVISION] = Versioning.nextRevision(internalRevision);
    }
    if (newMeta.lastModifiedBy) {
      m.lastModifiedBy = newMeta.lastModifiedBy;
    } else if (newMeta.createdBy) {
      m.lastModifiedBy = newMeta.createdBy;
    }
    if (newMeta.createdBy) {
      m.createdBy = newMeta.createdBy;
    }
    L.debug(m);
    return m;
  }

  public static update(previousMeta: Meta, newMeta?: Meta): Meta {
    const ts: number = Date.now();
    const user: string = ns.getStore().get(ContextConstants.AUTHENTICATED_USER);

    const m: Meta = {
      version: (newMeta && newMeta.version) ? newMeta.version : Versioning.INITIAL_VERSION,
      created: previousMeta ? previousMeta.created : ts,
      lastModified: ts,
      createdBy: previousMeta ? previousMeta.createdBy : user,
      lastModifiedBy: (newMeta && newMeta.lastModifiedBy) ? newMeta.lastModifiedBy : user,
      stage: (newMeta && newMeta.stage) ? newMeta.stage : ((previousMeta && previousMeta.stage)?previousMeta.stage:'released'),
    };

    const derivedFrom = (newMeta && newMeta.derivedFrom) ? newMeta.derivedFrom : ((previousMeta && previousMeta.derivedFrom) ? previousMeta.derivedFrom : null);
    if (derivedFrom) {
      m.derivedFrom = derivedFrom;
    }
    m[Versioning.INTERNAL_REVISION] = Versioning.nextRevision(previousMeta ? previousMeta[Versioning.INTERNAL_REVISION] : Versioning.INITIAL_REVISION as number);
    return m;
  }

  public static async toExternalRepresentation(meta: Meta, persistenceService?: PersistenceService): Promise<Meta> {
    if (meta && meta.version && meta.version == Versioning.INITIAL_VERSION) {
      meta.version = Versioning.toExternalVersion(meta);
    } else if (meta && meta.version && !isNaN(meta.version as any)) {
      meta.version = `1.${meta.version}.0`;
    } else if (meta && meta.version && !Versioning.isRecognizedVersion(meta.version as any)) {
      const v = meta.version;
      meta.version = `${Versioning.toExternalVersion(meta)}-${v}`;
    }
    if (meta && !meta.stage) {
      meta.stage = 'released';
    }

    if (persistenceService && meta && meta.derivedFrom && meta.derivedFrom.name && meta.derivedFrom.revision) {
      try {
        const id = Versioning.createRevisionId(meta.derivedFrom.name, meta.derivedFrom.revision);
        const entity = await persistenceService.byName(id);
        if (entity.displayName) {
          meta.derivedFrom.displayName = entity.displayName;
        }
      } catch (e) {
        L.warn(`Could not resolve display name of ${meta.derivedFrom.name} at revision ${meta.derivedFrom.revision}`);
        meta.derivedFrom.displayName = meta.derivedFrom.name;
      }
    }

    if (meta) {
      delete meta[Versioning.INTERNAL_REVISION];
    }
    return meta;
  }

  public static toExternalVersion(meta: Meta): string {
    return meta.version = `1.${meta[Versioning.INTERNAL_REVISION]}.0`;
  }

  public static numericToSemVer(num: string): string {
    return `1.${num}.0`;
  }
  public static createRevisionId(name: string, version: string): string {
    const id = `${name}-${version}`;
    return id;
  }

  // stage management/rules
  public static validateNewStage(newVersion: Meta, previousVersion: Meta): boolean {
    if (!newVersion || !previousVersion || !newVersion.stage || !previousVersion.stage) {
      L.debug('stage information missing from previous or new meta information');
      return true;
    }
    if (newVersion.stage == previousVersion.stage) {
      L.debug('no stage transition required');
      return true;
    }

    // check current status released, new status con only be deprecacted
    if (previousVersion.stage == 'released' && newVersion.stage != 'deprecated') {
      return false;
    }
    // check current status deprecated, new status con only be released or retired
    if (previousVersion.stage == 'deprecated' && (newVersion.stage == 'draft')) {
      return false;
    }
    // check current status retired, new status can only be retired
    if (previousVersion.stage == 'retired' && (newVersion.stage != 'retired')) {
      return false;
    }

    if (previousVersion.stage == 'draft' && newVersion.stage != 'released') {
      return false;
    }

    return true;
  }

}