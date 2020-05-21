"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kusamaConfiguration = {
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
exports.westendConfiguration = {
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
exports.defaultConfiguration = exports.westendConfiguration;
//# sourceMappingURL=predefined.js.map