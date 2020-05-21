"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predefined_1 = require("./predefined");
function getDefaultConfiguration(networkName) {
    switch (networkName) {
        case "kusama":
            console.log("Kusama configuration selected");
            return predefined_1.kusamaConfiguration;
        case "westend":
            console.log("Westend configuration selected");
            return predefined_1.westendConfiguration;
        default:
            return predefined_1.defaultConfiguration;
    }
}
exports.getDefaultConfiguration = getDefaultConfiguration;
function getConfiguration(wallet) {
    const state = wallet.getPluginState();
    if (!state || !state.polkadot.config) {
        return predefined_1.defaultConfiguration;
    }
    return state.polkadot.config;
}
exports.getConfiguration = getConfiguration;
//# sourceMappingURL=index.js.map