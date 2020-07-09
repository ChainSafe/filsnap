import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration";
import {LotusRPC} from "@filecoin-shipyard/lotus-client-rpc";
import {NodejsProvider} from "@filecoin-shipyard/lotus-client-provider-nodejs";
import {testnet} from "@filecoin-shipyard/lotus-client-schema";
import {LotusRpcApi} from "./types";

export function getApi(wallet: Wallet): LotusRpcApi {
  const rpcUrl = getConfiguration(wallet).rpcUrl;
  const provider = new NodejsProvider(rpcUrl);
  const client = new LotusRPC(provider, {schema: testnet.fullNode});
  return client as unknown as LotusRpcApi;
}