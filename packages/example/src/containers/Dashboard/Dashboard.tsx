import React, {useContext, useEffect, useState} from "react";
import {
    Container,
    Grid, Hidden,
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

    const [api, setApi] = useState<FilecoinSnapApi|null>(null);

    useEffect(() => {
        (async () => {
            if (state.filecoinSnap.isInstalled && state.filecoinSnap.snap) {
                const filecoinApi = await state.filecoinSnap.snap.getFilecoinSnapApi();
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