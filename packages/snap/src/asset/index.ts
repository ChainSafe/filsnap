import {FilecoinNetwork, SnapConfig} from "@nodefactory/filsnap-types";
import {Asset, Wallet} from "../interfaces";
import {executeAssetOperation} from "./action";
import {getConfiguration} from "../configuration";
import {getAddress} from "../rpc/getAddress";

export const FILECOIN_SNAP_ASSET_IDENTIFIER = "filecoin-snap-asset";

function formatBalance(balance: number|string, _decimals: number): string {
  return balance as string;
}

export function getFilecoinAssetDescription(
  balance: number|string, address: string, configuration: SnapConfig
): Asset {
  return {
    balance: formatBalance(balance, configuration.unit.decimals),
    customViewUrl: configuration.unit.customViewUrl ||
            `https://filscan.io/#/tipset/address-detail?address=${address}`,
    decimals: 0,
    identifier: FILECOIN_SNAP_ASSET_IDENTIFIER,
    image: configuration.unit.image || "",
    network: configuration.network,
    symbol: configuration.unit.symbol,
  };
}

const assetIds: { [K in FilecoinNetwork]: string | null } = {
  'f': null,
  't': null,
};
let didCacheResources = false;

async function cacheInitialResources(wallet: Wallet): Promise<void> {
  const resources: Asset[] = await wallet.request({
    method: 'snap_manageAssets',
    params: ['getAll']
  }) as Asset[];
  resources.forEach((asset) => {
    assetIds[asset.network] = asset.id;
  });
  didCacheResources = true;
}

const previousAsset: { balance: string | number | null; network: FilecoinNetwork | null } = {
  balance: null,
  network: null,
};

export async function updateAsset(
  wallet: Wallet, _origin: string, balance: number|string
): Promise<void> {
  if (!didCacheResources) {
    await cacheInitialResources(wallet);
  }

  const configuration = await getConfiguration(wallet);
  const asset = getFilecoinAssetDescription(balance, await getAddress(wallet), configuration);
  const currentNetwork = configuration.network;
  const currentAssetId = assetIds[currentNetwork];

  if (currentAssetId && (previousAsset.network !== currentNetwork || previousAsset.balance !== asset.balance)) {
    // update if balance or network changed
    asset.id = currentAssetId;
    await executeAssetOperation(asset, wallet, "update");
  } else if (!currentAssetId) {
    // create filecoin snap asset
    const newAsset = await executeAssetOperation(asset, wallet, "add");
    assetIds[currentNetwork] = newAsset.id as string;
  }
}
