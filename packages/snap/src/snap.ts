import {EmptyMetamaskState, Wallet} from "./interfaces";
import {FilecoinEventApi} from "@nodefactory/metamask-filecoin-types";
import {getAddress} from "./rpc/getAddress";
import {exportSeed} from "./rpc/exportSeed";
import {getPublicKey} from "./rpc/getPublicKey";
import {getApi} from "./filecoin/api";
import {LotusRpcApi} from "./filecoin/types";
import {getBalance} from "./rpc/getBalance";
import {configure} from "./rpc/configure";
import {updateAsset} from "./asset";

declare let wallet: Wallet;

const apiDependentMethods = [
  "getBalance"
];

wallet.registerApiRequestHandler(async function (origin: URL): Promise<FilecoinEventApi> {
  return {};
});

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  const state = wallet.getPluginState();
  if (!state) {
    // initialize state if empty and set default config
    wallet.updatePluginState(EmptyMetamaskState());
  }

  let api: LotusRpcApi;
  // initialize lotus RPC api if needed
  if (apiDependentMethods.indexOf(requestObject.method) >= 0) {
    api = getApi(wallet);
  }

  switch (requestObject.method) {
    case "configure":
      const configuration = configure(
        wallet, requestObject.params.configuration.network, requestObject.params.configuration
      );
      // TODO getBalance
      await updateAsset(wallet, originString, "0");
      return configuration;
    case "getAddress":
      return await getAddress(wallet);
    case "getPublicKey":
      return await getPublicKey(wallet);
    case "exportSeed":
      return exportSeed(wallet);
    case "getBalance":
      return getBalance(wallet, api);
    default:
      throw new Error("Unsupported RPC method");
  }
});
