import {web3Enable, web3EnablePromise} from "@polkadot/extension-dapp";
import {PolkadotApi, SnapRpcMethodRequest} from "@nodefactory/metamask-filecoin-types";
// import {InjectedMetamaskExtension} from "@nodefactory/metamask-filecoin-adapter/src/types";
import {InjectedExtension} from "@polkadot/extension-inject/types";

declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: (request: SnapRpcMethodRequest | {method: string; params?: any[]}) => Promise<unknown>;
            on: (eventName: unknown, callback: unknown) => unknown;
            requestIndex: () => Promise<{getPluginApi: (origin: string) => Promise<PolkadotApi>}>;
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
        await web3Enable('my cool dapp');
        console.log("Snap installed!!");
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function isFilecoinSnapInstalled(): Promise<boolean> {
    return !! await getInjectedMetamaskExtension();
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
    const extensions = await web3EnablePromise;
    return getMetamaskExtension(extensions || []) || null;
}

function getMetamaskExtension(extensions: InjectedExtension[]): InjectedMetamaskExtension|undefined {
    return extensions.find(item => item.name === "metamask-polkadot-snap") as unknown as InjectedMetamaskExtension|undefined;
}