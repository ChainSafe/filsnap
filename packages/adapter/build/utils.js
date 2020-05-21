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
function hasMetaMask() {
    if (!window.ethereum) {
        return false;
    }
    return window.ethereum.isMetaMask;
}
exports.hasMetaMask = hasMetaMask;
function installPolkadotSnap(pluginOrigin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield window.ethereum.send({
                method: 'wallet_enable',
                params: [{
                        [pluginOrigin]: {}
                    }]
            });
            return true;
        }
        catch (e) {
            console.log("Failed to install snap", e);
            return false;
        }
    });
}
exports.installPolkadotSnap = installPolkadotSnap;
function isPolkadotSnapInstalled(pluginOrigin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield window.ethereum.send({
                method: 'wallet_getPlugins',
            });
            return !!Object.values(result).find((permission) => permission.permissionName === pluginOrigin);
        }
        catch (e) {
            console.log("Failed to obtain installed plugins", e);
            return false;
        }
    });
}
exports.isPolkadotSnapInstalled = isPolkadotSnapInstalled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxTQUFnQixXQUFXO0lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0FBQ3BDLENBQUM7QUFMRCxrQ0FLQztBQUVELFNBQXNCLG1CQUFtQixDQUFDLFlBQW9COztRQUM1RCxJQUFJO1lBQ0YsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDekIsTUFBTSxFQUFFLGVBQWU7Z0JBQ3ZCLE1BQU0sRUFBRSxDQUFDO3dCQUNQLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRTtxQkFDbkIsQ0FBQzthQUNILENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FBQTtBQWJELGtEQWFDO0FBRUQsU0FBc0IsdUJBQXVCLENBQUMsWUFBb0I7O1FBQ2hFLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUN4QyxNQUFNLEVBQUUsbUJBQW1CO2FBQzVCLENBQTRDLENBQUM7WUFDOUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEtBQUssWUFBWSxDQUFDLENBQUM7U0FDakc7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FBQTtBQVZELDBEQVVDIn0=