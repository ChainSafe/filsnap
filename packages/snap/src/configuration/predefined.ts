import {SnapConfig} from "@nodefactory/metamask-polkadot-types";

export const kusamaConfiguration: SnapConfig = {
  addressPrefix: 2,
  networkName: "kusama",
  unit: {
    assetId: "ksm-token",
    decimals: 12,
    image: "https://svgshare.com/i/L3o.svg",
    symbol: "KSM",
  },
  wsRpcUrl: "wss://kusama-rpc.polkadot.io/",
};
export const westendConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: "westend",
  unit: {
    assetId: "wst-token",
    decimals: 12,
    image: "https://svgshare.com/i/L2d.svg",
    symbol: "WND",
  },
  wsRpcUrl: "wss://westend-rpc.polkadot.io/",
};

export const defaultConfiguration: SnapConfig = westendConfiguration;