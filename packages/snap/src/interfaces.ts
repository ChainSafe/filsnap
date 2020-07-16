import {MetamaskFilecoinRpcRequest, SnapConfig, Transaction} from "@nodefactory/metamask-filecoin-types";
import {defaultConfiguration} from "./configuration/predefined";

export type FMethodCallback = (
  originString: string,
  requestObject: MetamaskFilecoinRpcRequest
) => Promise<unknown>;

export type MetamaskState = {
  filecoin: {
    config: SnapConfig;
    transactions: Transaction[];
  };
};

export const EmptyMetamaskState: () => MetamaskState = () => ({
  filecoin: {config: defaultConfiguration, transactions: []}
});

export interface Wallet {
  registerApiRequestHandler: (origin: unknown) => unknown;
  registerRpcMessageHandler: (fn: FMethodCallback) => unknown;
  send(options: {method: string; params: unknown[]}): unknown;
  getAppKey(): Promise<string>;
  updatePluginState(state: MetamaskState): void;
  getPluginState(): MetamaskState;
}

export interface Asset {
  balance: string|number;
  customViewUrl?: string;
  decimals?: number;
  identifier: string;
  image?: string;
  symbol: string;
}