export interface AsyncAPIServer {
	url: string,
	protocol: string,
	protocolVersion: string
	description?: string,
  security?: any,
  bindings?: Record<string, any>[]
}