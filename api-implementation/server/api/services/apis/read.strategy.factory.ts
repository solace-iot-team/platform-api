import ApisReadLocalStrategy from './read.local.strategy';
import ApisReadProxyStrategy from './read.proxy.strategy';
import { ApisReadStrategy } from './read.strategy';

export class ApisReadStrategyFactory {
    getReadStrategy(): ApisReadStrategy {
      const useProxyModeStr: string = process.env.APIS_PROXY_MODE || 'false';
      const useProxyMode : boolean = (useProxyModeStr.toLowerCase() == 'true') || (useProxyModeStr.toLowerCase() == '1');
      if (!useProxyMode){
        return ApisReadLocalStrategy;
      } else {
        return ApisReadProxyStrategy;
      }
    }
}

export default new ApisReadStrategyFactory();