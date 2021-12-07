import {MetamaskState, Wallet} from "../interfaces";
import {MessageStatus} from "@chainsafe/filsnap-types";


export async function getMessages(wallet: Wallet): Promise<MessageStatus[]> {
  const state = await wallet.request({ method: 'snap_manageState', params: ['get'] }) as MetamaskState;
  return state?.filecoin?.messages;
}