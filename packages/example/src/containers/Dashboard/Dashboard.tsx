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