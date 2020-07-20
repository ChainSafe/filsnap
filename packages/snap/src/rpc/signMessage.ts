import {Message, SignedMessage, transactionSign} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {showConfirmationDialog} from "../util/confirmation";

export async function signMessage(wallet: Wallet, message: Message): Promise<SignedMessage> {
  const keypair = await getKeyPair(wallet);
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign message\n\n` +
    `from: ${message.from}\n`+
    `to: ${message.to}\n`+
    `value:${message.value}\n`+
    `gas price:${message.gasprice}\n\n` +
    `with account ${keypair.address}?`
  );
  if (confirmation) {
    return transactionSign(message, keypair.privateKey);
  }
  return null;
}