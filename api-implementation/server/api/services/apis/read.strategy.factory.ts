import ApisReadLocalStrategy from './read.local.strategy';
import ApisReadProxyStrategy from './read.proxy.strategy';
import { ApisReadStrategy } from './read.strategy';

export class ApisReadStrategyFactory {
    getReadStrategy(): ApisReadStrategy {
      const useProxyMode = process.env.APIS_PROXY_MODE || false;
      if (!useProxyMode){
        return ApisReadLocalStrategy;
      } else {
        return ApisReadProxyStrategy;
      }
    }
}

export default new ApisReadStrategyFactory();