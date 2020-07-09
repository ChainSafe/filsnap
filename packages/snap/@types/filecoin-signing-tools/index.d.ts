declare module "@zondax/filecoin-signing-tools" {
    export function generateMnemonic(): string;
    export function keyDeriveFromSeed(seed: string, path: string): any;
}