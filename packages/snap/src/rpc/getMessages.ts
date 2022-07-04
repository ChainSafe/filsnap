import { MessageStatus } from "@chainsafe/filsnap-types";
import { MetamaskState, Wallet } from "../interfaces";

export async function getMessages(wallet: Wallet): Promise<MessageStatus[]> {
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  return state?.filecoin?.messages;
}
