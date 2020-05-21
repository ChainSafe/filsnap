import {Wallet} from "../interfaces";
import {cryptoWaitReady} from '@polkadot/util-crypto';
import {KeyringPair} from '@polkadot/keyring/types';
import {Keyring} from '@polkadot/keyring';
import {stringToU8a} from "@polkadot/util";
import {getConfiguration} from "../configuration";

/**
 * Returns KeyringPair if one is saved in wallet state, creates new one otherwise
 * @param wallet
 */
export async function getKeyPair(wallet: Wallet): Promise<KeyringPair> {
  // get app key and wait for api to be ready
  const [appKey] = await Promise.all([wallet.getAppKey(), cryptoWaitReady()]);
  // generate keys
  const seed = appKey.substr(0, 32);
  const keyring = new Keyring({ss58Format: getConfiguration(wallet).addressPrefix});
  return keyring.addFromSeed(stringToU8a(seed));
}
