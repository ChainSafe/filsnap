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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAddress_1 = require("../rpc/getAddress");
const action_1 = require("./action");
const formatBalance_1 = __importDefault(require("@polkadot/util/format/formatBalance"));
const configuration_1 = require("../configuration");
const assets = new Map();
function getIdentifier(origin, id) {
    return `${origin}_${id}`;
}
function getPolkadotAssetDescription(balance, address, configuration) {
    return {
        balance: formatBalance_1.default(balance, { decimals: configuration.unit.decimals, withSi: true, withUnit: false }),
        customViewUrl: configuration.unit.customViewUrl ||
            `https://polkascan.io/pre/${configuration.networkName}/account/${address}`,
        decimals: 0,
        identifier: configuration.unit.assetId,
        image: configuration.unit.image || "",
        symbol: configuration.unit.symbol,
    };
}
exports.getPolkadotAssetDescription = getPolkadotAssetDescription;
function removeAsset(wallet, origin) {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = configuration_1.getConfiguration(wallet);
        const assetId = configuration.unit.assetId;
        yield action_1.executeAssetOperation({ identifier: assetId }, wallet, "remove");
        assets.delete(getIdentifier(origin, assetId));
        return true;
    });
}
exports.removeAsset = removeAsset;
function updateAsset(wallet, origin, balance) {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = configuration_1.getConfiguration(wallet);
        const assetId = configuration.unit.assetId;
        console.log("Updating asset", origin, assetId);
        if (assets.has(getIdentifier(origin, assetId))) {
            const asset = assets.get(getIdentifier(origin, assetId));
            asset.balance = formatBalance_1.default(balance, { decimals: 12, withSi: true, withUnit: false });
            yield action_1.executeAssetOperation(asset, wallet, "update");
        }
        else {
            const asset = getPolkadotAssetDescription(0, yield getAddress_1.getAddress(wallet), configuration);
            yield removeAsset(wallet, origin);
            yield action_1.executeAssetOperation(asset, wallet, "add");
            assets.set(getIdentifier(origin, assetId), asset);
        }
        return true;
    });
}
exports.updateAsset = updateAsset;
//# sourceMappingURL=index.js.map