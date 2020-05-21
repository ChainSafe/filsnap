import {getInjectedMetamaskExtension} from "../../services/metamask";

export interface AccountProps {
    address: string,
    publicKey: string,
    balance: string
    network: string
}

export const Account = (props: AccountProps) => {

    const handleExport = async () => {
        const provider = await getInjectedMetamaskExtension();
        if(!provider) return;
        const metamaskSnapApi = await provider.getMetamaskSnapApi();
        const privateKey = await metamaskSnapApi.exportSeed();
        alert(privateKey);
    };

    return (
    );
};
