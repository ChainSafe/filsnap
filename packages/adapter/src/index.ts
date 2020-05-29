import {hasMetaMask, isSnapInstalled} from "./utils";

const defaultOrigin = "wallet_plugin_http://localhost:8081/package.json";

export async function enableFilecoinSnap(): Promise<void> {
    if (!hasMetaMask()) {
        return;
    }

    if (!(await isSnapInstalled(defaultOrigin))) {
        await window.ethereum.send({
            method: "wallet_enable",
            params: [{
                [defaultOrigin]: {}
            }]
        })
    }
}