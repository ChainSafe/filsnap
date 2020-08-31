import {Wallet} from "../interfaces";
import deepmerge from "deepmerge";
import {getDefaultConfiguration} from "../configuration";
import {SnapConfig} from "@nodefactory/filsnap-types";

export function configure(wallet: Wallet, networkName: string, overrides?: unknown): SnapConfig {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = overrides ? deepmerge(defaultConfig, overrides) : defaultConfig;
  configuration.network = networkName === "d" ? "t" : configuration.network;
  const state = wallet.getPluginState();
  state.filecoin.config = configuration;
  wallet.updatePluginState(state);
  return configuration;
}
