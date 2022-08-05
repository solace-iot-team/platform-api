import Broker from "./broker.interface";
import { SolaceBrokerService } from "./broker.service";

export default class BrokerFactory {
    public static getBroker(): Broker{
        return new SolaceBrokerService();
    }
}