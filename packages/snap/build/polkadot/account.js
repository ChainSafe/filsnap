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
const util_crypto_1 = require("@polkadot/util-crypto");
const keyring_1 = require("@polkadot/keyring");
const util_1 = require("@polkadot/util");
const configuration_1 = require("../configuration");
/**
 * Returns KeyringPair if one is saved in wallet state, creates new one otherwise
 * @param wallet
 */
function getKeyPair(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        // get app key and wait for api to be ready
        const [appKey] = yield Promise.all([wallet.getAppKey(), util_crypto_1.cryptoWaitReady()]);
        // generate keys
        const seed = appKey.substr(0, 32);
        const keyring = new keyring_1.Keyring({ ss58Format: configuration_1.getConfiguration(wallet).addressPrefix });
        return keyring.addFromSeed(util_1.stringToU8a(seed));
    });
}
exports.getKeyPair = getKeyPair;
//# sourceMappingURL=account.js.map