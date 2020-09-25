declare module "@openworklabs/filecoin-number" {
    export class FilecoinNumber {
        constructor(amount: string, denomination: FilecoinDenomination)
        toAttoFil(): string;
        toFil(): string;
    }

    export type FilecoinDenomination = "fil" | "attofil"
}