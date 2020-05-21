import {getKeyPair} from "../filecoin/account";
import {Wallet} from "../interfaces";

export async function getPublicKey(wallet: Wallet): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair;
}
