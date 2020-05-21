import React from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core/';
import formatBalance from "@polkadot/util/format/formatBalance"
import {getInjectedMetamaskExtension} from "../../services/metamask";
import {getCurrency} from "../../services/format";

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
        <Card>
            <CardHeader title="Account details"/>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">ADDRESS:</Typography>
                        <Typography variant="subtitle2">{props.address}</Typography>
                        <Divider light/>
                        <Box m={"0.5rem"}/>
                        <Typography variant="h6">PUBLIC KEY:</Typography>
                        <Typography variant="subtitle2">{props.publicKey}</Typography>
                        <Divider light/>
                        <Box m={"0.5rem"}/>
                        <Typography variant="h6">ACCOUNT BALANCE:</Typography>
                        <Typography variant="subtitle2">
                            {formatBalance(props.balance, {decimals: 12, withSi: true, withUnit: getCurrency(props.network)})}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify="flex-end">
                    <Button color="secondary" variant={"contained"} onClick={handleExport}>Export private key</Button>
                </Grid>
            </CardContent>
        </Card>
    );
};
