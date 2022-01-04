import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";
import {FilecoinNumber} from '@glif/filecoin-number/dist';

export async function getBalance(wallet: Wallet, api: LotusRpcApi, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }
  const balance = await api.walletBalance(address);
  return (new FilecoinNumber(balance, 'attofil')).toFil();
}
