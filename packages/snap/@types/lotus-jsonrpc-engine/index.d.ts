declare module "@openworklabs/lotus-jsonrpc-engine" {

  class LotusRpcEngine {
    constructor(config: {token?: string; apiAddress: string});
    request(method: string, ...params: string[]): Promise<unknown>;
  }

  export = LotusRpcEngine;
}
