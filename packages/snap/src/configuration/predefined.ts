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
  rpcUrl: `http://134.122.86.62:1234/rpc/v0`,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.E0vtzfrPaHBDcP2Y1trnxVhTU6mgJl9MAqFhCmLFd40",
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
