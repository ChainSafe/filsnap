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
const extension_inject_1 = require("@polkadot/extension-inject");
const snap_1 = require("./snap");
const utils_1 = require("./utils");
const defaultOrigin = new URL('package.json', 'http://localhost:8081').toString();
/**
 *
 * @param network
 * @param config
 * @param pluginOrigin url to package.json
 */
function injectMetamaskPolkadotSnapProvider(network, config, pluginOrigin) {
    if (!utils_1.hasMetaMask()) {
        return;
    }
    const polkadotSnap = new snap_1.MetamaskPolkadotSnap(pluginOrigin || defaultOrigin, config || { networkName: network });
    extension_inject_1.injectExtension(() => __awaiter(this, void 0, void 0, function* () { return yield polkadotSnap.enableSnap(); }), { name: 'metamask-polkadot-snap', version: '1.0.0' });
}
exports.injectMetamaskPolkadotSnapProvider = injectMetamaskPolkadotSnapProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxpRUFBMkQ7QUFDM0QsaUNBQTRDO0FBRTVDLG1DQUFvQztBQUVwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVsRjs7Ozs7R0FLRztBQUNILFNBQWdCLGtDQUFrQyxDQUNoRCxPQUEyQixFQUMzQixNQUFtQixFQUNuQixZQUFxQjtJQUVyQixJQUFHLENBQUMsbUJBQVcsRUFBRSxFQUFFO1FBQ2pCLE9BQU87S0FDUjtJQUNELE1BQU0sWUFBWSxHQUFHLElBQUksMkJBQW9CLENBQzNDLFlBQVksSUFBSSxhQUFhLEVBQzdCLE1BQU0sSUFBSSxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUMsQ0FDakMsQ0FBQztJQUNGLGtDQUFlLENBQ2IsR0FBUyxFQUFFLGdEQUFDLE9BQUEsTUFBTSxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUEsR0FBQSxFQUMzQyxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQ25ELENBQUM7QUFDSixDQUFDO0FBaEJELGdGQWdCQyJ9