import {EmptyMetamaskState, Wallet} from "./interfaces";

declare let wallet: Wallet;

wallet.registerApiRequestHandler(async function (origin: URL): Promise<{}> {
  return {};
});

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  const state = wallet.getPluginState();
  if (!state) {
    // initialize state if empty and set default config
    wallet.updatePluginState(EmptyMetamaskState());
  }
  // fetch api promise
  // let api;
  switch (requestObject.method) {
  }
});
