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
const confirmation_1 = require("../util/confirmation");
function exportSeed(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        // ask for confirmation
        const confirmation = yield confirmation_1.showConfirmationDialog(wallet, 'Do you want to export your seed?');
        // return seed if user confirmed action
        if (confirmation) {
            const appKey = yield wallet.getAppKey();
            return appKey.substr(0, 32);
        }
        return null;
    });
}
exports.exportSeed = exportSeed;
//# sourceMappingURL=exportSeed.js.map