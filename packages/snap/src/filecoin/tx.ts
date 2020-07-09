import {Wallet} from "../interfaces";
import {Transaction} from "@nodefactory/metamask-filecoin-types";

export function updateTxInState(wallet: Wallet, transaction: Transaction): void {
    const state = wallet.getPluginState();
    const index = state.filecoin.transactions.findIndex(tx => tx.hash === transaction.hash);
    if (index >= 0) {
        state.filecoin.transactions[index] = transaction;
    } else {
        state.filecoin.transactions.push(transaction);
    }
    wallet.updatePluginState(state);
}
