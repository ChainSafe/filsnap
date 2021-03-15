import {Wallet} from "../interfaces";

export async function showConfirmationDialog(wallet: Wallet, message: string): Promise<boolean> {
  return await wallet.request({
    method: 'snap_confirm',
    params: [message]
  }) as boolean;
}