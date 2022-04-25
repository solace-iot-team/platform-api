import semver from 'semver';
import Meta = Components.Schemas.Meta;
import { ns } from '../api/middlewares/context.handler';
import { ContextConstants } from './constants';

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
      (previousVersion && previousVersion.version)?previousVersion.version:Versioning.INITIAL_VERSION;
    return Versioning.validateNewVersionString(newVersion.version, semVerPrev);
  }
  public static createMeta(version?: string): Meta {
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
      lastModifiedBy: user,

    };
    m[Versioning.INTERNAL_REVISION] = Versioning.nextRevision(previousMeta ? previousMeta[Versioning.INTERNAL_REVISION] : Versioning.INITIAL_REVISION as number);
    return m;
  }

  public static toExternalRepresentation(meta: Meta): Meta {
    if (meta && meta.version && meta.version == Versioning.INITIAL_VERSION) {
      meta.version = `1.${meta[Versioning.INTERNAL_REVISION]}.0`
    }
    if (meta) {
      delete meta[Versioning.INTERNAL_REVISION];
    }
    return meta;
  }

  public static createRevisionId(name: string, version: string): string {
    const id = `${name}-${version}`;
    return id;
  }

}