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
const getAddress_1 = require("./getAddress");
const events_1 = require("../polkadot/events");
function send(wallet, api, signature, txPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        const extrinsic = api.createType('Extrinsic', txPayload.tx);
        extrinsic.addSignature((yield getAddress_1.getAddress(wallet)), signature, txPayload.payload);
        const txHash = extrinsic.hash.toHex();
        api.rpc.author.submitAndWatchExtrinsic(extrinsic, result => {
            if (result.isInBlock) {
                events_1.txEventEmitter.emit("included", txHash, { txHash });
                events_1.txEventEmitter.removeAllListeners("included", txHash);
            }
            else if (result.isFinalized) {
                events_1.txEventEmitter.emit("finalized", txHash, { txHash });
                events_1.txEventEmitter.removeAllListeners("finalized", txHash);
            }
        });
        return extrinsic.hash.toHex();
    });
}
exports.send = send;
//# sourceMappingURL=send.js.map