declare module "@openworklabs/filecoin-number" {
    export class FilecoinNumber {
        constructor(amount: string, type: "fill" | "attofil")
        toAttoFil(): string;
        toFil(): string;
    }
}