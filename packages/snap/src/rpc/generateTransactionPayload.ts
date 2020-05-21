import ApiPromise from "@polkadot/api/promise";
import {Wallet} from "../interfaces";
import {getAddress} from "./getAddress";
import {SubmittableExtrinsic} from "@polkadot/api/types";
import {TxPayload} from "@nodefactory/metamask-polkadot-types";

export async function generateTransactionPayload(
  wallet: Wallet, api: ApiPromise, to: string, amount: string | number
): Promise<TxPayload> {
  // fetch last signed block and account address
  const [signedBlock, address] = await Promise.all([api.rpc.chain.getBlock(), getAddress(wallet)]);
  // create signer options
  const nonce = (await api.derive.balances.account(address)).accountNonce;
  const signerOptions = {
    blockHash: signedBlock.block.header.hash,
    era: api.createType('ExtrinsicEra', {
      current: signedBlock.block.header.number,
      period: 50
    }),
    nonce
  };
    // define transaction method
  const transaction: SubmittableExtrinsic<'promise'> = api.tx.balances.transfer(to, amount);
  // create SignerPayload
  const signerPayload = api.createType('SignerPayload', {
    genesisHash: api.genesisHash,
    runtimeVersion: api.runtimeVersion,
    version: api.extrinsicVersion,
    ...signerOptions,
    address: to,
    blockNumber: signedBlock.block.header.number,
    method: transaction.method
  });
  return {
    payload: signerPayload.toPayload(),
    tx: transaction.toHex()
  };
}