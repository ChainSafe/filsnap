import {Message, SignedMessage, transactionSerialize, transactionSign} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {showConfirmationDialog} from "../util/confirmation";

export async function signMessage(wallet: Wallet, message: Message): Promise<SignedMessage> {
  const keypair = await getKeyPair(wallet);
  const tx = transactionSerialize(message);
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign message ${tx} with account ${keypair.address}?`
  );
  if (confirmation) {
    return transactionSign(message, keypair.privateKey);
  }
  return null;
}