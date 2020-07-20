export interface GetPublicKeyRequest{
  method: "getPublicKey";
}

export interface GetAddressRequest {
  method: "getAddress";
}

export interface ExportSeedRequest {
  method: "exportPrivateKey";
}

export interface ConfigureRequest {
  method: "configure";
  params: {
    configuration: SnapConfig;
  };
}

export interface SignMessageRequest {
  method: "signMessage";
  params: {
    message: Message;
  };
}

export interface SignMessageRawRequest {
  method: "signMessageRaw";
  params: {
    message: string;
  };
}

export interface GetBalanceRequest {
  method: "getBalance";
}

export interface GetTransactionsRequest {
  method: "getTransactions";
}

export type MetamaskFilecoinRpcRequest =
    GetPublicKeyRequest |
    GetAddressRequest |
    ExportSeedRequest |
    ConfigureRequest |
    GetBalanceRequest |
    GetTransactionsRequest |
    SignMessageRequest |
    SignMessageRawRequest;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasprice: string;
  gaslimit: number;
  method: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export interface SignedMessage {
  message: Message;
  signature: {
    data: string;
    type: number;
  };
}

export type FilecoinNetwork = "f" | "t";

export interface FilecoinEventApi {}

export interface FilecoinSnapApi {
  getPublicKey(): Promise<string>;
  getAddress(): Promise<string>;
  getBalance(): Promise<string>;
  exportPrivateKey(): Promise<string>;
  configure(configuration: SnapConfig): Promise<void>;
  signMessage(message: Message): Promise<SignedMessage>;
  signMessageRaw(message: string): Promise<string>;
}

export interface Transaction {
  hash: string;
  block: string;
  sender: string;
  destination: string;
  amount: string | number;
  fee: string;
}

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}