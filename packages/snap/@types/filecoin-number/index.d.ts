declare module "@openworklabs/filecoin-number" {
    export class FilecoinNumber {
        constructor(amount: string, type: "fil" | "attofil")
        toAttoFil(): string;
        toFil(): string;
    }
}