import { TypedEmitter } from 'tiny-typed-emitter';

interface DatabaseBootstrapperEvents {
  'added': (organization: string) => void;
  'deleted': (deletedCount: number) => void;
}
class DatabaseBootstrapper extends TypedEmitter<DatabaseBootstrapperEvents> {
  constructor() {
    super();
    this.setMaxListeners(100);
  }
}
export default new DatabaseBootstrapper();