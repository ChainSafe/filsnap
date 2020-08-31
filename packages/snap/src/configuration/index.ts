import {Wallet} from "../interfaces";
import {
  defaultConfiguration,
  filecoinDevnetConfiguration,
  filecoinMainnetConfiguration,
  filecoinTestnetConfiguration
} from "./predefined";
import {SnapConfig} from "@nodefactory/filsnap-types";

export function getDefaultConfiguration(networkName?: string): SnapConfig {
  switch (networkName) {
    case "f":
      console.log("Filecoin mainnett network selected");
      return filecoinMainnetConfiguration;
    case "t":
      console.log("Filecoin testnet network selected");
      return filecoinTestnetConfiguration;
    case "d":
      console.log("Filecoin devnet network selected");
      return filecoinDevnetConfiguration;
    default:
      return defaultConfiguration;
  }
}

export function getConfiguration(wallet: Wallet): SnapConfig {
  const state = wallet.getPluginState();
  if (!state || !state.filecoin.config) {
    return defaultConfiguration;
  }
  return state.filecoin.config;
}
