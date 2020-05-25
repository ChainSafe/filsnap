
import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration/index"
import {ExtendedKey} from "@nodefactory/metamask-filecoin-types";
import * as signer_wasm from "@zondax/filecoin-signer-wasm";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<ExtendedKey> {
  const seed = await wallet.getAppKey()
  const bip44 = getConfiguration(wallet).bip44

  const keyPair: ExtendedKey = signer_wasm.key_derive_from_seed(seed, bip44);
  return keyPair;
}