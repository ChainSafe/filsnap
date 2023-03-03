import { SnapsGlobalObject } from "@metamask/snaps-types";
import { getKeyPair } from "../filecoin/account";

export async function getPublicKey(snap: SnapsGlobalObject): Promise<string> {
  const keyPair = await getKeyPair(snap);
  return keyPair.publicKey;
}
