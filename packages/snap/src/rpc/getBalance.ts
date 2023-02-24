import { FilecoinNumber } from "@glif/filecoin-number/dist";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import { getKeyPair } from "../filecoin/account";
import { LotusRpcApi } from "../filecoin/types";

export async function getBalance(
  snap: SnapsGlobalObject,
  api: LotusRpcApi,
  address?: string
): Promise<string> {
  if (!address) {
    address = (await getKeyPair(snap)).address;
  }
  const balance = await api.walletBalance(address);
  return new FilecoinNumber(balance, "attofil").toFil();
}
