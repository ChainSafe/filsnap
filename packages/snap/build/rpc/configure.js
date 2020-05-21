"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const configuration_1 = require("../configuration");
function configure(wallet, networkName, overrides) {
    const defaultConfig = configuration_1.getDefaultConfiguration(networkName);
    const configuration = deepmerge_1.default(defaultConfig, overrides);
    const state = wallet.getPluginState();
    state.polkadot.config = configuration;
    wallet.updatePluginState(state);
    return configuration;
}
exports.configure = configure;
//# sourceMappingURL=configure.js.map