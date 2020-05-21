import {Wallet} from "../interfaces";
import {getAddress} from "./getAddress";
import {TxPayload} from "@nodefactory/metamask-filecoin-types";

export async function generateTransactionPayload(
  wallet: Wallet, api: any, to: string, amount: string | number
): Promise<TxPayload> {

}