import React, {useContext, useEffect, useState} from "react";
import {
    Box, Card, CardContent, CardHeader,
    Container, Grid, Hidden, InputLabel, MenuItem, Select, Typography,
} from '@material-ui/core/';
import {MetaMaskConnector} from "../MetaMaskConnector/MetaMaskConnector";
import {MetaMaskContext} from "../../context/metamask";
import {Account} from "../../components/Account/Account";
import {FilecoinSnapApi, Transaction} from "@nodefactory/metamask-filecoin-types";
import {TransactionTable} from "../../components/TransactionTable/TransactionTable";

export const Dashboard = () => {

    const [state] = useContext(MetaMaskContext);

    const [balance, setBalance] = useState("");
    const [address, setAddress] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [network, setNetwork] = useState<"f" | "t">("t");

    const [api, setApi] = useState<FilecoinSnapApi|null>(null);

    const handleNetworkChange = async (event: React.ChangeEvent<{value: any}>) => {
        const selectedNetwork = event.target.value as "f" | "t";
        if (selectedNetwork === network) return;
        if (api) {
            await api.configure({network: selectedNetwork});
            setNetwork(selectedNetwork);
            setTransactions([]);
        }
    };

    useEffect(() => {
        (async () => {
            if (state.filecoinSnap.isInstalled && state.filecoinSnap.snap) {
                const filecoinApi = await state.filecoinSnap.snap.getFilecoinSnapApi();
                setApi(filecoinApi);
                await filecoinApi.signMessage({
                    from: "t1hw4amnow4gsgk2ottjdpdverfwhaznyrslsmoni",
                    to: "t12flyjpedjjqlrr2dmlnrtbh62qav3b3h7o7lohy",
                    gaslimit: 10000,
                    gasprice: "0",
                    method: 1,
                    nonce: 90571,
                    value: "5000000000000000",
                });
            }
        })();
    }, [state.filecoinSnap.isInstalled, state.filecoinSnap.snap]);

    useEffect(() => {
        (async () => {
            if (api) {
                setAddress(await api.getAddress());
                setPublicKey(await api.getPublicKey());
                setBalance(await api.getBalance());
            }
        })();
    }, [api, network]);

    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justify="center" container spacing={3}>
                <Box m="2rem">
                    <Typography variant="h2">
                        Filecoin snap demo
                    </Typography>
                </Box>
                <Hidden xsUp={state.filecoinSnap.isInstalled}>
                    <MetaMaskConnector/>
                </Hidden>
                <Hidden xsUp={!state.filecoinSnap.isInstalled}>
                    <Box m="1rem" alignSelf="baseline">
                        <InputLabel>Network</InputLabel>
                        <Select
                            defaultValue={"t"}
                            onChange={handleNetworkChange}
                        >
                            <MenuItem value={"t"}>Testnet</MenuItem>
                            <MenuItem value={"f"}>Mainnet</MenuItem>
                        </Select>
                    </Box>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <Account address={address} balance={balance + " FIL"} publicKey={publicKey} api={api}/>
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