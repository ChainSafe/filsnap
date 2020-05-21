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
const util_1 = require("@polkadot/util");
const confirmation_1 = require("../../util/confirmation");
function signPayloadJSON(wallet, api, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmation = yield confirmation_1.showConfirmationDialog(wallet, `Do you want to sign following payload: \n "${payload.method}" \n with account ${payload.address}`);
        if (confirmation) {
            const extrinsic = api.registry.createType('ExtrinsicPayload', payload, { version: payload.version });
            const keyPair = yield account_1.getKeyPair(wallet);
            return extrinsic.sign(keyPair);
        }
    });
}
exports.signPayloadJSON = signPayloadJSON;
function signPayloadRaw(wallet, api, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // ask for confirmation
        const confirmation = yield confirmation_1.showConfirmationDialog(wallet, `Do you want to sign following message: \n "${payload.data}" \n with account ${payload.address}`);
        // return seed if user confirmed action
        if (confirmation) {
            const keyPair = yield account_1.getKeyPair(wallet);
            const signedBytes = keyPair.sign(util_1.hexToU8a(payload.data));
            return {
                signature: util_1.u8aToHex(signedBytes)
            };
        }
    });
}
exports.signPayloadRaw = signPayloadRaw;
//# sourceMappingURL=sign.js.map