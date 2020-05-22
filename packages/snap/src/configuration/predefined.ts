import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export const filecoinConfiguration: SnapConfig = {
  addressPrefix: 42,
  networkName: "filecoin",
  unit: {
    assetId: "wst-token",
    decimals: 12,
    image: "https://svgshare.com/i/L2d.svg",
    symbol: "WND",
  },
  wsRpcUrl: "wss://westend-rpc.polkadot.io/",
};

export const defaultConfiguration: SnapConfig = filecoinConfiguration;