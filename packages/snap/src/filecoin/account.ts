import {Wallet} from "../interfaces";
import {default as ExtendedKey} from "@zondax/filecoin-signing-tools/js/src/extendedkey.js";
import {KeyPair} from "@nodefactory/filsnap-types";
import {deriveKeyFromPath} from '@metamask/key-tree';
import {Buffer} from 'buffer';

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const pluginState = await wallet.getPluginState();
  const { derivationPath } = pluginState.filecoin.config;
  const bip44Code = derivationPath.split('/')[2].split('\'')[0];
  const isTestnet = bip44Code !== '461';
  const rawBip44Entropy = await wallet.send({ method: `wallet_getBip44Entropy_${bip44Code}`, params: [] });
  const bip44Entropy = Buffer.from(String(rawBip44Entropy), 'base64');
  // metamask has supplied us with entropy for "m/purpose'/bip44Code'/"
  // we need to derive the final "accountIndex'/change/addressIndex"
  const accountIndex = 0;
  const addressIndex = 0;
  const keyMaterial = deriveKeyFromPath(bip44Entropy, `bip32:${accountIndex}'/bip32:0/bip32:${addressIndex}`);
  const privateKey = keyMaterial.slice(0, 32);
  const extendedKey = new ExtendedKey(privateKey, isTestnet);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_hexstring,
    publicKey: extendedKey.public_hexstring
  };
}
