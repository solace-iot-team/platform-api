import Protocol = Components.Schemas.Protocol;

import { BindingsGenerator } from './bindingsgenerator';
import SMFBindingsGenerator from './smfbindingsgenerator';
import JMSBindingsGenerator from './jmsbindingsgenerator';
import MQTTBindingsGenerator from './mqttbindingsgenerator';

interface RegisteredGenerators{
  [details: string] : BindingsGenerator;
}
export class BindingsRegistry {
  registeredGenerators: RegisteredGenerators = {

  }
  constructor(){
    const generators: BindingsGenerator[] = [SMFBindingsGenerator, JMSBindingsGenerator, MQTTBindingsGenerator];
    for (const generator of generators){
      for (const protocol of generator.getApplicableProtocols()){
        this.registeredGenerators[protocol] = generator;
      }
    }
  }

  public getGeneratorByProtocol(protocol: Protocol): BindingsGenerator {
    return this.registeredGenerators[protocol.name];
  }

}

export default new BindingsRegistry();