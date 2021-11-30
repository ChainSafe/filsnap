export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

async function getWalletSnaps(): Promise<{ [k: string]: { permissionName: string } }> {
  return await window.ethereum.request({
    method: 'wallet_getSnaps',
  }) as { [k: string]: { permissionName: string } };
}

export async function isMetamaskSnapsSupported(): Promise<boolean> {
  try {
    await getWalletSnaps();
    return true;
  } catch (e) {
    return false;
  }
}

export async function isSnapInstalled(snapOrigin: string): Promise<boolean> {
  try {
    return !!Object
      .values(await getWalletSnaps())
      .find((permission) => permission.permissionName === snapOrigin);
  } catch (e) {
    console.log("Failed to obtain installed snaps", e);
    return false;
  }
}