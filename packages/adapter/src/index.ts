import {hasMetaMask, isMetamaskSnapsSupported, isSnapInstalled} from "./utils";
import {MetamaskFilecoinSnap as MFSnap} from "./snap";

const defaultSnapOrigin = "http://localhost:8081/package.json";
const defaultSnapId = `wallet_plugin_${defaultSnapOrigin}`;

export type MetamaskFilecoinSnap = MFSnap;

export {hasMetaMask, isMetamaskSnapsSupported} from "./utils";

export async function enableFilecoinSnap(pluginOrigin?: string): Promise<MetamaskFilecoinSnap> {
  if (!hasMetaMask()) {
    throw new Error("Metamask is not installed");
  }

  if (!await isMetamaskSnapsSupported()) {
    throw new Error("Current Metamask version doesn't support snaps");
  }

  // enable snap
  if (!(await isSnapInstalled(defaultSnapId))) {
    await window.ethereum.send({
      method: "wallet_enable",
      params: [{
        [defaultSnapId]: {}
      }]
    });
  }

  // TODO configure snap with initial configuration

  // return snap object
  return new MFSnap(
    pluginOrigin || defaultSnapOrigin
  );
}