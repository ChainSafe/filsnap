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
const axios_1 = __importDefault(require("axios"));
const getAddress_1 = require("../getAddress");
const API_PATH = "https://api-01.polkascan.io/kusama/api/v1/balances/transfer";
/**
 * Query polkascan.io api for historic data about transactions for address.
 * @param wallet
 * @param address
 */
function getTransactions(wallet, address) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!address) {
            address = yield getAddress_1.getAddress(wallet);
        }
        const response = yield axios_1.default.get(`${API_PATH}?&filter[address]=${address}`);
        // if request is successful
        if (response.status >= 200 && response.status < 300) {
            const polResponse = response.data;
            return polResponse.data;
        }
        return null;
    });
}
exports.getTransactions = getTransactions;
//# sourceMappingURL=getTransactions.js.map