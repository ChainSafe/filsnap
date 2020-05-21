export interface GetPublicKeyRequest{
  method: "getPublicKey";
}

export interface GetAddressRequest {
  method: "getAddress";
}

export interface ExportSeedRequest {
  method: "exportSeed";
}

export interface GetTransactionsRequest {
  method: "getAllTransactions";
  params: {
    address?: string;
  };
}

export interface GetBlockRequest {
  method: "getBlock";
  params: {
    blockTag?: BlockId;
  };
}

export interface GetBalanceRequest {
  method: "getBalance";
}


export interface ConfigureSnapRequest {
  method: "configure";
  params: {
    configuration: SnapConfig;
  };
}

export interface AddFilecoinAssetRequest {
  method: "addFilecoinasset";
}

export interface RemoveFilecoinAssetRequest {
  method: "removeFilecoinAsset";
}

export interface GetChainHeadRequest {
  method: "getChainHead";
}

export interface SignPayloadJSONRequest {
  method: "signPayloadJSON";
  params: {
    payload: any;
  };
}

export interface SignPayloadRawRequest {
  method: "signPayloadRaw";
  params: {
    payload: any;
  };
}

export interface GenerateTransactionPayload {
  method: "generateTransactionPayload";
  params: {
    amount: string|number;
    to: string;
  };
}

export interface SendUnitRequest {
  method: "send";
  params: {
    signature: string;
    txPayload: TxPayload;
  };
}

export type MetamaskFilecoinRpcRequest =
    GetPublicKeyRequest
    | GetAddressRequest
    | ExportSeedRequest
    | GetTransactionsRequest
    | GetBlockRequest
    | GetBalanceRequest
    | ConfigureSnapRequest
    | AddFilecoinAssetRequest
    | RemoveFilecoinAssetRequest
    | GetChainHeadRequest
    | SignPayloadJSONRequest
    | SignPayloadRawRequest
    | SendUnitRequest
    | GenerateTransactionPayload;

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
  networkName: string;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

// Filecoin types

export interface FilecoinApi {}

export type Callback<T> = (arg: T) => void;
