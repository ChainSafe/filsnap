import {Message, SignedMessage} from "@nodefactory/metamask-filecoin-types";

export interface LotusRpcApi {
  version(): Promise<VersionResponse>;
  walletBalance(address: string): Promise<string>;
  mpoolGetNonce(address: string): Promise<string>;
  stateCall(message: Message, tipset: unknown): Promise<MessageStateCallResponse>;
  mpoolPush(signedMessage: SignedMessage): Promise<MessageResponse>;
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