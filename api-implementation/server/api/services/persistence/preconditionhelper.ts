import L from '../../../common/logger';
import { ContextConstants } from '../../../common/constants';
import calculateEtag from '../../../common/etag';
import { ns } from '../../middlewares/context.handler';
import { ErrorResponseInternal } from '../../middlewares/error.handler';

export default async function updateProtectionByService(service: any, name: string) {
  if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.IF_MATCH_ETAG)) {
    const current: any = await service.byName(name);
    await updateProtectionByObject(current);
  }
}

export async function updateProtectionByObject(current: any) {
  if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.IF_MATCH_ETAG)) {
    const hsh: number = calculateEtag(current, null);
    const etag: number = parseInt(ns.getStore().get(ContextConstants.IF_MATCH_ETAG));
    if (etag != hsh) {
      L.info(`if-match tag presented: ${etag}, etag calculated: ${hsh}`);
      throw new ErrorResponseInternal(412, `Precondition failed, concurrent update requested`)
    }
  }

}