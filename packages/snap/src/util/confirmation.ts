import {Wallet} from "../interfaces";

export async function showConfirmationDialog(wallet: Wallet, message: string): Promise<boolean> {
  return await wallet.request({
    method: 'confirm',
    params: [message]
  }) as boolean;
}