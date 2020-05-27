/* eslint-disable @typescript-eslint/camelcase */

import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration/index";
import {key_derive_from_seed, ExtendedKey} from "@zondax/filecoin-signer-wasm";
import {getApi} from "../filecoin/api";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<ExtendedKey> {
  const api = getApi(wallet);
  const seed = await wallet.getAppKey();
  const derivationPath = getConfiguration(wallet).derivationPath;

  const keyPair: ExtendedKey = key_derive_from_seed(seed, derivationPath);
  return keyPair;
}
