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
let api;
function getEventApi() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!api) {
            //init api
            const index = yield window.ethereum.requestIndex();
            api = yield index.getPluginApi(this.pluginOrigin);
        }
        return api;
    });
}
exports.getEventApi = getEventApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLElBQUksR0FBZ0IsQ0FBQztBQUVyQixTQUFzQixXQUFXOztRQUMvQixJQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsVUFBVTtZQUNWLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNuRCxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUFBO0FBUEQsa0NBT0MifQ==