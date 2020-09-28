import {hasMetaMask, isMetamaskSnapsSupported, isSnapInstalled} from "./utils";
import {MetamaskFilecoinSnap as MFSnap} from "./snap";
import {SnapConfig} from "@nodefactory/filsnap-types";

const defaultSnapOrigin = "https://bafybeiazeik53jn6p664ex72ryjmshdap2fbylb7tb57dooxp4zvb32uju.ipfs.infura-ipfs.io/";
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

  let snapId = defaultSnapId;
  if (pluginOrigin) {
    snapId = `wallet_plugin_${pluginOrigin}`;
  }

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
  if (!(await isSnapInstalled(snapId))) {
    await window.ethereum.send({
      method: "wallet_enable",
      params: [{
        [snapId]: {}
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