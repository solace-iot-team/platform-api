import { TypedEmitter } from 'tiny-typed-emitter';

interface AppUpdateEventEmitter {
  'apiUpdate': (organization: string, name: string) => void;
  'apiProductUpdate': (organization: string, name: string ) => void;
}
class AppUpdates extends TypedEmitter<AppUpdateEventEmitter> {
  constructor() {
    super();
    this.setMaxListeners(100);
  }
}
export default new AppUpdates();