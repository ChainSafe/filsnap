import {Message, SignedMessage} from "@chainsafe/filsnap-types";

export interface LotusRpcApi {
  version(): Promise<VersionResponse>;
  walletBalance(address: string): Promise<string>;
  mpoolGetNonce(address: string): Promise<string>;
  stateCall(message: Message, tipset: unknown): Promise<MessageStateCallResponse>;
  mpoolPush(signedMessage: SignedMessage): Promise<MessageResponse>;
  gasEstimateMessageGas(message: Message, messageSendSpec: {MaxFee: string}, tipset: unknown): Promise<ApiMessage>;
  gasEstimateFeeCap(message: Message, maxqueueblks: number, tipset: unknown): Promise<string>;
  gasEstimateGasLimit(message: Message, tipset: unknown): Promise<number>;
  stateNetworkName(): Promise<string>;
}

export interface ApiMessage {
  To: string;
  From: string;
  Nonce: number;
  Value: string;
  GasFeeCap: string;
  GasPremium: string;
  GasLimit: number;
  Method: number;
  Params?: [];
}

export interface VersionResponse {
  APIVersion: number;
  BlockDelay: number;
  Version: string;
}

export interface MessageResponse {
  ["/"]: string;
}

export interface MessageStateCallResponse {
  Duration: number;
  Error: string;
  ExecutionTrace: {
    Duration: number;
    Error: string;
    GasCharges: [];
    Msg: Message;
    MsgRct: {
      ExitCode: number;
      GasUsed: number;
      Return: unknown;
    };
  };
  Msg: Message;
  MsgRct: {
    ExitCode: number;
    GasUsed: number;
    Return: unknown;
  };
}