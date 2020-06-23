import {Wallet} from "../interfaces";
import {KeyPair, keyPairFromSeed} from "@nodefactory/filecoin-address";
import {keyDeriveFromSeed} from "@zondax/filecoin-signer-js"

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const seed = await wallet.getAppKey();
  const network = await wallet.getPluginState().filecoin.config.network;
  const acc = keyDeriveFromSeed(seed, (await wallet.getPluginState()).filecoin.config.derivationPath);
  console.log(acc);
  const acc2 = keyPairFromSeed(seed, network);
  console.log(acc2);
  debugger;
  return acc2;
}
