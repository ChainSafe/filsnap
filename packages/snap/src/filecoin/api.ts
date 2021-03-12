import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration";
import {LotusRPC} from "@filecoin-shipyard/lotus-client-rpc";
import {NodejsProvider} from "@filecoin-shipyard/lotus-client-provider-nodejs";
import {testnet} from "@filecoin-shipyard/lotus-client-schema";
import {LotusRpcApi} from "./types";

export async function getApi(wallet: Wallet): Promise<LotusRpcApi> {
  const configuration = await getConfiguration(wallet);
  const provider = new NodejsProvider(
    configuration.rpc.url,
    configuration.rpc.token ? {token: configuration.rpc.token} : {});
  const client = new LotusRPC(provider, {schema: testnet.fullNode});
  return client as unknown as LotusRpcApi;
}