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
function generateTransactionPayload(wallet, api, to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        // fetch last signed block and account address
        const [signedBlock, address] = yield Promise.all([api.rpc.chain.getBlock(), getAddress_1.getAddress(wallet)]);
        // create signer options
        const nonce = (yield api.derive.balances.account(address)).accountNonce;
        const signerOptions = {
            blockHash: signedBlock.block.header.hash,
            era: api.createType('ExtrinsicEra', {
                current: signedBlock.block.header.number,
                period: 50
            }),
            nonce
        };
        // define transaction method
        const transaction = api.tx.balances.transfer(to, amount);
        // create SignerPayload
        const signerPayload = api.createType('SignerPayload', Object.assign(Object.assign({ genesisHash: api.genesisHash, runtimeVersion: api.runtimeVersion, version: api.extrinsicVersion }, signerOptions), { address: to, blockNumber: signedBlock.block.header.number, method: transaction.method }));
        return {
            payload: signerPayload.toPayload(),
            tx: transaction.toHex()
        };
    });
}
exports.generateTransactionPayload = generateTransactionPayload;
//# sourceMappingURL=generateTransactionPayload.js.map