import {Wallet} from "../../interfaces";
import ApiPromise from "@polkadot/api/promise";
import {getKeyPair} from "../../filecoin/account";
import {showConfirmationDialog} from "../../util/confirmation";

export async function signPayloadJSON(
  wallet: Wallet, api: ApiPromise, payload: any
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
  wallet: Wallet, api: ApiPromise, payload: any
): Promise<{ signature: string }|void> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog(
    wallet,
    `Do you want to sign following message: \n "${payload.data}" \n with account ${payload.address}`
  );
  // return seed if user confirmed action
  if (confirmation) {
    const keyPair = await getKeyPair(wallet);
    const signedBytes = keyPair.sign((payload.data));
    return {
      signature: signedBytes
    };
  }
}