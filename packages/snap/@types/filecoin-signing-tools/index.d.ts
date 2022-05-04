declare module "@zondax/filecoin-signing-tools/js" {

  export class ExtendedKey {
    constructor(privateKey: Buffer, testnet?: boolean)
    address: string;
    privateKey: Buffer | Uint8Array;
    publicKey: Buffer | Uint8Array;
    // getters
    get public_raw(): Uint8Array;
    get private_raw(): Uint8Array;
    get public_hexstring(): string;
    get private_hexstring(): string;
    get public_base64(): string;
    get private_base64(): string;
  }

  export interface Message {
    to: string;
    from: string;
    nonce: number;
    value: string;
    gasfeecap: string;
    gaspremium: string;
    gaslimit: number;
    method: number;
    params?: string;
  }

  export interface SignedMessage {
    message: Message;
    signature: {
      data: string;
      type: number;
    }
  }

  export function generateMnemonic(): string;
  export function keyDeriveFromSeed(seed: string, path: string): ExtendedKey;

  export function transactionSerializeRaw(transaction: Message): Buffer;
  export function transactionSerialize(transaction: Message): string;

  export function transactionSignRaw(unsignedMessage: Message | string, privateKey: string): Buffer;
  export function transactionSign(unsignedMessage: Message, privateKey: string): SignedMessage;

  export function keyRecover(privateKey: Buffer, testnet: boolean): ExtendedKey;

  export interface Buffer {
    toString(encoding: "utf8" | "hex" | "binary" | "base64" | "ascii"): string;
  }
}
