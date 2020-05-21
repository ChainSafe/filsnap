import {Asset, Wallet} from "../interfaces";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

const assets: Map<string, Asset> = new Map<string, Asset>();

function getIdentifier(origin: string, id: string): string {
  return `${origin}_${id}`;
}

export function getFilecoinAssetDescription(
  balance: number|string|Balance, address: string, configuration: SnapConfig
): Asset {
  return {
    balance: balance,
    customViewUrl: configuration.unit.customViewUrl,
    decimals: 0,
    identifier: configuration.unit.assetId,
    image: configuration.unit.image || "",
    symbol: configuration.unit.symbol,
  };
}

export async function removeAsset(wallet: Wallet, origin: string): Promise<boolean> {
  return true;
}

export async function updateAsset(
  wallet: Wallet, origin: string, balance: number|string|Balance
): Promise<boolean> {
  return true;
}