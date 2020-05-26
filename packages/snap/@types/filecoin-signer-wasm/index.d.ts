/* eslint-disable @typescript-eslint/camelcase */

declare module "@zondax/filecoin-signer-wasm" {

  export interface ExtendedKey {
    address: string;
    public_hexstring: string;
    private_hexstring: string;
    public_raw: string;
    private_raw: string;
  }

  export function mnemonic_generate(): string;
  export function key_derive(mnemonic: string, path: string): ExtendedKey;
  export function key_derive_from_seed(seed: string, path: string): ExtendedKey;
  export function key_recover(privateKey: string, testnet: boolean): ExtendedKey;
  export function transaction_serialize(transaction: string): string;
  export function transaction_parse(hexstring: string, testnet: boolean): JSON;
  export function transaction_sign(transaction: string, privateKey: string): string;
  export function verify_signature(signature: string, cbor_transaction: string): boolean;

}
