import {Wallet} from "../interfaces";
import {MessageStatus} from "@chainsafe/filsnap-types";

export function getMessages(wallet: Wallet): MessageStatus[] {
  return wallet.getPluginState().filecoin.messages;
}