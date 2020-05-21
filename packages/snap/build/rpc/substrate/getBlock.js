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
function _getBlock(blockHash, api) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedBlock = yield api.rpc.chain.getBlock(blockHash);
        return {
            hash: signedBlock.block.hash.toHex(),
            number: signedBlock.block.header.number.toString()
        };
    });
}
function _getBlockById(blockId, api) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockHash = yield api.rpc.chain.getBlockHash(blockId);
        if (!blockHash.isEmpty) {
            return yield _getBlock(blockHash, api);
        }
        return null;
    });
}
/**
 * Returns block based on blockTag passed as param.
 *
 * Supported tags are:
 *    block id    (as string or number)
 *    block hash  (as hex string starting with "0x")
 *    "latest"    (returning latest block)
 *
 * @param blockTag
 * @param api
 */
function getBlock(blockTag, api) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (typeof blockTag) {
            case "number":
                // get block by id sent as number
                return yield _getBlockById(blockTag, api);
            case "string":
                if (blockTag === "latest") {
                    // get latest block
                    const h = yield api.rpc.chain.getHeader();
                    return yield _getBlock(h.hash, api);
                }
                else if (blockTag.startsWith("0x")) {
                    // get block by hash
                    return yield _getBlock(blockTag, api);
                }
                else {
                    // get block by id sent as string
                    const blockId = parseInt(blockTag);
                    if (blockId) {
                        return yield _getBlockById(blockId, api);
                    }
                }
        }
        return null;
    });
}
exports.getBlock = getBlock;
//# sourceMappingURL=getBlock.js.map