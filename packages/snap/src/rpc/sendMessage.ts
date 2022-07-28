import { MessageStatus, SignedMessage } from "@chainsafe/filsnap-types";
import { SnapProvider } from "@metamask/snap-types";
import { updateMessageInState } from "../filecoin/message";
import { LotusRpcApi } from "../filecoin/types";

export async function sendMessage(
  wallet: SnapProvider,
  api: LotusRpcApi,
  signedMessage: SignedMessage
): Promise<MessageStatus> {
  const response = await api.mpoolPush(signedMessage);
  const messageStatus = {
    cid: response["/"],
    message: signedMessage.message,
  };
  await updateMessageInState(wallet, messageStatus);
  return messageStatus;
}
