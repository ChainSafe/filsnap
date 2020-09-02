import {Box, Container, Grid, Typography} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';
import logo from "./filecoin_logo.png";
import nf_logo from "./node_factory_logo.png";
import React from "react";

function Footer() {
    return (
        <Container style={{position: "fixed", left: 0, bottom: 0, maxWidth: "100%", textAlign: "center"}}>
            <Grid style={{}} direction="row" alignItems="flex-end" justify="center" container spacing={3}>
                <Box m="2rem" height="100%">
                    <a style={{textDecoration: "unset"}} href={"https://github.com/NodeFactoryIo/filsnap"}>
                        <GitHubIcon fontSize={"large"} />
                        <Typography style={{textDecoration: "unset"}}>Repo</Typography>
                    </a>
                </Box>
                <Box m="2rem" height="100%">
                    <a style={{textDecoration: "unset"}} href={"https://github.com/NodeFactoryIo/filsnap/wiki"}>
                        <DescriptionIcon fontSize={"large"} />
                        <Typography>Docs</Typography>
                    </a>
                </Box>
            </Grid>
            <Grid style={{}} direction="row" alignItems="flex-end" justify="center" container spacing={3}>
                <Box m="2rem" height="100%">
                    <img height={60} src={logo} alt={"Logo"}/>
                </Box>
                <Box m="2rem" height="100%">
                    <img height={60} src={nf_logo} alt={"Node Factory"}/>
                </Box>
            </Grid>
        </Container>
    )
}

export default Footer;