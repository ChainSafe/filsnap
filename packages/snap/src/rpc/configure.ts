import {Wallet} from "../interfaces";
import deepmerge from "deepmerge";
import {getDefaultConfiguration} from "../configuration";
import {SnapConfig} from "@nodefactory/metamask-polkadot-types";

export function configure(wallet: Wallet, networkName: string, overrides: unknown): SnapConfig {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = deepmerge(defaultConfig, overrides);
  const state = wallet.getPluginState();
  state.polkadot.config = configuration;
  wallet.updatePluginState(state);
  return configuration;
}