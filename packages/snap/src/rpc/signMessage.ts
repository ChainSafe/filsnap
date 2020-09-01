import {Message, SignedMessage, transactionSign, transactionSignRaw} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {showConfirmationDialog} from "../util/confirmation";
import {LotusRpcApi} from "../filecoin/types";
import {MessageRequest} from "@nodefactory/filsnap-types";

export async function signMessage(
  wallet: Wallet, api: LotusRpcApi, messageRequest: MessageRequest
): Promise<SignedMessage> {
  const keypair = await getKeyPair(wallet);
  let message: Message = {
    ...messageRequest,
    from: keypair.address,
    gaslimit: 0,
    gasfeecap: "0",
    gaspremium: "0",
    method: 0, // code for basic transaction
    nonce: Number(await api.mpoolGetNonce(keypair.address))
  };
  // estimate gas usage
  message.gaslimit = await api.gasEstimateGasLimit(message, null);
  const messageEstimate = await api.gasEstimateMessageGas(message, {MaxFee: "0"}, null);
  message.gaspremium = messageEstimate.GasPremium;
  message.gasfeecap = messageEstimate.GasFeeCap;
  // show confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign message\n\n` +
    `from: ${message.from}\n`+
    `to: ${message.to}\n`+
    `value:${message.value}\n`+
    `gas limit:${message.gaslimit}\n`+
    `gas fee cap:${message.gasfeecap}\n` +
    `gas premium: ${message.gaspremium}\n`+
    `with account ${keypair.address}?`
  );
  if (confirmation) {
    console.log("---------------------");
    console.log(typeof message);
    console.log(message);
    console.log("---------------------");
    console.log(keypair.privateKey);
    console.log("---------------------");
    return transactionSign(message, keypair.privateKey);
  }
  return null;
}

export async function signMessageRaw(wallet: Wallet, rawMessage: string): Promise<string> {
  const keypair = await getKeyPair(wallet);
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign message\n\n` +
      `${rawMessage}\n\n`+
      `with account ${keypair.address}?`
  );
  if (confirmation) {
    return transactionSignRaw(rawMessage, keypair.privateKey).toString("hex");
  }
  return null;
}