import L from '../server/common/logger';
import Endpoint = Components.Schemas.Endpoint;
import Protocol = Components.Schemas.Protocol;

interface ProtocolMapping {
	name: string,
	version?: string,
	protocolKeys: SolaceProtocolIdentifiers
}

interface SolaceProtocolIdentifiers {
	name: string
	protocol: string
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
			}
		};
		map.push(mqtt);

		var mqtts: ProtocolMapping = {
			name: 'secure-mqtt',
			version: '3.1.1',
			protocolKeys: {
				name: 'MQTT',
				protocol: "SSL"
			}
		};
		map.push(mqtts);

		var wsMqtt: ProtocolMapping = {
			name: 'ws-mqtt',
			version: '3.1.1',
			protocolKeys: {
				name: 'MQTT',
				protocol: "WS"
			}
		};
		map.push(wsMqtt);

		var wssMqtt: ProtocolMapping = {
			name: 'wss-mqtt',
			version: '3.1.1',
			protocolKeys: {
				name: 'MQTT',
				protocol: "WSS"
			}
		};
		map.push(wssMqtt);


		var amqp: ProtocolMapping = {
			name: 'amqp',
			version: '1.0.0',
			protocolKeys: {
				name: 'AMQP',
				protocol: "AMQP"
			}
		};
		map.push(amqp);

		var amqps: ProtocolMapping = {
			name: 'amqps',
			version: '1.0.0',
			protocolKeys: {
				name: 'AMQP',
				protocol: "AMQPS"
			}
		};
		map.push(amqps);

		var http: ProtocolMapping = {
			name: 'http',
			version: '1.1',
			protocolKeys: {
				name: 'REST',
				protocol: "HTTP"
			}
		};
		map.push(http);

		var https: ProtocolMapping = {
			name: 'https',
			version: '1.1',
			protocolKeys: {
				name: 'REST',
				protocol: "HTTPS"
			}
		};
		map.push(https);

		var smf: ProtocolMapping = {
			name: 'smf',
			version: 'smf',
			protocolKeys: {
				name: 'SMF',
				protocol: "TCP"
			}
		};
		map.push(smf);

		var smfs: ProtocolMapping = {
			name: 'smfs',
			version: 'smfs',
			protocolKeys: {
				name: 'SMF',
				protocol: "TLS"
			}
		};
		map.push(smfs);

		var jms: ProtocolMapping = {
			name: 'jms',
			version: '1.1',
			protocolKeys: {
				name: 'JMS',
				protocol: "TCP"
			}
		};
		map.push(jms);
		return map;
	}

	public static findByAsyncAPIProtocol(protocol : Protocol) : ProtocolMapping{
		return ProtocolMapper.getProtocolMappings().find(element => element.name == protocol.name);
	}
	
	public static async mapSolaceMessagingProtocolsToAsyncAPI (serverProtocols): Promise<Endpoint[]> {
		var endpoints: Endpoint[] = [];
		var mappings = ProtocolMapper.getProtocolMappings();
		for (var protocol of serverProtocols) {
			L.debug(`mapMessagingProtocols ${protocol.name}`);
			for (var serverEndpoint of protocol.endPoints) {
				var mapping = mappings.find(element => element.protocolKeys.name == protocol.name && element.protocolKeys.protocol == serverEndpoint.transport);
				if (mapping != null) {
					var keys = mapping.protocolKeys;
					L.debug(`mapMessagingProtocols ${keys.name} ${keys.protocol}`);
					var endpoint = protocol.endPoints.find(ep => ep.transport == serverEndpoint.transport);
					var newEndpoint: Endpoint = endpoints.find(ep => ep.uri == endpoint.uris[0]);
					L.debug(newEndpoint);
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

    
}