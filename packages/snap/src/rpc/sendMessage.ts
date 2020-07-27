import {SignedMessage} from "@nodefactory/metamask-filecoin-types";
import {Wallet} from "../interfaces";
import {LotusRpcApi, MessageResponse} from "../filecoin/types";

export async function sendMessage(
  wallet: Wallet, api: LotusRpcApi, signedMessage: SignedMessage
): Promise<MessageResponse> {
  return await api.mpoolPush(signedMessage);
}