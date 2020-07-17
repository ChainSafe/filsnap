import BN from "bn.js";

export function convertToFIL(amountFromRPC: string): string {
  const unformatedBalance = new BN(amountFromRPC);
  // convert to FIL
  return unformatedBalance.div(new BN("1000000000000000000")).toString();
}