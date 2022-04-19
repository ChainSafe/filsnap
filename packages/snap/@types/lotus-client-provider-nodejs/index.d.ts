import {JsonRpcRequest, ProviderOptions} from "@filecoin-shipyard/lotus-client-provider-nodejs";

declare module "@filecoin-shipyard/lotus-client-provider-nodejs" {

    type TokenCallback = () => string;

    type CancelSubscriptionCallback = () => void;

    interface ProviderOptions {
      wsUrl?: string;
      httpUrl?: string;
      importUrl?: string;
      transport?: "http" | "ws";
      token?: string | TokenCallback;
      WebSocket?: WebSocket;
      sendHttpContentType?: string;
      fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    }

    interface JsonRpcRequest {
      jsonrpc: "2.0";
      id: number;
      request: unknown
    }

    export class BrowserProvider {
      constructor(url: string, options: ProviderOptions);
      connect(): void;
      send(request: unknown, schemaMethod: unknown): unknown;
      sendHttp(jsonRpcRequest: JsonRpcRequest): Promise<unknown>;
      sendWs(jsonRpcRequest: JsonRpcRequest): Promise<unknown>;
      sendSubscription(
        request: unknown, schemaMethod: unknown, subscriptionCb: (data: unknown) => void
      ): [CancelSubscriptionCallback, Promise<any>]
      receive(event: unknown): void;
      importFile(body: unknown): Promise<string>;
      destroy(): void;

    }

    export class NodejsProvider extends BrowserProvider {
      constructor(url: string, options?: ProviderOptions);
    }

}