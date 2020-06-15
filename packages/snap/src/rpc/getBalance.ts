import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";

/**
 * Returns balance as string
 * @param wallet
 * @param api
 * @param address
 */
export async function getBalance(wallet: Wallet, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }

  // return await api.request("WalletBalance", address);
  return "0"
}
