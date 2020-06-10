import {MetamaskFilecoinRpcRequest} from "@nodefactory/metamask-filecoin-types";
import {MetamaskFilecoinSnap} from "./snap";

async function sendSnapMethod(request: MetamaskFilecoinRpcRequest, snapId: string): Promise<unknown> {
  return await window.ethereum.send({
    method: snapId,
    params: [
      request
    ]
  });
}

export async function getAddress(this: MetamaskFilecoinSnap): Promise<string> {
  return (await sendSnapMethod({method: "getAddress"}, this.snapId)) as string;
}

export async function getPublicKey(this: MetamaskFilecoinSnap): Promise<string> {
  return (await sendSnapMethod({method: "getPublicKey"}, this.snapId)) as string;
}

export async function exportSeed(this: MetamaskFilecoinSnap): Promise<string> {
  return (await sendSnapMethod({method: "exportSeed"}, this.snapId)) as string;
}

export async function getBalance(this: MetamaskFilecoinSnap): Promise<string> {
  return (await sendSnapMethod({method: "getBalance"}, this.snapId)) as string
}
