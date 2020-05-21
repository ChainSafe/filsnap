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
const index_1 = require("../index");
const api_1 = require("../../api");
const account_1 = require("../../account");
const asset_1 = require("../../../asset");
let unsubscribe;
function registerOnBalanceChange(wallet, origin) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield api_1.getApi(wallet);
        const address = (yield account_1.getKeyPair(wallet)).address;
        // Here we subscribe to any balance changes and update the on-screen value
        yield api.query.system.account(address, ({ data: { free: currentFree } }) => {
            asset_1.updateAsset(wallet, origin, currentFree.toString());
            index_1.polkadotEventEmitter.emit("onBalanceChange", origin, currentFree.toString());
        });
        // if (!unsubscribe) {
        //   unsubscribe = {
        //     [origin]: unsubscribeCallback
        //   };
        // } else {
        //   // clean up if already subscribed
        //   if (unsubscribe[origin]) {
        //     unsubscribe[origin]();
        //   }
        //   // register new unsubscribe callback
        //   unsubscribe[origin] = unsubscribeCallback;
        // }
    });
}
exports.registerOnBalanceChange = registerOnBalanceChange;
function removeOnBalanceChange(origin) {
    // if (unsubscribe && unsubscribe[origin]) {
    //   unsubscribe[origin]();
    //   delete unsubscribe[origin];
    // }
}
exports.removeOnBalanceChange = removeOnBalanceChange;
//# sourceMappingURL=index.js.map