import {FilecoinSnapApi} from "@nodefactory/filsnap-types";
import {
  calculateGasForMessage,
  configure,
  exportPrivateKey,
  getAddress,
  getBalance, getMessages,
  getPublicKey, sendMessage,
  signMessage,
  signMessageRaw
} from "./methods";

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
      calculateGasForMessage: calculateGasForMessage.bind(this),
      configure: configure.bind(this),
      exportPrivateKey: exportPrivateKey.bind(this),
      getAddress: getAddress.bind(this),
      getBalance: getBalance.bind(this),
      getMessages: getMessages.bind(this),
      getPublicKey: getPublicKey.bind(this),
      sendMessage: sendMessage.bind(this),
      signMessage: signMessage.bind(this),
      signMessageRaw: signMessageRaw.bind(this),
    };
  };}