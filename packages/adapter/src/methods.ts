import {
  BlockInfo,
  MetamaskPolkadotRpcRequest,
  SignPayloadJSONRequest, SignPayloadRawRequest,
  SnapConfig, TxPayload
} from "@nodefactory/metamask-polkadot-types";
import {SignerPayloadJSON, SignerPayloadRaw} from '@polkadot/types/types';
import {MetamaskPolkadotSnap} from "./snap";

async function sendSnapMethod(request: MetamaskPolkadotRpcRequest, snapId: string): Promise<unknown> {
  return await window.ethereum.send({
    method: snapId,
    params: [
      request
    ]
  });
}

async function sign(
  this: MetamaskPolkadotSnap,
  method: "signPayloadJSON" | "signPayloadRaw",
  payload: SignerPayloadJSON | SignerPayloadRaw
): Promise<{signature: string}> {
  return (
    await sendSnapMethod({
      method,
      params: {
        payload
      }
    } as SignPayloadJSONRequest | SignPayloadRawRequest,
    this.snapId
    )
  ) as {signature: string};
}

export async function signPayloadJSON(this: MetamaskPolkadotSnap, payload: SignerPayloadJSON): Promise<string> {
  return (await sign.bind(this)("signPayloadJSON", payload)).signature;
}

export async function signPayloadRaw(this: MetamaskPolkadotSnap, payload: SignerPayloadRaw): Promise<string> {
  return (await sign.bind(this)("signPayloadRaw", payload)).signature;
}

export async function addPolkadotAsset(this: MetamaskPolkadotSnap): Promise<void> {
  await sendSnapMethod({method: "addPolkadotAsset"}, this.snapId);
}

export async function getBalance(this: MetamaskPolkadotSnap): Promise<string> {
  return (await sendSnapMethod({method: "getBalance"}, this.snapId)) as string;
}

export async function getAddress(this: MetamaskPolkadotSnap): Promise<string> {
  return (await sendSnapMethod({method: "getAddress"}, this.snapId)) as string;
}

export async function getPublicKey(this: MetamaskPolkadotSnap): Promise<string> {
  return (await sendSnapMethod({method: "getPublicKey"}, this.snapId)) as string;
}

export async function exportSeed(this: MetamaskPolkadotSnap): Promise<string> {
  return (await sendSnapMethod({method: "exportSeed"}, this.snapId)) as string;
}

export async function setConfiguration(this: MetamaskPolkadotSnap, config: SnapConfig): Promise<void> {
  await sendSnapMethod({method: "configure", params: {configuration: config}}, this.snapId);
}

export async function getLatestBlock(this: MetamaskPolkadotSnap): Promise<BlockInfo> {
  try {
    return (
      await sendSnapMethod(
        {method: "getBlock", params: {blockTag: "latest"}},
        this.snapId)
    ) as BlockInfo;
  } catch (e) {
    console.log("Unable to fetch latest block", e);
    return {hash: "", number: ""};
  }
}

export async function getAllTransactions(this: MetamaskPolkadotSnap, address?: string): Promise<unknown> {
  return await sendSnapMethod({method: "getAllTransactions", params: {address}}, this.snapId);
}

export async function sendSignedData(
  this: MetamaskPolkadotSnap, signature: string,  txPayload: TxPayload
): Promise<string> {
  const response = await sendSnapMethod({
    method: "send",
    params: {
      signature,
      txPayload
    }
  }, this.snapId);
  return response as string;
}

export async function generateTransactionPayload(
  this: MetamaskPolkadotSnap, amount: string | number, to: string
): Promise<TxPayload> {
  return await sendSnapMethod(
    {method: "generateTransactionPayload", params: {amount, to}}, this.snapId
  ) as TxPayload;
}