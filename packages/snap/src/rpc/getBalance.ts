import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";
import {FilecoinDenomination, FilecoinNumber} from '@openworklabs/filecoin-number';

export async function getBalanceForAddress(
  wallet: Wallet, api: LotusRpcApi, denomination: FilecoinDenomination = "fil", address: string
): Promise<string> {
  const balance = await api.walletBalance(address);
  const attoFilBalance = new FilecoinNumber(balance, "attofil");
  return denomination === "fil" ? attoFilBalance.toFil() : attoFilBalance.toAttoFil();
}

export async function getBalance(
  wallet: Wallet, api: LotusRpcApi, denomination: FilecoinDenomination = "fil"
): Promise<string> {
  const address = (await getKeyPair(wallet)).address;
  return await getBalanceForAddress(wallet, api, denomination, address);
}


