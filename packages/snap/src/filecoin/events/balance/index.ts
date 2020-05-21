import {Wallet} from "../../../interfaces";

let unsubscribe: Record<string, () => void>;

export async function registerOnBalanceChange(wallet: Wallet, origin: string): Promise<void> {
}

export function removeOnBalanceChange(origin: string): void {
}
