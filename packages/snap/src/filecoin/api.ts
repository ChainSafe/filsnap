import {Wallet} from "../interfaces";
import { getConfiguration } from "../configuration";
// @ts-ignore
import LotusRPC from "@filecoin-shipyard/lotus-client-rpc"

import {NodejsProvider} from "@filecoin-shipyard/lotus-client-provider-nodejs"
// @ts-ignore
import testnet from "@filecoin-shipyard/lotus-client-schema"

export function getApi(wallet: Wallet) {
  const rpcUrl = getConfiguration(wallet).rpcUrl;
  const provider = new NodejsProvider(rpcUrl, {});
  console.log(provider);
  const client = new LotusRPC(provider, {schema: testnet.fullNode});
  console.log(client);
  return client;
};
