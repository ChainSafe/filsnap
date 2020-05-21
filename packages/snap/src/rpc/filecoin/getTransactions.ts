import {Wallet} from "../../interfaces";
import axios from "axios";
import {getAddress} from "../getAddress";

const API_PATH = "";

/**
 * Query *** api for historic data about transactions for address.
 * @param wallet
 * @param address
 */
export async function getTransactions(wallet: Wallet, address?: string): Promise<unknown> {
  return null;
}
