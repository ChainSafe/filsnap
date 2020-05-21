import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Hidden,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core/';
import {Transfer} from "../../components/Transfer/Transfer";
import {SignMessage} from "../../components/SignMessage/SignMessage";
import {Transaction, TransactionTable} from "../../components/TransactionTable/TransactionTable";
import {Account} from "../../components/Account/Account";
import {MetaMaskConnector} from "../MetaMaskConnector/MetaMaskConnector";
import {MetaMaskContext} from "../../context/metamask";
import {LatestBlock} from "../../components/LatestBlock/LatestBlock";
import {BlockInfo, PolkadotApi} from "@nodefactory/metamask-polkadot-types";
import {getInjectedMetamaskExtension} from "../../services/metamask";
import {web3Accounts} from "@polkadot/extension-dapp";

export const Dashboard = () => {

    const [state] = useContext(MetaMaskContext);

    const [balance, setBalance] = useState("0");
    const [address, setAddress] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [latestBlock, setLatestBlock] = useState<BlockInfo>({hash: "", number: ""});
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [eventApi, setEventApi] = useState<PolkadotApi|null>(null);
    const [network, setNetwork] = useState<"kusama" | "westend">("westend");

    const handleBalanceChange = useCallback((newBalance: string) => {
        setBalance(newBalance);
    }, [setBalance]);

    const handleNetworkChange = async (event: React.ChangeEvent<{ value: any }>) => {
        const networkName = event.target.value as "kusama" | "westend";
        if(networkName === network) return;
        const extension = await getInjectedMetamaskExtension();
        if (!extension) return;
        await (await extension.getMetamaskSnapApi()).setConfiguration({networkName: networkName});
        setNetwork(networkName);
    };

    useEffect(() => {
        if (state.polkadotSnap.isInstalled) {
            (async function () {
                const extension = await getInjectedMetamaskExtension();
                if (!extension) return;
                const metamaskSnapApi = await extension.getMetamaskSnapApi();
                if (metamaskSnapApi) {
                    const api = await metamaskSnapApi.getEventApi();
                    setEventApi(api);
                }
            })();
        }
    }, [state.polkadotSnap.isInstalled, setEventApi]);

    useEffect(() => {
        const api = eventApi;
        if(api) {
            (async function () {
                api.subscribeToBalance(handleBalanceChange);
            })();
        }
        return function () {
            if (api) {
                api.unsubscribeAllFromBalance();
            }
        }
    }, [network, handleBalanceChange, eventApi]);

    useEffect(() => {
        (async () => {
            if (state.polkadotSnap.isInstalled) {
                const extension = await getInjectedMetamaskExtension();
                if (!extension) return;
                const metamaskSnapApi = await extension.getMetamaskSnapApi();
                const account = (await web3Accounts())[0];
                setAddress(account.address);
                setPublicKey(await metamaskSnapApi.getPublicKey());
                setBalance(await metamaskSnapApi.getBalance());
                setLatestBlock(await metamaskSnapApi.getLatestBlock());
                setTransactions(await metamaskSnapApi.getAllTransactions(account.address) as Transaction[]);
            }
        })();
    }, [state.polkadotSnap.isInstalled, network]);

    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justify="center" container spacing={3}>
                <Box m="2rem">
                    <Typography variant="h2">
                        Polkadot snap demo
                    </Typography>
                </Box>
                <Hidden xsUp={state.polkadotSnap.isInstalled}>
                    <MetaMaskConnector/>
                </Hidden>
                <Hidden xsUp={!state.polkadotSnap.isInstalled}>
                    <Box m="1rem" alignSelf="baseline">
                        <InputLabel>Network</InputLabel>
                        <Select
                            defaultValue={"westend"}
                            onChange={handleNetworkChange}
                        >
                            <MenuItem value={"kusama"}>Kusama</MenuItem>
                            <MenuItem value={"westend"}>Westend</MenuItem>
                        </Select>
                    </Box>
                    <Grid container spacing={3} alignItems={"stretch"}>
                        <Grid item xs={12}>
                            <LatestBlock block={latestBlock}/>
                        </Grid>
                    </Grid>
                    <Box m="1rem"/>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <Account network={network} address={address} balance={balance} publicKey={publicKey}/>
                        </Grid>
                    </Grid>
                    <Box m="1rem"/>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item md={6} xs={12}>
                            <Transfer network={network}/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <SignMessage/>
                        </Grid>
                    </Grid>
                    <Box m="1rem"/>
                    <Grid container spacing={3} alignItems={"stretch"}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Account transactions"/>
                                <CardContent>
                                    <TransactionTable txs={transactions}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    );
};