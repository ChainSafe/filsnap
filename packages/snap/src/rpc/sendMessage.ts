import { MessageStatus, SignedMessage } from "@chainsafe/filsnap-types";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import { updateMessageInState } from "../filecoin/message";
import { LotusRpcApi } from "../filecoin/types";

export async function sendMessage(
  snap: SnapsGlobalObject,
  api: LotusRpcApi,
  signedMessage: SignedMessage
): Promise<MessageStatus> {
  const response = await api.mpoolPush(signedMessage);
  const messageStatus = {
    cid: response["/"],
    message: signedMessage.message,
  };
  await updateMessageInState(snap, messageStatus);
  return messageStatus;
}
