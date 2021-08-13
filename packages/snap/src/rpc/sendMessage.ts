import {MessageStatus, SignedMessage} from "@chainsafe/filsnap-types";
import {Wallet} from "../interfaces";
import {LotusRpcApi} from "../filecoin/types";
import {updateMessageInState} from "../filecoin/message";

export async function sendMessage(
  wallet: Wallet, api: LotusRpcApi, signedMessage: SignedMessage
): Promise<MessageStatus> {
  const response = await api.mpoolPush(signedMessage);
  const messageStatus = {
    cid: response["/"],
    message: signedMessage.message
  };
  updateMessageInState(wallet, messageStatus);
  return messageStatus;
}