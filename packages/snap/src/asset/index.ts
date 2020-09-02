import {FilecoinNetwork, SnapConfig} from "@nodefactory/filsnap-types";
import {Asset, Wallet} from "../interfaces";
import {executeAssetOperation} from "./action";
import {getConfiguration} from "../configuration";
import {getAddress} from "../rpc/getAddress";

export const FILECOIN_SNAP_ASSET_IDENTIFIER = "filecoin-snap-asset";

function formatBalance(balance: number|string, decimals: number): string {
  return balance as string;
}

export function getFilecoinAssetDescription(
  balance: number|string, address: string, configuration: SnapConfig
): Asset {
  return {
    balance: formatBalance(balance, configuration.unit.decimals),
    customViewUrl: configuration.unit.customViewUrl ||
            `https://filscan.io/#/address/detail?address=${address}`,
    decimals: 0,
    identifier: FILECOIN_SNAP_ASSET_IDENTIFIER,
    image: configuration.unit.image || "",
    symbol: configuration.unit.symbol,
  };
}

let assetState: { balance: string | number; network: FilecoinNetwork};

export async function updateAsset(
  wallet: Wallet, origin: string, balance: number|string
): Promise<void> {
  const configuration = getConfiguration(wallet);
  const asset = getFilecoinAssetDescription(balance, await getAddress(wallet), configuration);
  if (!assetState) {
    // create filecoin snap asset
    await executeAssetOperation(asset, wallet, "add");
  } else if (assetState.balance !== asset.balance || assetState.network !== configuration.network) {
    // update if balance or network changed
    await executeAssetOperation(asset, wallet, "update");
  }
  assetState = {balance: asset.balance, network: configuration.network};
}


