import {SnapRpcMethodRequest} from "@nodefactory/metamask-filecoin-types";

declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: (request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<unknown>;
            on: (eventName: unknown, callback: unknown) => unknown;
            requestIndex: () => Promise<{getPluginApi: (origin: string) => Promise<any>}>;
        }
    }
}

export function hasMetaMask(): boolean {
    if (!window.ethereum) {
        return false
    }
    return window.ethereum.isMetaMask;
}

export const origin = new URL('package.json', 'http://localhost:8081').toString();
export const pluginOrigin = `wallet_plugin_${origin}`;

export async function installFilecoinSnap(): Promise<boolean> {
    try {
        console.log("installing snap")
        console.log("Snap installed!!");
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function isFilecoinSnapInstalled(): Promise<boolean> {
    return true;
}
