import {SnapConfig} from "@nodefactory/filsnap-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0'/0/0",
  network: "f",
  rpc: {
    token: "",
    url: "",
  },
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

// devnet configuration replaces testnet for now
export const filecoinTestnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/1'/0'/0/0",
  network: "t",
  rpc: {
    token: "",
    url: `http://node.glif.io/space05/lotus/rpc/v0`
  },
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL",
    // custom view url ?
  }
};

export const defaultConfiguration: SnapConfig = filecoinTestnetConfiguration;
