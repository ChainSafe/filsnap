export function shortAddress(address: string): string {
    return address.slice(0, 7) + "....." + address.slice(-7);
}

export function getCurrency(network: string): string {
    return "";
}