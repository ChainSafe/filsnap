import {
  MessageRequest,
  SignedMessage,
  SnapConfig,
} from "@chainsafe/filsnap-types";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface ConfigureRequest {
  configuration: WithRequired<SnapConfig, "network">;
}

export function isValidConfigureRequest(
  params: unknown
): asserts params is ConfigureRequest {
  if (
    !(
      params != null &&
      typeof params == "object" &&
      "configuration" in params &&
      // @ts-expect-error
      "network" in params.configuration
    )
  ) {
    throw new Error("Invalid configure request");
  }
}

export function isValidSignRequest(
  params: unknown
): asserts params is { message: MessageRequest } {
  if (
    !(
      params != null &&
      typeof params == "object" &&
      "message" in params &&
      // @ts-expect-error
      "to" in params.message &&
      // @ts-expect-error
      "value" in params.message
    )
  ) {
    throw new Error("Invalid sign request");
  }
}

export function isValidSendRequest(
  params: unknown
): asserts params is { signedMessage: SignedMessage } {
  if (
    !(
      params != null &&
      typeof params == "object" &&
      "signedMessage" in params &&
      // @ts-expect-error
      "message" in params.signedMessage &&
      // @ts-expect-error
      "signature" in params.signedMessage
    )
  ) {
    throw new Error("Invalid send request");
  }
}

export function isValidEstimateGasRequest(
  params: unknown
): asserts params is { message: MessageRequest; maxFee?: string } {
  if (
    !(
      params != null &&
      typeof params == "object" &&
      "message" in params &&
      // @ts-expect-error
      "to" in params.message &&
      // @ts-expect-error
      "value" in params.message
    )
  ) {
    throw new Error("Invalid send request");
  }
}
