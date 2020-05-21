import {Callback, HexHash, Origin, TxEventArgument} from "@nodefactory/metamask-filecoin-types";

export interface EventEmitter<K, T, J>  {
  addListener(event: K, identifier: T, listener: Callback<J>): this;
  removeListener(event: K, identifier: T, listener: Callback<J>): this;
  removeAllListeners(event: K, identifier: T): this;
  getListenersCount(event: K, identifier: T): number;
  emit(event: K, identifier: T, arg: J): boolean;
}

