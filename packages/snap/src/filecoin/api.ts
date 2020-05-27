import {Wallet} from "../interfaces";
import {getConfiguration} from "../configuration";
import LotusClientRPC from "@filecoin-shipyard/lotus-client-rpc";
import schema from "@filecoin-shipyard/lotus-client-schema";

let provider: any;
let api: any;

export function resetApi(): void {
  if (api && provider) {
    try {
      api.destroy();
      provider.destroy();
    } catch (e) {
      console.error(e)
    }
    api = null;
    provider = null;
  }
};

export async function getApi(wallet: Wallet): Promise<any> {
  const config = schema
};
