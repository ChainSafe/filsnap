export interface GetPublicKeyRequest{
  method: "getPublicKey";
}

export interface GetAddressRequest {
  method: "getAddress";
}

export interface ExportSeedRequest {
  method: "exportSeed";
}

export interface ConfigureRequest {
  method: "configure";
  params: {
    configuration: SnapConfig;
  };
}

export type MetamaskFilecoinRpcRequest =
    GetPublicKeyRequest | GetAddressRequest | ExportSeedRequest | ConfigureRequest;

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
  image?: string;
  customViewUrl?: string;
}

export interface SnapConfig {
  derivationPath?: string;
  network: FilecoinNetwork;
  rpcUrl?: string;
  unit?: UnitConfiguration;
}

export type Callback<T> = (arg: T) => void;

// Filecoin types

export type FilecoinNetwork = "f" | "t";

export interface FilecoinEventApi {}

export interface FilecoinSnapApi {
  getPublicKey(): Promise<string>;
  getAddress(): Promise<string>;
  exportSeed(): Promise<string>;
  configure(configuration: SnapConfig): void;
}