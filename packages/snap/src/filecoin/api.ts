import {Wallet} from "../interfaces";
import LotusRpcEngine from "@openworklabs/lotus-jsonrpc-engine";
import { getConfiguration } from "../configuration";

export function getApi(wallet: Wallet): LotusRpcEngine {
  const rpcUrl = getConfiguration(wallet).rpcUrl;
  const config = {
    apiAddress: rpcUrl
  };

  const api = new LotusRpcEngine(config);
  return api;
};
