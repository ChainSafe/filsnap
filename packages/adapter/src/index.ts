import {hasMetaMask, isSnapInstalled} from "./utils";
import {MetamaskFilecoinSnap as MFSnap} from "./snap";

const defaultSnapOrigin = "http://localhost:8081/package.json";
const defaultSnapId = `wallet_plugin_${defaultSnapOrigin}`;

export type MetamaskFilecoinSnap = MFSnap;

export async function enableFilecoinSnap(pluginOrigin?: string): Promise<MetamaskFilecoinSnap> {
    if (!hasMetaMask()) {
        throw new Error("Metamask no installed");
    }
    // enable snap
    if (!(await isSnapInstalled(defaultSnapId))) {
        await window.ethereum.send({
            method: "wallet_enable",
            params: [{
                [defaultSnapId]: {}
            }]
        })
    }

    // TODO configure snap with initial configuration

    // return snap object
    return new MFSnap(
        pluginOrigin || defaultSnapOrigin
    );
}