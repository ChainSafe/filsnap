import { SnapConfig } from "@chainsafe/filsnap-types";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import deepmerge from "deepmerge";
import { getDefaultConfiguration } from "../configuration";
import { getApiFromConfig } from "../filecoin/api";
import { LotusRpcApi } from "../filecoin/types";
import { MetamaskState } from "../interfaces";

export interface ConfigureResponse {
  api: LotusRpcApi;
  snapConfig: SnapConfig;
}

export async function configure(
  snap: SnapsGlobalObject,
  networkName: string,
  overrides?: unknown
): Promise<ConfigureResponse> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = overrides
    ? deepmerge(defaultConfig, overrides)
    : defaultConfig;
  const [, , coinType, , ,] = configuration.derivationPath.split("/");
  const bip44Code = coinType.replace("'", "");
  // instatiate new api
  const api = await getApiFromConfig(configuration);
  const apiNetworkName = await api.stateNetworkName();
  // check if derivation path is valid
  if (configuration.network == "f" && apiNetworkName == "mainnet") {
    // if on mainet, coin type needs to be 461
    if (bip44Code != "461") {
      throw new Error("Wrong CoinType in derivation path");
    }
  } else if (configuration.network == "t" && apiNetworkName != "mainnet") {
    if (bip44Code != "1") {
      throw new Error("Wrong CoinType in derivation path");
    }
  } else {
    throw new Error(
      "Mismatch between configured network and network provided by RPC"
    );
  }
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  }) as MetamaskState;
  state.filecoin.config = configuration;
  await snap.request({
    method: 'snap_manageState',
    params: { newState: state, operation: 'update' },
  });
  return { api: api, snapConfig: configuration };
}
