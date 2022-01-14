import {SnapRpcMethodRequest} from "@chainsafe/filsnap-types";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      isUnlocked: Promise<boolean>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: <T>(request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<T>;
      on: (eventName: unknown, callback: unknown) => unknown;
    };
  }
}
