export type MetamaskFilecoinRpcRequest = any;

type Method = MetamaskFilecoinRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetPluginsRequest {
  method: "wallet_getPlugins";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskFilecoinRpcRequest];
}

export type MetamaskRpcRequest = WalletEnableRequest | GetPluginsRequest | SnapRpcMethodRequest;

export type BlockId = number|string|"latest";

export interface TxPayload {
  tx: string;
  payload: any;
}

export interface BlockInfo {
  hash: string;
  number: string;
}

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  assetId: string;
  image?: string;
  customViewUrl?: string;
}

export interface SnapConfig {
}

// Filecoin types

export interface FilecoinApi {}

export type Callback<T> = (arg: T) => void;
