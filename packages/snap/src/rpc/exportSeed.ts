import {Wallet} from "../interfaces";
import {showConfirmationDialog} from "../util/confirmation";
import { getConfiguration } from "../configuration";

export async function exportSeed(wallet: Wallet): Promise<{appKey: string; derivationPath: string}|null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    'Do you want to export your seed?'
  );
  // return seed if user confirmed action
  if (confirmation) {
    const derivationPath = getConfiguration(wallet).derivationPath;
    const appKey = await wallet.getAppKey();
    return {
      "appKey": appKey,
      "derivationPath": derivationPath
    };
  }
  return null;
}
