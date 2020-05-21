import {Wallet} from "../interfaces";
import {defaultConfiguration, kusamaConfiguration, westendConfiguration} from "./predefined";
import {SnapConfig} from "@nodefactory/metamask-polkadot-types";

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case "kusama":
      console.log("Kusama configuration selected");
      return kusamaConfiguration;
    case "westend":
      console.log("Westend configuration selected");
      return westendConfiguration;
    default:
      return defaultConfiguration;
  }
}

export function getConfiguration(wallet: Wallet): SnapConfig {
  const state = wallet.getPluginState();
  if (!state || !state.polkadot.config) {
    return defaultConfiguration;
  }
  return state.polkadot.config;
}