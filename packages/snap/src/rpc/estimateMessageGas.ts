import {Wallet} from "../interfaces";
import {Message, MessageRequest} from "@nodefactory/filsnap-types";
import {getKeyPair} from "../filecoin/account";
import {LotusRpcApi} from "../filecoin/types";

export async function estimateMessageGas(wallet: Wallet, api: LotusRpcApi, messageRequest: MessageRequest): Promise<Message> {
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
    return message;
}