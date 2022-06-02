import {MetamaskState, Wallet} from "../interfaces";
import {keyRecover} from "@zondax/filecoin-signing-tools/js";
import {KeyPair} from "@chainsafe/filsnap-types";
import {
  deriveBIP44AddressKey as deprecated_deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode as Deprecated_JsonBIP44CoinTypeNode
} from '@metamask/key-tree-old';
import {getMetamaskVersion, isNewerVersion} from "../util/version";
import {getBIP44AddressKeyDeriver, JsonBIP44CoinTypeNode } from "@metamask/key-tree";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyPair> {
  const snapState = await wallet.request({ method: 'snap_manageState', params: ['get'] }) as MetamaskState;
  const { derivationPath } = snapState.filecoin.config;
  const [, , coinType, account, change, addressIndex] = derivationPath.split('/');
  const bip44Code = coinType.replace("\'", "");
  const isFilecoinMainnet = bip44Code === '461';
  const bip44Node = await wallet.request({
    method: `snap_getBip44Entropy_${bip44Code}`,
    params: []
  }) as Deprecated_JsonBIP44CoinTypeNode | JsonBIP44CoinTypeNode;

  let privateKey: Buffer;

  const currentVersion = await getMetamaskVersion(wallet);
  if(isNewerVersion('MetaMask/v10.14.99-flask.0', currentVersion)) {
    const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node as JsonBIP44CoinTypeNode, {
      account: parseInt(account),
      change: parseInt(change),
    });
    const extendedPrivateKey = await addressKeyDeriver(Number(addressIndex));
    privateKey = extendedPrivateKey.privateKeyBuffer.slice(0, 32);
  } else {
    // metamask has supplied us with entropy for "m/purpose'/bip44Code'/"
    // we need to derive the final "accountIndex'/change/addressIndex"
    const extendedPrivateKey = await deprecated_deriveBIP44AddressKey(bip44Node as Deprecated_JsonBIP44CoinTypeNode, {
      account: parseInt(account),
      address_index: parseInt(addressIndex),
      change: parseInt(change),
    });
    privateKey = extendedPrivateKey.slice(0, 32);
  }

  const extendedKey = keyRecover(privateKey, !isFilecoinMainnet);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_base64,
    publicKey: extendedKey.public_hexstring
  };
}
