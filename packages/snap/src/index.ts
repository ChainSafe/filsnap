import { OnRpcRequestHandler } from "@metamask/snap-types";
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
import {
  isValidConfigureRequest,
  isValidEstimateGasRequest,
  isValidSendRequest,
  isValidSignRequest,
} from "./util/params";

declare let wallet: Wallet;

const apiDependentMethods = [
  "fil_getBalance",
  "fil_signMessage",
  "fil_sendMessage",
  "fil_getGasForMessage",
  "fil_configure",
];

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
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
  if (apiDependentMethods.indexOf(request.method) >= 0) {
    api = await getApi(wallet);
  }
  switch (request.method) {
    case "fil_configure": {
      isValidConfigureRequest(request.params);
      const resp = await configure(
        wallet,
        request.params.configuration.network,
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
      isValidSignRequest(request.params);
      return await signMessage(wallet, api, request.params.message);
    case "fil_signMessageRaw":
      if (
        "message" in request.params &&
        typeof request.params.message == "string"
      ) {
        return await signMessageRaw(wallet, request.params.message);
      } else {
        throw new Error("Invalid raw message signing request");
      }
    case "fil_sendMessage":
      isValidSendRequest(request.params);
      return await sendMessage(wallet, api, request.params.signedMessage);
    case "fil_getGasForMessage":
      isValidEstimateGasRequest(request.params);
      return await estimateMessageGas(
        wallet,
        api,
        request.params.message,
        request.params.maxFee
      );
    default:
      throw new Error("Unsupported RPC method");
  }
};
