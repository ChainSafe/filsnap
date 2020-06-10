import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import LotusRpcEngine from "@openworklabs/lotus-jsonrpc-engine";

/**
 * Returns balance as string
 * @param wallet
 * @param api
 * @param address
 */
export async function getBalance(wallet: Wallet, api: LotusRpcEngine, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }

  const result = await api.request("WalletBalance", address);
  console.log("BALANCE RESULT");
  console.log(result);

  return result
}
