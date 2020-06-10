import {EmptyMetamaskState, Wallet} from "./interfaces";
import {FilecoinEventApi} from "@nodefactory/metamask-filecoin-types";
import {getAddress} from "./rpc/getAddress";
import {exportSeed} from "./rpc/exportSeed";
import {getPublicKey} from "./rpc/getPublicKey";
import {getBalance} from "./rpc/getBalance";
// @ts-ignore
import LotusRpcEngine from "@openworklabs/lotus-jsonrpc-engine/dist";
import {defaultConfiguration} from "./configuration/predefined";

declare let wallet: Wallet;

let api: LotusRpcEngine;

wallet.registerApiRequestHandler(async function (origin: URL): Promise<FilecoinEventApi> {
  return {};
});

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  const state = wallet.getPluginState();
  if (!state) {
    // initialize state if empty and set default config
    wallet.updatePluginState(EmptyMetamaskState());
  }

  if (!api) {
    api = new LotusRpcEngine({apiAddress: defaultConfiguration.rpcUrl});
  }

  switch (requestObject.method) {
    case "getBalance":
      return await getBalance(wallet, api);
    case "getAddress":
      return await getAddress(wallet);
    case "getPublicKey":
      return await getPublicKey(wallet);
    case "exportSeed":
      return exportSeed(wallet);
  }
});
