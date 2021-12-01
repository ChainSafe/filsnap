import {SnapRpcMethodRequest} from "@chainsafe/filsnap-types";
import {enableFilecoinSnap, MetamaskFilecoinSnap} from "@chainsafe/filsnap-adapter";

declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: <T>(request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<T>;
            on: (eventName: unknown, callback: unknown) => unknown;
            // requestIndex: () => Promise<{getSnapApi: (origin: string) => Promise<FilecoinApi>}>;
        }
    }
}

export const snapId = 'local:http://localhost:8081';

let isInstalled: boolean = false;

export interface SnapInitializationResponse {
    isSnapInstalled: boolean;
    snap?: MetamaskFilecoinSnap;
}

export async function installFilecoinSnap(): Promise<SnapInitializationResponse> {
    try {
        console.log('Attempting to connect to snap...');
        const metamaskFilecoinSnap = await enableFilecoinSnap({network: "f"}, snapId);
        isInstalled = true;
        console.log('Snap installed!');
        return {isSnapInstalled: true, snap: metamaskFilecoinSnap};
    } catch (e) {
        console.log(e);
        isInstalled = false;
        return {isSnapInstalled: false};
    }
}

export async function isFilecoinSnapInstalled(): Promise<boolean> {
    return isInstalled;
}
