import {SnapRpcMethodRequest} from "@nodefactory/filsnap-types";
import {enableFilecoinSnap, MetamaskFilecoinSnap} from "@nodefactory/filsnap-adapter";

declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: <T>(request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<T>;
            on: (eventName: unknown, callback: unknown) => unknown;
            // requestIndex: () => Promise<{getPluginApi: (origin: string) => Promise<FilecoinApi>}>;
        }
    }
}

export const localOrigin = new URL('package.json', 'http://localhost:8081').toString();

let isInstalled: boolean = false;

export interface SnapInitializationResponse {
    isSnapInstalled: boolean;
    snap?: MetamaskFilecoinSnap;
}

export async function installFilecoinSnap(): Promise<SnapInitializationResponse> {
    try {
        console.log("installing snap");
        let metamaskFilecoinSnap;
        if (process.env.NODE_ENV === 'test') {
            metamaskFilecoinSnap = await enableFilecoinSnap({network: "d"}, localOrigin);
        } else {
            metamaskFilecoinSnap = await enableFilecoinSnap({network: "d"});
        }
        isInstalled = true;
        console.log("Snap installed!!");
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
