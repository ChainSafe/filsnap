import {MetamaskState, Wallet} from "../interfaces";
import deepmerge from "deepmerge";
import {getDefaultConfiguration} from "../configuration";
import {SnapConfig} from "@chainsafe/filsnap-types";

export async function configure(wallet: Wallet, networkName: string, overrides?: unknown): Promise<SnapConfig> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = overrides ? deepmerge(defaultConfig, overrides) : defaultConfig;
  const state = await wallet.request({ method: 'snap_manageState', params: ['get'] }) as MetamaskState;
  state.filecoin.config = configuration;
  wallet.request({
    method: 'snap_manageState',
    params: ['update', state],
  });
  return configuration;
}
