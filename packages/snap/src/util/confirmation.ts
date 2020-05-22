import {Wallet} from "../interfaces";

export async function showConfirmationDialog(wallet: Wallet, message: string): Promise<boolean> {
  return await wallet.send({
    method: 'confirm',
    params: [message]
  }) as boolean;
}