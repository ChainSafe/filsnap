import {Wallet} from "../interfaces";
import {Transaction} from "@nodefactory/metamask-filecoin-types";

export function getTransactions(wallet: Wallet): Transaction[] {
    return wallet.getPluginState().filecoin.transactions;
}