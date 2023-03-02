import { SnapConfig } from "@chainsafe/filsnap-types";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import { MetamaskState } from "../interfaces";
import {
  defaultConfiguration,
  filecoinMainnetConfiguration,
  filecoinTestnetConfiguration,
} from "./predefined";

export function getDefaultConfiguration(networkName?: string): SnapConfig {
  switch (networkName) {
    case "f":
      console.log("Filecoin mainnett network selected");
      return filecoinMainnetConfiguration;
    case "t":
      console.log("Filecoin testnet network selected");
      return filecoinTestnetConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(
  snap: SnapsGlobalObject
): Promise<SnapConfig> {
  const state = (await snap.request({
    method: "snap_manageState",
    params: { operation: "get" },
  })) as MetamaskState;
  if (!state || !state.filecoin.config) {
    return defaultConfiguration;
  }
  return state.filecoin.config;
}
