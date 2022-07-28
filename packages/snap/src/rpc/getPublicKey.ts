import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../filecoin/account";

export async function getPublicKey(wallet: SnapProvider): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair.publicKey;
}
