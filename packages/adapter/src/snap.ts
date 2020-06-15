import {FilecoinSnapApi} from "@nodefactory/metamask-filecoin-types";
import {configure, exportSeed, getAddress, getPublicKey} from "./methods";

export class MetamaskFilecoinSnap {

  // snap parameters
  protected readonly pluginOrigin: string;
  protected readonly snapId: string;

  public constructor(pluginOrigin: string) {
    this.pluginOrigin = pluginOrigin;
    this.snapId = `wallet_plugin_${this.pluginOrigin}`;
  }

  public getFilecoinSnapApi = async (): Promise<FilecoinSnapApi> => {
    return {
      exportSeed: exportSeed.bind(this),
      getAddress: getAddress.bind(this),
      getPublicKey: getPublicKey.bind(this),
      configure: configure.bind(this)
    };
  };
}