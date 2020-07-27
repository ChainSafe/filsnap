import {Wallet} from "../interfaces";
import {MessageStatus} from "@nodefactory/metamask-filecoin-types";

export function getMessages(wallet: Wallet): MessageStatus[] {
  return wallet.getPluginState().filecoin.messages;
}