import {Asset, Wallet} from "../interfaces";
import {getAddress} from "../rpc/getAddress";
import {executeAssetOperation} from "./action";
import formatBalance from "@polkadot/util/format/formatBalance";
import {Balance} from "@polkadot/types/interfaces";
import {getConfiguration} from "../configuration";
import {SnapConfig} from "@nodefactory/metamask-polkadot-types";

const assets: Map<string, Asset> = new Map<string, Asset>();

function getIdentifier(origin: string, id: string): string {
  return `${origin}_${id}`;
}

export function getPolkadotAssetDescription(
  balance: number|string|Balance, address: string, configuration: SnapConfig
): Asset {
  return {
    balance: formatBalance(balance, {decimals: configuration.unit.decimals, withSi: true, withUnit: false}),
    customViewUrl: configuration.unit.customViewUrl ||
        `https://polkascan.io/pre/${configuration.networkName}/account/${address}`,
    decimals: 0,
    identifier: configuration.unit.assetId,
    image: configuration.unit.image || "",
    symbol: configuration.unit.symbol,
  };
}

export async function removeAsset(wallet: Wallet, origin: string): Promise<boolean> {
  const configuration = getConfiguration(wallet);
  const assetId = configuration.unit.assetId;
  await executeAssetOperation({identifier: assetId}, wallet, "remove");
  assets.delete(getIdentifier(origin, assetId));
  return true;
}

export async function updateAsset(
  wallet: Wallet, origin: string, balance: number|string|Balance
): Promise<boolean> {
  const configuration = getConfiguration(wallet);
  const assetId = configuration.unit.assetId;
  console.log("Updating asset", origin, assetId);
  if(assets.has(getIdentifier(origin, assetId))) {
    const asset = assets.get(getIdentifier(origin, assetId));
    asset.balance = formatBalance(balance, {decimals: 12, withSi: true, withUnit: false});
    await executeAssetOperation(asset, wallet, "update");
  } else {
    const asset = getPolkadotAssetDescription(0, await getAddress(wallet), configuration);
    await removeAsset(wallet, origin);
    await executeAssetOperation(asset, wallet, "add");
    assets.set(getIdentifier(origin, assetId), asset);
  }
  return true;
}