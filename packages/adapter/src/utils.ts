export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

async function getWalletPlugins(): Promise<{ [k: string]: { permissionName: string } }> {
  return await window.ethereum.send({
    method: 'wallet_getPlugins',
  }) as { [k: string]: { permissionName: string } };
}

export async function isMetamaskSnapsSupported(): Promise<boolean> {
  try {
    await getWalletPlugins();
    return true;
  } catch (e) {
    return false;
  }
}

export async function isSnapInstalled(pluginOrigin: string): Promise<boolean> {
  try {
    return !!Object
      .values(await getWalletPlugins())
      .find((permission) => permission.permissionName === pluginOrigin);
  } catch (e) {
    console.log("Failed to obtain installed plugins", e);
    return false;
  }
}