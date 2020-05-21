import ApiPromise from "@polkadot/api/promise";
import {WsProvider} from "@polkadot/api";
import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration";
import U8aFixed from "@polkadot/types/codec/U8aFixed";

let api: ApiPromise;
let provider: WsProvider;
let isConnecting: boolean;

/**
 * Initialize substrate api and awaits for it to be ready
 */
async function initApi(wsRpcUrl: string): Promise<ApiPromise> {
  provider = new WsProvider(wsRpcUrl);
  let api = new ApiPromise({
    initWasm: false,
    provider,
    types: {
      //tmp fix until we figure out how to update polkadot api lib
      ModuleId: U8aFixed,
      RuntimeDbWeight: {
        read: 'Weight',
        write: 'Weight'
      }
    }
  });
  try {
    api = await api.isReady;
  } catch (e) {
    console.log("Api is ready with error:", e);
  }
  return api;
}

export const resetApi = (): void => {
  if (api && provider) {
    try {
      api.disconnect();
      provider.disconnect();
    } catch (e) {

    }
    api = null;
    provider = null;
  }
};

export const getApi = async (wallet: Wallet): Promise<ApiPromise> => {
  if (!api) {
    // api not initialized or configuration changed
    const config = getConfiguration(wallet);
    api = await initApi(config.wsRpcUrl);
    isConnecting = false;
  } else {
    while (isConnecting) {
      await new Promise(r => setTimeout(r, 100));
    }
    if (!provider.isConnected()) {
      isConnecting = true;
      await provider.connect();
      isConnecting = false;
    }
  }
  return api;
};
