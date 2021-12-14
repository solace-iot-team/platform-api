import L from '../server/common/logger';
import Endpoint = Components.Schemas.Endpoint;
import Protocol = Components.Schemas.Protocol;

interface ProtocolMapping {
  name: string,
  version?: string,
  protocolKeys: SolaceProtocolIdentifiers,
  clientProtocol: SolaceClientProtocol
}

interface SolaceProtocolIdentifiers {
  name: string,
  protocol: string
}

interface SolaceClientProtocol {
  name: string,
  tls: boolean
}
export class ProtocolMapper {
  public static getProtocolMappings(): ProtocolMapping[] {
    var map: ProtocolMapping[] = [];
    var mqtt: ProtocolMapping = {
      name: 'mqtt',
      version: '3.1.1',
      protocolKeys: {
        name: 'MQTT',
        protocol: "TCP"
      },
      clientProtocol: {
        name: 'mqtt',
        tls: false
      }
    };
    map.push(mqtt);

    var mqtts: ProtocolMapping = {
      name: 'secure-mqtt',
      version: '3.1.1',
      protocolKeys: {
        name: 'Secured MQTT',
        protocol: "SSL"
      },
      clientProtocol: {
        name: 'mqtt',
        tls: true
      }

    };
    map.push(mqtts);

    var wsMqtt: ProtocolMapping = {
      name: 'ws-mqtt',
      version: '3.1.1',
      protocolKeys: {
        name: 'WebSocket MQTT',
        protocol: "WS"
      },
      clientProtocol: {
        name: 'ws-mqtt',
        tls: false
      }

    };
    map.push(wsMqtt);

    var wssMqtt: ProtocolMapping = {
      name: 'wss-mqtt',
      version: '3.1.1',
      protocolKeys: {
        name: 'WebSocket Secured MQTT',
        protocol: "WSS"
      },
      clientProtocol: {
        name: 'wss-mqtt',
        tls: true
      }
    };
    map.push(wssMqtt);


    var amqp: ProtocolMapping = {
      name: 'amqp',
      version: '1.0.0',
      protocolKeys: {
        name: 'AMQP',
        protocol: "AMQP"
      },
      clientProtocol: {
        name: 'amqp',
        tls: false
      }
    };
    map.push(amqp);

    var amqps: ProtocolMapping = {
      name: 'amqps',
      version: '1.0.0',
      protocolKeys: {
        name: 'Secured AMQP',
        protocol: "AMQPS"
      },
      clientProtocol: {
        name: 'amqp',
        tls: true
      }
    };
    map.push(amqps);

    var http: ProtocolMapping = {
      name: 'http',
      version: '1.1',
      protocolKeys: {
        name: 'REST',
        protocol: "HTTP"
      },
      clientProtocol: {
        name: 'rest',
        tls: false
      }
    };
    map.push(http);

    var https: ProtocolMapping = {
      name: 'https',
      version: '1.1',
      protocolKeys: {
        name: 'Secured REST',
        protocol: "HTTPS"
      },
      clientProtocol: {
        name: 'rest',
        tls: true
      }
    };
    map.push(https);

    var smf: ProtocolMapping = {
      name: 'smf',
      version: 'smf',
      protocolKeys: {
        name: 'SMF',
        protocol: "TCP"
      },
      clientProtocol: {
        name: 'smf',
        tls: false
      }
    };
    map.push(smf);

    var smfs: ProtocolMapping = {
      name: 'smfs',
      version: 'smfs',
      protocolKeys: {
        name: 'Secured SMF',
        protocol: "TLS"
      },
      clientProtocol: {
        name: 'smf',
        tls: true
      }
    };
    map.push(smfs);

    var compressedsmf: ProtocolMapping = {
      name: 'compressed-smf',
      version: 'smf',
      protocolKeys: {
        name: 'Compressed SMF',
        protocol: 'TCP'
      },
      clientProtocol: {
        name: 'compressed-smf',
        tls: false
      }
    };
    map.push(compressedsmf);

    var jms: ProtocolMapping = {
      name: 'jms',
      version: '1.1',
      protocolKeys: {
        name: 'JMS',
        protocol: "TCP"
      },
      clientProtocol: {
        name: 'jms',
        tls: false
      }
    };
    map.push(jms);

    var secureJms: ProtocolMapping = {
      name: 'secure-jms',
      version: '1.1',
      protocolKeys: {
        name: 'Secured JMS',
        protocol: "TLS"
      },
      clientProtocol: {
        name: 'jms',
        tls: true
      }
    };
    map.push(secureJms);

    return map;
  }

  public static findByAsyncAPIProtocol(protocol: Protocol): ProtocolMapping {
    return ProtocolMapper.getProtocolMappings().find(element => element.name == protocol.name);
  }

  public static async mapSolaceMessagingProtocolsToAsyncAPI(serverProtocols): Promise<Endpoint[]> {
    var endpoints: Endpoint[] = [];
    var mappings = ProtocolMapper.getProtocolMappings();
    for (var protocol of serverProtocols) {
      L.debug(`mapMessagingProtocols ${protocol.name}`);
      for (var serverEndpoint of protocol.endPoints) {
        var mapping = mappings.find(element => element.protocolKeys.name == serverEndpoint.name && element.protocolKeys.protocol == serverEndpoint.transport);
        if (mapping != null) {
          var keys = mapping.protocolKeys;
          L.debug(`mapMessagingProtocols ${keys.name} ${keys.protocol}`);
          var endpoint = protocol.endPoints.find(ep => ep.name == serverEndpoint.name && ep.transport == serverEndpoint.transport);
          var newEndpoint: Endpoint = endpoints.find(ep => ep.uri == endpoint.uris[0]);
          L.debug(endpoint);
          if (newEndpoint === undefined) {
            newEndpoint = {
              compressed: endpoint.compressed == 'yes' ? 'yes' : 'no',
              secure: endpoint.secured == 'yes' ? 'yes' : 'no',
              protocol: {
                name: mapping.name as Protocol["name"],
                version: mapping.version
              },
              transport: endpoint.transport,
              uri: endpoint.uris[0]
            };

            endpoints.push(newEndpoint);
          }

        } else {
          L.warn(`No mapping for ${protocol.name}`);
        }
      }
    }
    return endpoints;
  }

  public static mapSolaceClientNameToProtocol(clientName: string, tls: boolean): Protocol {
    let clientProtocol: string = clientName.substring(0,
      clientName.indexOf('/')).replace('#', '');
      if (clientName.startsWith('#rest')){
        clientProtocol = 'rest';
      }
    var mappings = ProtocolMapper.getProtocolMappings();
    var mapping = mappings.find(element => element.clientProtocol.name == clientProtocol && element.clientProtocol.tls == tls);
    let protocol: Protocol;
    if (mapping) {
      protocol = {
        name: mapping.name as Protocol["name"],
        version: mapping.version
      }
    } else {
      mapping = mappings.find(element => element.clientProtocol.name == 'smf' && element.clientProtocol.tls == tls);
      protocol = {
        name: mapping.name as Protocol["name"],
        version: mapping.version
      }      
    }
    return protocol;
  }

}