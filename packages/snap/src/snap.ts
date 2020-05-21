import {EmptyMetamaskState, Wallet} from "./interfaces";
import {FilecoinApi} from "@nodefactory/metamask-filecoin-types";

declare let wallet: Wallet;

const apiDependentMethods = [
  "getBlock", "getBalance", "getChainHead", "signPayloadJSON", "signPayloadRaw", "generateTransactionPayload", "send"
];

wallet.registerApiRequestHandler(async function (origin: URL): Promise<FilecoinApi> {
  return {}
});

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  const state = wallet.getPluginState();
  if (!state) {
    // initialize state if empty and set default config
    wallet.updatePluginState(EmptyMetamaskState());
  }
  // fetch api promise
  let api: any = null;
  switch (requestObject.method) {
  }
});