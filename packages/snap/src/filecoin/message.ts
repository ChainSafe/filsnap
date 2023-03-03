import { MessageStatus } from "@chainsafe/filsnap-types";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import { MetamaskState } from "../interfaces";

export async function updateMessageInState(
  snap: SnapsGlobalObject,
  message: MessageStatus
): Promise<void> {
  const state = (await snap.request({
    method: "snap_manageState",
    params: { operation: "get" },
  })) as MetamaskState;
  const index = state.filecoin.messages.findIndex(
    (msg) => msg.cid === message.cid
  );
  if (index >= 0) {
    state.filecoin.messages[index] = message;
  } else {
    state.filecoin.messages.push(message);
  }
  await snap.request({
    method: "snap_manageState",
    params: { newState: state, operation: "update" },
  });
}
