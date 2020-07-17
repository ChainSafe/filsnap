import {Message, SignedMessage, transactionSign} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {showConfirmationDialog} from "../util/confirmation";

export async function signMessage(wallet: Wallet, message: Message): Promise<SignedMessage> {
  const confirmation =
      await showConfirmationDialog(wallet, "Do you want to sign message with your private key?");
  if (confirmation) {
    const keypair = await getKeyPair(wallet);
    return transactionSign(message, keypair.privateKey);
  }
  return null;
}