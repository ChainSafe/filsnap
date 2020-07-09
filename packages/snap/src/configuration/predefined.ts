import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
  network: "f",
  rpcUrl: "https://lotus.testground.ipfs.team/api/0/node/rpc/v0",
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

export const filecoinTestnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
  network: "t",
  rpcUrl: `https://lotus.testground.ipfs.team/api/0/node/rpc/v0`,
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

export const devConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
  network: "t",
  rpcUrl: `https://lotus.testground.ipfs.team/api/0/node/rpc/v0`,
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

export const defaultConfiguration: SnapConfig = devConfiguration;
