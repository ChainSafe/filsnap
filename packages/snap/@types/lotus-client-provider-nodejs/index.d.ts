declare module "@filecoin-shipyard/lotus-client-provider-nodejs" {
    class BrowserProvider {
        constructor(url: string, options: any);
        connect(): void;
        send(request: any, schemaMethod: any): any;
        sendHttp(jsonRpcRequest: any): Promise<any>;
        receive(event: any): void;
    }

    export class NodejsProvider extends BrowserProvider {
        constructor(url: string, options: any);
    }

    // export default NodejsProvider;
}