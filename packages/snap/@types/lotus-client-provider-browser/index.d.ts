export default class BrowserProvider{
  constructor(url: any, options?: any);
  connect(): any;
  send(request: any, schemaMethod: any): any;
  sendHttp(jsonRpcRequest: any): any;
  sendWs(jsonRpcRequest: any): any;
  sendSubscription(request: any, schemaMethod: any, sendSubscription: any): any;
  receive(event: any): any;
  import(body: any): any;
  destroy(): void;
}
