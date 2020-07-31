import {hasMetaMask, isMetamaskSnapsSupported, isSnapInstalled} from "./utils";
import {MetamaskFilecoinSnap as MFSnap} from "./snap";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

const defaultSnapOrigin = "http://localhost:8081/package.json";
const defaultSnapId = `wallet_plugin_${defaultSnapOrigin}`;

export type MetamaskFilecoinSnap = MFSnap;

export {hasMetaMask, isMetamaskSnapsSupported} from "./utils";

/**
 * Install and enable Filecoin snap
 *
 * Checks for existence of Metamask and version compatibility with snaps before installation.
 *
 * Provided snap configuration must define at least network property so predefined configuration can be selected.
 * All other properties are optional, and if present will overwrite predefined property.
 *
 * @param config - SnapConfig
 * @param pluginOrigin
 *
 * @return MetamaskFilecoinSnap - adapter object that exposes snap API
 */
export async function enableFilecoinSnap(
  config: Partial<SnapConfig>, pluginOrigin?: string
): Promise<MetamaskFilecoinSnap> {

  // check all conditions
  if (!hasMetaMask()) {
    throw new Error("Metamask is not installed");
  }
  if (!await isMetamaskSnapsSupported()) {
    throw new Error("Current Metamask version doesn't support snaps");
  }
  if (!config.network) {
    throw new Error("Configuration must at least define network type");
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

  // create snap describer
  const snap = new MFSnap(
    pluginOrigin || defaultSnapOrigin
  );
  // set initial configuration
  await (await snap.getFilecoinSnapApi()).configure(config);
  // return snap object
  return snap;
}