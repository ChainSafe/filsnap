import {Wallet} from "../../interfaces";
import ApiPromise from "@polkadot/api/promise";
import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types';
import {getKeyPair} from "../../polkadot/account";
import {hexToU8a, u8aToHex} from "@polkadot/util";
import {showConfirmationDialog} from "../../util/confirmation";

export async function signPayloadJSON(
  wallet: Wallet, api: ApiPromise, payload: SignerPayloadJSON
): Promise<{ signature: string }|void> {
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign following payload: \n "${payload.method}" \n with account ${payload.address}`
  );
  if (confirmation) {
    const extrinsic = api.registry.createType('ExtrinsicPayload', payload, { version: payload.version });
    const keyPair = await getKeyPair(wallet);
    return extrinsic.sign(keyPair);
  }
}

export async function signPayloadRaw(
  wallet: Wallet, api: ApiPromise, payload: SignerPayloadRaw
): Promise<{ signature: string }|void> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign following message: \n "${payload.data}" \n with account ${payload.address}`
  );
  // return seed if user confirmed action
  if (confirmation) {
    const keyPair = await getKeyPair(wallet);
    const signedBytes = keyPair.sign(hexToU8a(payload.data));
    return {
      signature: u8aToHex(signedBytes)
    };
  }
}