import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/461'/0/0/1",
  network: "f",
  rpcUrl: "",
  token: "",
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

// replaces testnet for now
export const filecoinDevnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/1'/0/0/1",
  network: "t",
  rpcUrl: `http://134.122.86.62/rpc/v0`,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiL" +
      "CJzaWduIiwiYWRtaW4iXX0.lggkQAOfdZSHuif8JAQ8vW4WrXa1-Nw4IMVCw8cy0oA",
  unit: {
    decimals: 6,
    image: `https://svgshare.com/i/M4s.svg`,
    symbol: "FIL"
  }
};

export const filecoinTestnetConfiguration: SnapConfig = filecoinDevnetConfiguration;
// export const filecoinTestnetConfiguration: SnapConfig = {
//   derivationPath: "m/44'/461'/0/0/1",
//   network: "t",
//   rpcUrl: ``,
//   unit: {
//     decimals: 6,
//     image: `https://svgshare.com/i/M4s.svg`,
//     symbol: "FIL"
//   }
// };

export const defaultConfiguration: SnapConfig = filecoinDevnetConfiguration;
