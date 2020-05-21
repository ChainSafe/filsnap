import { Injected, InjectedAccounts } from "@polkadot/extension-inject/types";
import { Signer as InjectedSigner } from '@polkadot/api/types';
import { SnapConfig } from "@nodefactory/metamask-filecoin-types";
import { MetamaskSnapApi } from "./types";
export declare class MetamaskPolkadotSnap implements Injected {
    accounts: InjectedAccounts;
    signer: InjectedSigner;
    protected readonly config: SnapConfig;
    protected readonly pluginOrigin: string;
    protected readonly snapId: string;
    private requestCounter;
    constructor(pluginOrigin: string, config: SnapConfig);
    enableSnap: () => Promise<Injected>;
    getMetamaskSnapApi: () => Promise<MetamaskSnapApi>;
}
