import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";

export async function getBalance(wallet: Wallet, api: LotusRpcApi, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }
  return await api.walletBalance(address);
}
