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
  public static validateNewVersion(newVersion: Meta, previousVersion: Meta): boolean {
    if (!newVersion) {
      return true;
    }
    let semVerPrev = previousVersion.version == Versioning.INITIAL_VERSION ? `1.${previousVersion[Versioning.INTERNAL_REVISION]}.0` : previousVersion.version;

    return semver.gt(newVersion.version, semVerPrev);
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
      created: previousMeta.created,
      lastModified: ts,
      createdBy: previousMeta.createdBy,
      lastModifiedBy: user,

    };
    m[Versioning.INTERNAL_REVISION] = Versioning.nextRevision(previousMeta[Versioning.INTERNAL_REVISION] as number);
    return m;
  }

  public static toExternalRepresentation(meta: Meta): Meta{
      if (meta.version == Versioning.INITIAL_VERSION) {
        meta.version = `1.${meta[Versioning.INTERNAL_REVISION]}.0`
      }
      delete meta[Versioning.INTERNAL_REVISION];
      return meta;
  }

  public static createRevisionId(name: string, version: string): string {
    const id = `${name}-${version}`;
    return id;
  }

}