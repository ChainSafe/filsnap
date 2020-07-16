import {EmptyMetamaskState, Wallet} from "./interfaces";
import {FilecoinEventApi} from "@nodefactory/metamask-filecoin-types";
import {getAddress} from "./rpc/getAddress";
import {exportPrivateKey} from "./rpc/exportPrivateKey";
import {getPublicKey} from "./rpc/getPublicKey";
import {getApi} from "./filecoin/api";
import {LotusRpcApi} from "./filecoin/types";
import {getBalance} from "./rpc/getBalance";
import {configure} from "./rpc/configure";
import {updateAsset} from "./asset";
import {getTransactions} from "./rpc/getTransactions";
import {convertToFIL} from "./util/format";

declare let wallet: Wallet;

const apiDependentMethods = [
  "getBalance", "configure"
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
      await updateAsset(wallet, originString, convertToFIL(await getBalance(wallet, api)));
      return configuration;
    case "getAddress":
      return await getAddress(wallet);
    case "getPublicKey":
      return await getPublicKey(wallet);
    case "exportPrivateKey":
      return exportPrivateKey(wallet);
    case "getBalance":
      const balance = await getBalance(wallet, api);
      await updateAsset(wallet, originString, balance);
      return balance;
    case "getTransactions":
      return getTransactions(wallet);
    default:
      throw new Error("Unsupported RPC method");
  }
});
