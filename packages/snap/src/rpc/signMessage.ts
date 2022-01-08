import {Message, SignedMessage, transactionSign, transactionSignRaw} from "@zondax/filecoin-signing-tools/js";
import {Wallet} from "../interfaces";
import {getKeyPair} from "../filecoin/account";
import {showConfirmationDialog} from "../util/confirmation";
import {LotusRpcApi} from "../filecoin/types";
import {MessageRequest} from "@chainsafe/filsnap-types";

export async function signMessage(
  wallet: Wallet, api: LotusRpcApi, messageRequest: MessageRequest
): Promise<SignedMessage> {
  const keypair = await getKeyPair(wallet);
  // extract gas params
  const gl = messageRequest.gaslimit && messageRequest.gaslimit !== 0 ? messageRequest.gaslimit : 0;
  const gp = messageRequest.gaspremium && messageRequest.gaspremium !== "0" ? messageRequest.gaspremium : "0";
  const gfc = messageRequest.gasfeecap && messageRequest.gasfeecap !== "0" ? messageRequest.gasfeecap : "0";
  const nonce = messageRequest.nonce ?? Number(await api.mpoolGetNonce(keypair.address));
  // create message object
  const message: Message = {
    from: keypair.address,
    gasfeecap: gfc,
    gaslimit: gl,
    gaspremium: gp,
    method: 0, // code for basic transaction
    nonce,
    params: [],
    to: messageRequest.to,
    value: messageRequest.value,
  };
  // estimate gas usage if gas params not provided
  if (message.gaslimit === 0 && message.gasfeecap === "0" && message.gaspremium === "0") {
    message.gaslimit = await api.gasEstimateGasLimit(message, null);
    const messageEstimate = await api.gasEstimateMessageGas(message, {MaxFee: "0"}, null);
    message.gaspremium = messageEstimate.GasPremium;
    message.gasfeecap = messageEstimate.GasFeeCap;
  }
  // show confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    {
      prompt: `Do you want to sign this message?`,
      textAreaContent: `from: ${message.from}\n` +
        `to: ${message.to}\n` +
        `value:${message.value}\n` +
        `gas limit:${message.gaslimit}\n` +
        `gas fee cap:${message.gasfeecap}\n` +
        `gas premium: ${message.gaspremium}\n` +
        `with account ${keypair.address}?`
    },
  );
  if (confirmation) {
    return transactionSign(message, keypair.privateKey);
  }
  return null;
}

export async function signMessageRaw(wallet: Wallet, rawMessage: string): Promise<string> {
  const keypair = await getKeyPair(wallet);
  const confirmation = await showConfirmationDialog(
    wallet,
    {
      description: `It will be signed with address: ${keypair.address}`,
      prompt: `Do you want to sign this message?`,
      textAreaContent: rawMessage,
    }
  );
  if (confirmation) {
    return transactionSignRaw(rawMessage, keypair.privateKey).toString("base64");
  }
  return null;
}
