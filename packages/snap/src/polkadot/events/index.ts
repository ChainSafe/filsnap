import {Callback, HexHash, Origin, PolkadotEventArgument, TxEventArgument} from "@nodefactory/metamask-polkadot-types";
import {EventEmitterImplementation} from "./emitter";

export interface EventEmitter<K, T, J>  {
  addListener(event: K, identifier: T, listener: Callback<J>): this;
  removeListener(event: K, identifier: T, listener: Callback<J>): this;
  removeAllListeners(event: K, identifier: T): this;
  getListenersCount(event: K, identifier: T): number;
  emit(event: K, identifier: T, arg: J): boolean;
}

export type PolkadotEvent = "onBalanceChange" | "onTransactionStatus";
export type TxStatus = "included" | "finalized";

export const polkadotEventEmitter: EventEmitter<PolkadotEvent, Origin, PolkadotEventArgument> =
    new EventEmitterImplementation<PolkadotEvent, Origin, PolkadotEventArgument>();

export const txEventEmitter: EventEmitter<TxStatus, HexHash, TxEventArgument> =
    new EventEmitterImplementation<TxStatus, HexHash, TxEventArgument>();
