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
function sendSnapMethod(request, snapId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield window.ethereum.send({
            method: snapId,
            params: [
                request
            ]
        });
    });
}
function sign(method, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sendSnapMethod({
            method,
            params: {
                payload
            }
        }, this.snapId));
    });
}
function signPayloadJSON(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sign.bind(this)("signPayloadJSON", payload)).signature;
    });
}
exports.signPayloadJSON = signPayloadJSON;
function signPayloadRaw(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sign.bind(this)("signPayloadRaw", payload)).signature;
    });
}
exports.signPayloadRaw = signPayloadRaw;
function addPolkadotAsset() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendSnapMethod({ method: "addPolkadotAsset" }, this.snapId);
    });
}
exports.addPolkadotAsset = addPolkadotAsset;
function getBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sendSnapMethod({ method: "getBalance" }, this.snapId));
    });
}
exports.getBalance = getBalance;
function getAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sendSnapMethod({ method: "getAddress" }, this.snapId));
    });
}
exports.getAddress = getAddress;
function getPublicKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sendSnapMethod({ method: "getPublicKey" }, this.snapId));
    });
}
exports.getPublicKey = getPublicKey;
function exportSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield sendSnapMethod({ method: "exportSeed" }, this.snapId));
    });
}
exports.exportSeed = exportSeed;
function setConfiguration(config) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendSnapMethod({ method: "configure", params: { configuration: config } }, this.snapId);
    });
}
exports.setConfiguration = setConfiguration;
function getLatestBlock() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield sendSnapMethod({ method: "getBlock", params: { blockTag: "latest" } }, this.snapId));
        }
        catch (e) {
            console.log("Unable to fetch latest block", e);
            return { hash: "", number: "" };
        }
    });
}
exports.getLatestBlock = getLatestBlock;
function getAllTransactions(address) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sendSnapMethod({ method: "getAllTransactions", params: { address } }, this.snapId);
    });
}
exports.getAllTransactions = getAllTransactions;
function sendSignedData(signature, txPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield sendSnapMethod({
            method: "send",
            params: {
                signature,
                txPayload
            }
        }, this.snapId);
        return response;
    });
}
exports.sendSignedData = sendSignedData;
function generateTransactionPayload(amount, to) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sendSnapMethod({ method: "generateTransactionPayload", params: { amount, to } }, this.snapId);
    });
}
exports.generateTransactionPayload = generateTransactionPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsU0FBZSxjQUFjLENBQUMsT0FBbUMsRUFBRSxNQUFjOztRQUMvRSxPQUFPLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUU7Z0JBQ04sT0FBTzthQUNSO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBRUQsU0FBZSxJQUFJLENBRWpCLE1BQTRDLEVBQzVDLE9BQTZDOztRQUU3QyxPQUFPLENBQ0wsTUFBTSxjQUFjLENBQUM7WUFDbkIsTUFBTTtZQUNOLE1BQU0sRUFBRTtnQkFDTixPQUFPO2FBQ1I7U0FDZ0QsRUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FDVixDQUNxQixDQUFDO0lBQzNCLENBQUM7Q0FBQTtBQUVELFNBQXNCLGVBQWUsQ0FBNkIsT0FBMEI7O1FBQzFGLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkUsQ0FBQztDQUFBO0FBRkQsMENBRUM7QUFFRCxTQUFzQixjQUFjLENBQTZCLE9BQXlCOztRQUN4RixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RFLENBQUM7Q0FBQTtBQUZELHdDQUVDO0FBRUQsU0FBc0IsZ0JBQWdCOztRQUNwQyxNQUFNLGNBQWMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQUE7QUFGRCw0Q0FFQztBQUVELFNBQXNCLFVBQVU7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