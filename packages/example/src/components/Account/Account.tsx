import React from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core/';

export interface AccountProps {
    address: string,
    publicKey: string,
    balance: string
    network: string
}

export const Account = (props: AccountProps) => {

    const handleExport = async () => {
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
