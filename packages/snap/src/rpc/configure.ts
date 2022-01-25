import {MetamaskState, Wallet} from "../interfaces";
import deepmerge from "deepmerge";
import {getDefaultConfiguration} from "../configuration";
import {SnapConfig} from "@chainsafe/filsnap-types";
import {LotusRpcApi} from "../filecoin/types";
import {getApiFromConfig} from "../filecoin/api";

export interface ConfigureResponse {
  api: LotusRpcApi,
  snapConfig: SnapConfig
}

export async function configure(wallet: Wallet, networkName: string, overrides?: unknown): Promise<ConfigureResponse> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = overrides ? deepmerge(defaultConfig, overrides) : defaultConfig;
  const [, , coinType, , , ] = configuration.derivationPath.split('/');
  const bip44Code = coinType.replace("\'", "");
  // instatiate new api
  const api = await getApiFromConfig(configuration);
  const apiNetworkName = await api.stateNetworkName();
  // check if derivation path is valid
  if (configuration.network == "f" && apiNetworkName == "mainnet") {
    // if on mainet, coin type needs to be 461
    if(bip44Code != '461') {
      throw new Error("Wrong CoinType in derivation path");
    }
  } else if (configuration.network == "t" && apiNetworkName != "mainnet") {
    if(bip44Code != '1') {
      throw new Error("Wrong CoinType in derivation path");
    }
  } else {
    throw new Error("Mismatch between configured network and network provided by RPC");
  }
  const state = await wallet.request({ method: 'snap_manageState', params: ['get'] }) as MetamaskState;
  state.filecoin.config = configuration;
  wallet.request({
    method: 'snap_manageState',
    params: ['update', state],
  });
  return {api: api, snapConfig: configuration};
}
