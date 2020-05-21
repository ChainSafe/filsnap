"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("@polkadot/api/promise"));
const api_1 = require("@polkadot/api");
const configuration_1 = require("../configuration");
const U8aFixed_1 = __importDefault(require("@polkadot/types/codec/U8aFixed"));
let api;
let provider;
let isConnecting;
/**
 * Initialize substrate api and awaits for it to be ready
 */
function initApi(wsRpcUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        provider = new api_1.WsProvider(wsRpcUrl);
        let api = new promise_1.default({
            initWasm: false,
            provider,
            types: {
                //tmp fix until we figure out how to update polkadot api lib
                ModuleId: U8aFixed_1.default,
                RuntimeDbWeight: {
                    read: 'Weight',
                    write: 'Weight'
                }
            }
        });
        try {
            api = yield api.isReady;
        }
        catch (e) {
            console.log("Api is ready with error:", e);
        }
        return api;
    });
}
exports.resetApi = () => {
    if (api && provider) {
        try {
            api.disconnect();
            provider.disconnect();
        }
        catch (e) {
        }
        api = null;
        provider = null;
    }
};
exports.getApi = (wallet) => __awaiter(void 0, void 0, void 0, function* () {
    if (!api) {
        // api not initialized or configuration changed
        const config = configuration_1.getConfiguration(wallet);
        api = yield initApi(config.wsRpcUrl);
        isConnecting = false;
    }
    else {
        while (isConnecting) {
            yield new Promise(r => setTimeout(r, 100));
        }
        if (!provider.isConnected()) {
            isConnecting = true;
            yield provider.connect();
            isConnecting = false;
        }
    }
    return api;
});
//# sourceMappingURL=api.js.map