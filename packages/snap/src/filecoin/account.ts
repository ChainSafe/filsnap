import {MetamaskState, Wallet} from "../interfaces";
import {keyRecover} from "@zondax/filecoin-signing-tools/js";
import {KeyPair} from "@chainsafe/filsnap-types";
import {deriveBIP44AddressKey, JsonBIP44CoinTypeNode} from '@metamask/key-tree';

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const snapState = await wallet.request({ method: 'snap_manageState', params: ['get'] }) as MetamaskState;
  const { derivationPath } = snapState.filecoin.config;
  const bip44Code = derivationPath.split('/')[2].split('\'')[0];
  const isTestnet = bip44Code !== '461';
  const bip44Node = await wallet.request({
    method: `snap_getBip44Entropy_${bip44Code}`,
    params: []
  }) as JsonBIP44CoinTypeNode;

  // metamask has supplied us with entropy for "m/purpose'/bip44Code'/"
  // we need to derive the final "accountIndex'/change/addressIndex"
  const extendedPrivateKey = deriveBIP44AddressKey(bip44Node, {
    account: 0,
    address_index: 0,
    change: 0,
  });
  const privateKey = extendedPrivateKey.slice(0, 32);
  const extendedKey = keyRecover(privateKey, isTestnet);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_hexstring,
    publicKey: extendedKey.public_hexstring
  };
}
