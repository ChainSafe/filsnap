import {SnapConfig} from "@chainsafe/filsnap-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0'/0/0",
  network: "f",
  rpc: {
    token: "",
    url: "https://api.node.glif.io",
  },
  unit: {
    decimals: 6,
    image: `https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=007`,
    symbol: "FIL"
  }
};

// devnet configuration replaces testnet for now
export const filecoinTestnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/1'/0'/0/0",
  network: "t",
  rpc: {
    token: "",
    url: `https://calibration.node.glif.io`
  },
  unit: {
    decimals: 6,
    image: `https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=007`,
    symbol: "FIL",
    // custom view url ?
  }
};

export const defaultConfiguration: SnapConfig = filecoinMainnetConfiguration;
