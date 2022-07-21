import { EmptyMetamaskState, Wallet } from "./interfaces";
import { getAddress } from "./rpc/getAddress";
import { exportPrivateKey } from "./rpc/exportPrivateKey";
import { getPublicKey } from "./rpc/getPublicKey";
import { getApi } from "./filecoin/api";
import { LotusRpcApi } from "./filecoin/types";
import { getBalance } from "./rpc/getBalance";
import { configure } from "./rpc/configure";
import { getMessages } from "./rpc/getMessages";
import { signMessage, signMessageRaw } from "./rpc/signMessage";
import { sendMessage } from "./rpc/sendMessage";
import { estimateMessageGas } from "./rpc/estimateMessageGas";

declare let wallet: Wallet;

const apiDependentMethods = [
  "fil_getBalance",
  "fil_signMessage",
  "fil_sendMessage",
  "fil_getGasForMessage",
  "fil_configure",
];
// eslint-disable-next-line
module.exports.onRpcRequest = (async ({ origin, request }: { origin: string, request: any }) => {

  const state = await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  });

  if (!state) {
    // initialize state if empty and set default config
    await wallet.request({
      method: "snap_manageState",
      params: ["update", EmptyMetamaskState()],
    });
  }

  let api: LotusRpcApi;
  // initialize lotus RPC api if needed
  // eslint-disable-next-line
  if (apiDependentMethods.indexOf(request.method) >= 0) {
    api = await getApi(wallet);
  }
  // eslint-disable-next-line
  switch (request.method) {
    case "fil_configure": {
      const resp = await configure(
        wallet,
        // eslint-disable-next-line
        request.params.configuration.network,
        // eslint-disable-next-line
        request.params.configuration
      );
      api = resp.api;
      return resp.snapConfig;
    }
    case "fil_getAddress":
      return await getAddress(wallet);
    case "fil_getPublicKey":
      return await getPublicKey(wallet);
    case "fil_exportPrivateKey":
      return exportPrivateKey(wallet);
    case "fil_getBalance": {
      const balance = await getBalance(wallet, api);
      return balance;
    }
    case "fil_getMessages":
      return getMessages(wallet);
    case "fil_signMessage":
      // eslint-disable-next-line
      return await signMessage(wallet, api, request.params.message);
    case "fil_signMessageRaw":
      // eslint-disable-next-line
      return await signMessageRaw(wallet, request.params.message);
    case "fil_sendMessage":
      // eslint-disable-next-line
      return await sendMessage(wallet, api, request.params.signedMessage);
    case "fil_getGasForMessage":
      return await estimateMessageGas(
        wallet,
        api,
        // eslint-disable-next-line
        request.params.message,
        // eslint-disable-next-line
        request.params.maxFee
      );
    default:
      throw new Error("Unsupported RPC method");
  }
  // eslint-disable-next-line
});