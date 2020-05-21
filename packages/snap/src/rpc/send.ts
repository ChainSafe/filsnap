import {Wallet} from "../interfaces";
import {TxPayload} from "@nodefactory/metamask-filecoin-types";
import {getAddress} from "./getAddress";

export async function send(wallet: Wallet, api: any, signature: string, txPayload: TxPayload): Promise<string> {
  return '';
}
