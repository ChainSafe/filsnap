import React from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core/';
import {FilecoinSnapApi} from "@chainsafe/filsnap-types";

export interface AccountProps {
    address: string,
    publicKey: string,
    balance: string,
    balanceChange: boolean,
    api: FilecoinSnapApi | null
}

export const Account = (props: AccountProps) => {

    const handleExport = async () => {
        if (props.api) {
            const privateKey = await props.api.exportPrivateKey();
            alert(`Your private key: ${privateKey}`);
        }
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
                        {props.balanceChange
                            ? <Typography variant="subtitle2" ><b>{props.balance}</b></Typography>
                            : <Typography variant="subtitle2" >{props.balance}</Typography>
                        }
                    </Grid>
                </Grid>
                <Grid container item xs={12} justifyContent="flex-end">
                    <Button color="secondary" variant={"contained"} onClick={handleExport}>Export private key</Button>
                </Grid>
            </CardContent>
        </Card>
    );
};
