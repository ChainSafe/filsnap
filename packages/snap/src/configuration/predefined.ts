import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
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
  derivationPath: "m/44'/1'/0/0/1",
  network: "t",
  rpc: {
    // eslint-disable-next-line max-len
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.s6vsMwMKTfFR3kAEEs0a8ZPW_816H48q8IHt3ewILsQ",
    url: `http://134.122.86.62:1234/rpc/v0`,
  },
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL",
    // custom view url ?
  }
};

// devnet configuration replaces testnet for now
export const filecoinTestnetConfiguration: SnapConfig = filecoinDevnetConfiguration;
export const defaultConfiguration: SnapConfig = filecoinDevnetConfiguration;
