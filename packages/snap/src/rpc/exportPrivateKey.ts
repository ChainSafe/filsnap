import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../filecoin/account";
import { showConfirmationDialog } from "../util/confirmation";

export async function exportPrivateKey(
  wallet: SnapProvider
): Promise<string | null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(wallet, {
    prompt: "Do you want to export your private key?",
  });
  // return private key if user confirmed action
  if (confirmation) {
    const keypair = await getKeyPair(wallet);
    return keypair.privateKey;
  }
  return null;
}
