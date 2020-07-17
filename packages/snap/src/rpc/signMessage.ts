import {Message, SignedMessage, transactionSign} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";

export async function signMessage(wallet: Wallet, message: Message): Promise<SignedMessage> {
    const keypair = await getKeyPair(wallet);
    return transactionSign(message, keypair.privateKey);
}