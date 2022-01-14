import {Wallet} from "../interfaces";
import {showConfirmationDialog} from "../util/confirmation";
import {getKeyPair} from "../filecoin/account";

export async function exportPrivateKey(wallet: Wallet): Promise<string|null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    { prompt: 'Do you want to export your private key?' }
  );
  // return private key if user confirmed action
  if (confirmation) {
    const keypair = await getKeyPair(wallet);
    return keypair.privateKey;
  }
  return null;
}
