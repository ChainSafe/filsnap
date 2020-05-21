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
const util_1 = require("@polkadot/util");
const account_1 = require("../polkadot/account");
function getPublicKey(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPair = yield account_1.getKeyPair(wallet);
        return util_1.u8aToHex(keyPair.publicKey);
    });
}
exports.getPublicKey = getPublicKey;
//# sourceMappingURL=getPublicKey.js.map