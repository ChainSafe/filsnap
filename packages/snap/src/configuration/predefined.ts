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

export const filecoinDevnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/1'/0'/0/0",
  network: "t",
  rpc: {
    // eslint-disable-next-line max-len
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.DstNwIKa86Ftmz_zn9uJ3e_EBAd-Ot0-0tDHzl4YVP4",
    url: `http://134.122.86.62:1234/rpc/v0`,
    // url: `http://134.122.44.62:1234/rpc/v0`
  },
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL",
    // custom view url ?
  }
};

// devnet configuration replaces testnet for now
export const filecoinTestnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/1'/0'/0/0",
  network: "t",
  rpc: {
    token: "",
    // url: `http://node.glif.io/space05/lotus/rpc/v0`
    url: `http://node.gf.io/space05/lotus/rpc/v0`
  },
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL",
    // custom view url ?
  }
};

export const defaultConfiguration: SnapConfig = filecoinTestnetConfiguration;
