import React from "react";
import {Box, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {BlockInfo} from "@nodefactory/metamask-polkadot-types";

export const LatestBlock = (props: {block: BlockInfo}) => {

    return (
        <Card>
            <CardHeader title="Latest block"/>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">Block number:</Typography>
                        <Typography variant="subtitle2">{props.block.number}</Typography>
                        <Divider light/>
                        <Box m={"0.5rem"}/>
                        <Typography variant="h6">Hash:</Typography>
                        <Typography variant="subtitle2">{props.block.hash}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};