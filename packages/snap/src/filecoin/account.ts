import {Wallet} from "../interfaces";
import {keyDeriveFromSeed, keyRecover} from "@zondax/filecoin-signing-tools/js";
import {KeyPair} from "@nodefactory/metamask-filecoin-types";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const seed = await wallet.getAppKey();
  const pluginState = await wallet.getPluginState();
  let extendedKey = keyDeriveFromSeed(seed, pluginState.filecoin.config.derivationPath);

  // obtain testnet address if configured
  if (pluginState.filecoin.config.network === "t") {
    extendedKey = keyRecover(extendedKey.private_hexstring, true);
  }

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_hexstring,
    publicKey: extendedKey.public_hexstring
  };
}
