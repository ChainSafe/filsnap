import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    Box,
    Container,
    Grid, Hidden, InputLabel, MenuItem, Select,
} from '@material-ui/core/';
import {MetaMaskConnector} from "../MetaMaskConnector/MetaMaskConnector";
import {MetaMaskContext} from "../../context/metamask";
import {Account} from "../../components/Account/Account";
import {FilecoinSnapApi} from "@nodefactory/metamask-filecoin-types";

export const Dashboard = () => {

    const [state] = useContext(MetaMaskContext);

    // const [balance, setBalance] = useState("0");
    const [address, setAddress] = useState("");
    const [publicKey, setPublicKey] = useState("");

    const [network, setNetwork] = useState<"f" | "t">("t");

    const [api, setApi] = useState<FilecoinSnapApi|null>(null);

    const handleNetworkChange = async (event: React.ChangeEvent<{value: any}>) => {
        const selectedNetwork = event.target.value as "f" | "t";
        console.log("NETWORK");
        console.log(selectedNetwork);
        if (selectedNetwork === network) return;
        // todo set initial configuration
        if (api) {
            // todo implement configuraitons with only network name
            // api.configure({})
        }
    };

    useEffect(() => {
        (async () => {
            if (state.filecoinSnap.isInstalled && state.filecoinSnap.snap) {
                const filecoinApi = await state.filecoinSnap.snap.getFilecoinSnapApi();
                filecoinApi.configure({network: network})
                setApi(filecoinApi);
            }
        })();
    }, [state.filecoinSnap.isInstalled, state.filecoinSnap.snap]);

    useEffect(() => {
        (async () => {
            if (api) {
                setAddress(await api.getAddress());
                setPublicKey(await api.getPublicKey())
            }
        })();
    }, [api]);

    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justify="center" container spacing={3}>
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
                            <Account address={address} balance={"0"} publicKey={publicKey}/>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    );
};