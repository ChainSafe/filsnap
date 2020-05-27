import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
  wsRpcUrl: "wss://lotus.testground.ipfs.team/api/0/node/rpc/v0"
};

export const defaultConfiguration: SnapConfig = filecoinConfiguration;
