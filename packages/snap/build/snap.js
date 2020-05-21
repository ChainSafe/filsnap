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
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("./interfaces");
const getPublicKey_1 = require("./rpc/getPublicKey");
const exportSeed_1 = require("./rpc/exportSeed");
const getBalance_1 = require("./rpc/substrate/getBalance");
const getAddress_1 = require("./rpc/getAddress");
const getTransactions_1 = require("./rpc/substrate/getTransactions");
const getBlock_1 = require("./rpc/substrate/getBlock");
const asset_1 = require("./asset");
const api_1 = require("./polkadot/api");
const configure_1 = require("./rpc/configure");
const events_1 = require("./polkadot/events");
const balance_1 = require("./polkadot/events/balance");
const sign_1 = require("./rpc/substrate/sign");
const generateTransactionPayload_1 = require("./rpc/generateTransactionPayload");
const send_1 = require("./rpc/send");
const apiDependentMethods = [
    "getBlock", "getBalance", "getChainHead", "signPayloadJSON", "signPayloadRaw", "generateTransactionPayload", "send"
];
wallet.registerApiRequestHandler(function (origin) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            subscribeToBalance: (callback) => {
                events_1.polkadotEventEmitter.addListener("onBalanceChange", origin.hostname, callback);
                // first call or first call after unregistering
                if (events_1.polkadotEventEmitter.getListenersCount("onBalanceChange", origin.hostname) === 1) {
                    balance_1.registerOnBalanceChange(wallet, origin.hostname);
                }
            },
            subscribeToTxStatus: (hash, onIncluded, onFinalized) => {
                events_1.txEventEmitter.addListener("included", hash, onIncluded);
                if (onFinalized) {
                    events_1.txEventEmitter.addListener("finalized", hash, onFinalized);
                }
            },
            unsubscribeAllFromBalance: () => {
                events_1.polkadotEventEmitter.removeAllListeners("onBalanceChange", origin.hostname);
                balance_1.removeOnBalanceChange(origin.hostname);
            },
            unsubscribeFromBalance: (callback) => {
                events_1.polkadotEventEmitter.removeListener("onBalanceChange", origin.hostname, callback);
                if (events_1.polkadotEventEmitter.getListenersCount("onBalanceChange", origin.hostname) === 0) {
                    balance_1.removeOnBalanceChange(origin.hostname);
                }
            }
        };
    });
});
wallet.registerRpcMessageHandler((originString, requestObject) => __awaiter(void 0, void 0, void 0, function* () {
    const state = wallet.getPluginState();
    if (!state) {
        // initialize state if empty and set default config
        wallet.updatePluginState(interfaces_1.EmptyMetamaskState());
    }
    // fetch api promise
    let api = null;
    if (apiDependentMethods.includes(requestObject.method)) {
        api = yield api_1.getApi(wallet);
    }
    switch (requestObject.method) {
        case "signPayloadJSON":
            return yield sign_1.signPayloadJSON(wallet, api, requestObject.params.payload);
        case "signPayloadRaw":
            return yield sign_1.signPayloadRaw(wallet, api, requestObject.params.payload);
        case 'getPublicKey':
            return yield getPublicKey_1.getPublicKey(wallet);
        case 'getAddress':
            return yield getAddress_1.getAddress(wallet);
        case 'exportSeed':
            return yield exportSeed_1.exportSeed(wallet);
        case 'getAllTransactions':
            return yield getTransactions_1.getTransactions(wallet, requestObject.params.address);
        case 'getBlock':
            return yield getBlock_1.getBlock(requestObject.params.blockTag, api);
        case 'getBalance': {
            const balance = yield getBalance_1.getBalance(wallet, api);
            yield asset_1.updateAsset(wallet, originString, balance);
            return balance;
        }
        case 'configure': {
            api_1.resetApi();
            return configure_1.configure(wallet, requestObject.params.configuration.networkName, requestObject.params.configuration);
        }
        case 'addPolkadotAsset':
            return yield asset_1.updateAsset(wallet, originString, 0);
        case 'removePolkadotAsset':
            return yield asset_1.removeAsset(wallet, originString);
        case "generateTransactionPayload":
            return yield generateTransactionPayload_1.generateTransactionPayload(wallet, api, requestObject.params.to, requestObject.params.amount);
        case "send":
            return yield send_1.send(wallet, api, requestObject.params.signature, requestObject.params.txPayload);
        case 'getChainHead':
            const head = yield api.rpc.chain.getFinalizedHead();
            return head.hash;
        default:
            throw new Error('Method not found.');
    }
}));
//# sourceMappingURL=snap.js.map