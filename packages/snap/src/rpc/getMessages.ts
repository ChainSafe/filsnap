import {Wallet} from "../interfaces";
import {MessageStatus} from "@nodefactory/filsnap-types";

export function getMessages(wallet: Wallet): MessageStatus[] {
  return wallet.getPluginState().filecoin.messages;
}