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
const account_1 = require("../../polkadot/account");
/**
 * Returns balance as BN
 * @param wallet
 * @param api
 * @param address
 */
function getBalance(wallet, api, address) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!address) {
            address = (yield account_1.getKeyPair(wallet)).address;
        }
        const account = yield api.query.system.account(address);
        return account.data.free.toString();
    });
}
exports.getBalance = getBalance;
//# sourceMappingURL=getBalance.js.map