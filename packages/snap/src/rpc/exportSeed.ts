import {Wallet} from "../interfaces";
import {showConfirmationDialog} from "../util/confirmation";

export async function exportSeed(wallet: Wallet): Promise<string|null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    'Do you want to export your seed?'
  );
  // return seed if user confirmed action
  if (confirmation) {
    const appKey = await wallet.getAppKey();
    return appKey.substr(0, 32);
  }
  return null;
}