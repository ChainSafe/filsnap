import {Wallet} from "../interfaces";
// eslint-disable-next-line
// @ts-ignore
import {keyDeriveFromSeed} from "@zondax/filecoin-signing-tools/js";
import {KeyPair} from "@nodefactory/metamask-filecoin-types";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const seed = await wallet.getAppKey();
  const pluginState = await wallet.getPluginState();
  const extendedKey = keyDeriveFromSeed(seed, pluginState.filecoin.config.derivationPath);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_hexstring,
    publicKey: extendedKey.public_hexstring
  };
}
