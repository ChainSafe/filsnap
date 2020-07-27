import {SignedMessage} from "@nodefactory/metamask-filecoin-types";
import {Wallet} from "../interfaces";
import {LotusRpcApi, MessageResponse} from "../filecoin/types";
import {updateMessageInState} from "../filecoin/message";
import {transactionSerialize} from "@zondax/filecoin-signing-tools/js";

export async function sendMessage(
  wallet: Wallet, api: LotusRpcApi, signedMessage: SignedMessage
): Promise<MessageResponse> {
  const response = await api.mpoolPush(signedMessage);
  const messageStatus = {
    block: {cid: response["/"]},
    message: signedMessage.message,
    serialized: transactionSerialize(signedMessage.message)
  };
  updateMessageInState(wallet, messageStatus);
  return response;
}