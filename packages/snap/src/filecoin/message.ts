import {Wallet} from "../interfaces";
import {MessageStatus} from "@nodefactory/filsnap-types";

export function updateMessageInState(wallet: Wallet, message: MessageStatus): void {
  const state = wallet.getPluginState();
  const index = state.filecoin.messages.findIndex(msg => msg.cid === message.cid);
  if (index >= 0) {
    state.filecoin.messages[index] = message;
  } else {
    state.filecoin.messages.push(message);
  }
  wallet.updatePluginState(state);
}
