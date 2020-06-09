import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";

export async function getPublicKey(wallet: Wallet): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair.publicKey;
}