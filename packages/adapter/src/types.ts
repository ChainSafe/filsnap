import {SnapRpcMethodRequest} from "@nodefactory/metamask-filecoin-types";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      send: (request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<unknown>;
      on: (eventName: unknown, callback: unknown) => unknown;
      // requestIndex: () => Promise<{getPluginApi: (origin: string) => Promise<PolkadotApi>}>;
    };
  }
}
