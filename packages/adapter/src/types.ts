import {SnapRpcMethodRequest} from "@nodefactory/metamask-filecoin-types";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      send: <T>(request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<T>;
      on: (eventName: unknown, callback: unknown) => unknown;
      // requestIndex: () => Promise<{getPluginApi: (origin: string) => Promise<PolkadotApi>}>;
    };
  }
}

// Filecoin message
export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasprice: string
  gaslimit: number;
  method: number;
  params?: any;
}
