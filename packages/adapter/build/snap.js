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
const methods_1 = require("./methods");
const utils_1 = require("./utils");
const api_1 = require("./api");
class MetamaskPolkadotSnap {
    constructor(pluginOrigin, config) {
        this.accounts = {
            get: () => __awaiter(this, void 0, void 0, function* () {
                const account = {
                    address: yield methods_1.getAddress.bind(this)(),
                    genesisHash: null,
                    name: "Metamask account"
                };
                return [account];
            }),
            subscribe: () => {
                return () => {
                    throw "unsupported method";
                };
            }
        };
        this.signer = {
            signPayload: (payload) => __awaiter(this, void 0, void 0, function* () {
                const signature = yield methods_1.signPayloadJSON.bind(this)(payload);
                const id = this.requestCounter;
                this.requestCounter += 1;
                return { id, signature };
            }),
            signRaw: (raw) => __awaiter(this, void 0, void 0, function* () {
                const signature = yield methods_1.signPayloadRaw.bind(this)(raw);
                const id = this.requestCounter;
                this.requestCounter += 1;
                return { id, signature };
            }),
            update: () => null
        };
        this.enableSnap = () => __awaiter(this, void 0, void 0, function* () {
            if (!(yield utils_1.isPolkadotSnapInstalled(this.snapId))) {
                yield window.ethereum.send({
                    method: "wallet_enable",
                    params: [{
                            [this.snapId]: {}
                        }]
                });
                yield methods_1.setConfiguration.bind(this)(this.config);
                yield methods_1.addPolkadotAsset.bind(this)();
            }
            return this;
        });
        this.getMetamaskSnapApi = () => __awaiter(this, void 0, void 0, function* () {
            return {
                addPolkadotAsset: methods_1.addPolkadotAsset.bind(this),
                exportSeed: methods_1.exportSeed.bind(this),
                generateTransactionPayload: methods_1.generateTransactionPayload.bind(this),
                getAllTransactions: methods_1.getAllTransactions.bind(this),
                getBalance: methods_1.getBalance.bind(this),
                getEventApi: api_1.getEventApi.bind(this),
                getLatestBlock: methods_1.getLatestBlock.bind(this),
                getPublicKey: methods_1.getPublicKey.bind(this),
                send: methods_1.sendSignedData.bind(this),
                setConfiguration: methods_1.setConfiguration.bind(this),
            };
        });
        this.pluginOrigin = pluginOrigin;
        this.snapId = "wallet_plugin_" + this.pluginOrigin;
        this.config = config || { networkName: "westend" };
        this.requestCounter = 0;
    }
}
exports.MetamaskPolkadotSnap = MetamaskPolkadotSnap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsdUNBYW1CO0FBR25CLG1DQUFnRDtBQUNoRCwrQkFBa0M7QUFFbEMsTUFBYSxvQkFBb0I7SUEwQy9CLFlBQW1CLFlBQW9CLEVBQUUsTUFBa0I7UUF4Q3BELGFBQVEsR0FBcUI7WUFDbEMsR0FBRyxFQUFFLEdBQVMsRUFBRTtnQkFDZCxNQUFNLE9BQU8sR0FBb0I7b0JBQy9CLE9BQU8sRUFBRSxNQUFNLG9CQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxXQUFXLEVBQUUsSUFBSTtvQkFDakIsSUFBSSxFQUFFLGtCQUFrQjtpQkFDekIsQ0FBQztnQkFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFBO1lBQ0QsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDZCxPQUFPLEdBQVMsRUFBRTtvQkFDaEIsTUFBTSxvQkFBb0IsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDO1lBQ0osQ0FBQztTQUNGLENBQUM7UUFFSyxXQUFNLEdBQW1CO1lBQzlCLFdBQVcsRUFBRSxDQUFPLE9BQTBCLEVBQXlCLEVBQUU7Z0JBQ3ZFLE1BQU0sU0FBUyxHQUFHLE1BQU0seUJBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO2dCQUN6QixPQUFPLEVBQUMsRUFBRSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQTtZQUNELE9BQU8sRUFBRSxDQUFPLEdBQXFCLEVBQXlCLEVBQUU7Z0JBQzlELE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDO2dCQUN6QixPQUFPLEVBQUMsRUFBRSxFQUFFLFNBQVMsRUFBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQTtZQUNELE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1NBQ25CLENBQUM7UUFpQkssZUFBVSxHQUFHLEdBQTRCLEVBQUU7WUFDaEQsSUFBRyxDQUFDLENBQUMsTUFBTSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDekIsTUFBTSxFQUFFLGVBQWU7b0JBQ3ZCLE1BQU0sRUFBRSxDQUFDOzRCQUNQLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7eUJBQ2xCLENBQUM7aUJBQ0gsQ0FBQyxDQUFDO2dCQUNILE1BQU0sMEJBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsTUFBTSwwQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLENBQUM7UUFFSyx1QkFBa0IsR0FBRyxHQUFtQyxFQUFFO1lBQy9ELE9BQU87Z0JBQ0wsZ0JBQWdCLEVBQUUsMEJBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDN0MsVUFBVSxFQUFFLG9CQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakMsMEJBQTBCLEVBQUUsb0NBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakUsa0JBQWtCLEVBQUUsNEJBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakQsVUFBVSxFQUFFLG9CQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakMsV0FBVyxFQUFFLGlCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkMsY0FBYyxFQUFFLHdCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDekMsWUFBWSxFQUFFLHNCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxFQUFFLHdCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDL0IsZ0JBQWdCLEVBQUUsMEJBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM5QyxDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUM7UUFqQ0EsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0E4QkY7QUE3RUQsb0RBNkVDIn0=