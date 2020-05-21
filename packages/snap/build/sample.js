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
const api_1 = require("@polkadot/api");
const promise_1 = __importDefault(require("@polkadot/api/promise"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new api_1.WsProvider("wss://westend-rpc.polkadot.io");
        // const provider = new WsProvider("wss://kusama-rpc.polkadot.io");
        let api = new promise_1.default({ initWasm: false, provider, types: { RuntimeDbWeight: {
                    read: 'Weight',
                    write: 'Weight'
                } } });
        try {
            api = yield api.isReady;
        }
        catch (e) {
            console.log("Api is ready with error:", e);
        }
        console.log((yield api.query.system.account("5o96D5Nu589vP9FDDt967uxNYugQ8LEGfwdbpjcXVaZaGNmS")).data.free.toHuman());
    });
})();
//# sourceMappingURL=sample.js.map