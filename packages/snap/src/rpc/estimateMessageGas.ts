import {Wallet} from "../interfaces";
import {Message, MessageGasEstimate, MessageRequest} from "@chainsafe/filsnap-types";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";
import { FilecoinNumber } from "@openworklabs/filecoin-number";

export async function estimateMessageGas(
  wallet: Wallet, api: LotusRpcApi, messageRequest: MessageRequest, maxFee?: string,
): Promise<MessageGasEstimate> {
  const keypair = await getKeyPair(wallet);
  const message: Message = {
    ...messageRequest,
    from: keypair.address,
    gasfeecap: "0",
    gaslimit: 0,
    gaspremium: "0",
    method: 0, // code for basic transaction
    nonce: 0 // dummy nonce just for gas calculation
  };
  // estimate gas usage
  const gasLimit = await api.gasEstimateGasLimit(message, null);
  const maxFeeFil = maxFee ? maxFee : '0.1' // set max fee to 0.1 FIL
  // const messageEstimate = await api.gasEstimateMessageGas(message, {MaxFee: new FilecoinNumber(maxFeeFil, "fil").toAttoFil()}, null);
  const messageEstimate = await api.gasEstimateMessageGas(message, {MaxFee: "0"}, null);
  console.log("GAS ESTIMATE")
  console.log(messageEstimate)
  return {gasfeecap: messageEstimate.GasFeeCap, gaslimit: gasLimit, gaspremium: messageEstimate.GasPremium};
}