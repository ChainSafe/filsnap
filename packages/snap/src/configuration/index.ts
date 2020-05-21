import {Wallet} from "../interfaces";
import {defaultConfiguration} from "./predefined";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

export function getDefaultConfiguration(networkName: string): SnapConfig {
    return defaultConfiguration;
}

export function getConfiguration(wallet: Wallet): SnapConfig {
  const state = wallet.getPluginState();
  if (!state || !state.filecoin.config) {
    return defaultConfiguration;
  }
  return state.filecoin.config;
}