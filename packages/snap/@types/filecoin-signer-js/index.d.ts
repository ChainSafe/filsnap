declare module "@zondax/filecoin-signer-js" {
    export function generateMnemonic(): string;
    export function keyDeriveFromSeed(seed: string, path: string): any;
}