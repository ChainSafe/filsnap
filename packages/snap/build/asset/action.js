"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line max-len
function executeAssetOperation(asset, wallet, method) {
    return wallet.send({
        method: 'wallet_manageAssets',
        params: [method, asset],
    });
}
exports.executeAssetOperation = executeAssetOperation;
//# sourceMappingURL=action.js.map