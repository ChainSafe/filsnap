import {Wallet} from "../interfaces";
import {keyDeriveFromSeed} from "@zondax/filecoin-signing-tools";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<any> {
  const seed = await wallet.getAppKey();
  const pluginState = await wallet.getPluginState();
  const extendedKey = keyDeriveFromSeed(seed, pluginState.filecoin.config.derivationPath);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.privateKey.toString("hex"),
    publicKey: extendedKey.publicKey.toString("hex")
  };
}
