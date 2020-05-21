import React from "react";
import {
    Container,
    Grid,
} from '@material-ui/core/';
import {MetaMaskConnector} from "../MetaMaskConnector/MetaMaskConnector";

export const Dashboard = () => {

    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justify="center" container spacing={3}>
                    <MetaMaskConnector/>
            </Grid>
        </Container>
    );
};