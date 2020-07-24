import {SignedMessage} from "@nodefactory/metamask-filecoin-types";
import {Wallet} from "../interfaces";
import {LotusRpcApi} from "../filecoin/types";

export async function sendMessage(wallet: Wallet, api: LotusRpcApi, signedMessage: SignedMessage): Promise<void> {
  const result = await api.mpoolPush(signedMessage);
  console.log(result);
  return result;
}