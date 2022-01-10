import {Wallet} from "../interfaces";

type ConfirmationDialogContent = {
  prompt: string,
  description?: string,
  textAreaContent?: string,
};

export async function showConfirmationDialog(wallet: Wallet, message: ConfirmationDialogContent): Promise<boolean> {
  return await wallet.request({
    method: 'snap_confirm',
    params: [message]
  }) as boolean;
}