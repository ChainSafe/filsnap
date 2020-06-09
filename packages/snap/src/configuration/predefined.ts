import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  network: "f",
  rpcUrl: ""
};

export const filecoinTestnetConfiguration: SnapConfig = {
  network: "t",
  rpcUrl: ""
};

export const devConfiguration: SnapConfig = {
    network: "t",
    rpcUrl: "https://lotus.testground.ipfs.team/api/0/node/rpc/v0"
};

export const defaultConfiguration: SnapConfig = devConfiguration;
