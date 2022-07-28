import { MessageStatus } from "@chainsafe/filsnap-types";
import { SnapProvider } from "@metamask/snap-types";
import { MetamaskState } from "../interfaces";

export async function getMessages(
  wallet: SnapProvider
): Promise<MessageStatus[]> {
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  return state?.filecoin?.messages;
}
