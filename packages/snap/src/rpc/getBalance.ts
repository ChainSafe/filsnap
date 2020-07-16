import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";
import {convertToFIL} from "../util/format";

/**
 * Returns balance as string
 * @param wallet
 * @param api
 * @param address
 */
export async function getBalance(wallet: Wallet, api: LotusRpcApi, address?: string): Promise<string> {
  if(!address) {
    address = (await getKeyPair(wallet)).address;
  }
  const balanceResult = await api.walletBalance(address);
  return balanceResult ? convertToFIL(balanceResult) : balanceResult;
}
