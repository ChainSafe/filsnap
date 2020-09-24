import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";
import {FilecoinNumber} from '@openworklabs/filecoin-number';
import {FilecoinNumberType} from "@nodefactory/filsnap-types";

export async function getBalance(
    wallet: Wallet, api: LotusRpcApi, currency: FilecoinNumberType = "fill"
): Promise<string> {
  const address = (await getKeyPair(wallet)).address;
  return await getBalanceForAddress(wallet, api, currency, address);
}

export async function getBalanceForAddress(
    wallet: Wallet, api: LotusRpcApi, currency: FilecoinNumberType = "fill", address: string
): Promise<string> {
  const balance = await api.walletBalance(address);
  return (new FilecoinNumber(balance, currency)).toFil();
}
