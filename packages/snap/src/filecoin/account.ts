import { keyRecover } from "@zondax/filecoin-signing-tools/js";
import { KeyPair } from "@chainsafe/filsnap-types";
import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";
import { getMetamaskVersion, isNewerVersion } from "../util/version";
import { MetamaskState } from "../interfaces";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: SnapProvider): Promise<KeyPair> {
  const snapState = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  const { derivationPath } = snapState.filecoin.config;
  const [, , coinType, account, change, addressIndex] =
    derivationPath.split("/");
  const bip44Code = coinType.replace("'", "");
  const isFilecoinMainnet = bip44Code === "461";

  let bip44Node: JsonBIP44CoinTypeNode;
  const currentVersion = await getMetamaskVersion(wallet);
  if (isNewerVersion("MetaMask/v10.18.99-flask.0", currentVersion))
    bip44Node = (await wallet.request({
      method: "snap_getBip44Entropy",
      params: {
        coinType: Number(bip44Code),
      },
    })) as JsonBIP44CoinTypeNode;
  else
    bip44Node = (await wallet.request({
      method: `snap_getBip44Entropy_${bip44Code}`,
      params: [],
    })) as JsonBIP44CoinTypeNode;

  const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node, {
    account: parseInt(account),
    change: parseInt(change),
  });
  const extendedPrivateKey = await addressKeyDeriver(Number(addressIndex));
  const privateKey = extendedPrivateKey.privateKeyBuffer.slice(0, 32);

  const extendedKey = keyRecover(privateKey, !isFilecoinMainnet);

  return {
    address: extendedKey.address,
    privateKey: extendedKey.private_base64,
    publicKey: extendedKey.public_hexstring,
  };
}
