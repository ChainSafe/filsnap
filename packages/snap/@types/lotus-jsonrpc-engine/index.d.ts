declare module "@openworklabs/lotus-jsonrpc-engine" {
  interface Methods {
    WalletBalance: {
      parameters: string;
      response: string;
    };
  }

  type MethodName = keyof Methods;

  class LotusRpcEngine {
    constructor(config: {token?: string; apiAddress: string});
    request<T extends MethodName>(method: T, params: Methods[T]["parameters"]): Methods[T]["response"];
  }

  export default LotusRpcEngine;
}
