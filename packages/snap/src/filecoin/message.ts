import {Wallet} from "../interfaces";
import {MessageStatus} from "@nodefactory/metamask-filecoin-types";

export function updateMessageInState(wallet: Wallet, message: MessageStatus): void {
  const state = wallet.getPluginState();
  const index = state.filecoin.messages.findIndex(msg => msg.serialized === message.serialized);
  if (index >= 0) {
    state.filecoin.messages[index] = message;
  } else {
    state.filecoin.messages.push(message);
  }
  wallet.updatePluginState(state);
}
