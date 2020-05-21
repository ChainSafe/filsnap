import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";

export async function getAddress(wallet: Wallet): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair.address;
}