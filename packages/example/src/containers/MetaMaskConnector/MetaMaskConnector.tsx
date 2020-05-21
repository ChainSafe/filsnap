import {Box, Button, Hidden, Snackbar, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, {useCallback, useContext, useEffect} from "react";
import Alert from "@material-ui/lab/Alert";
import {MetamaskActions, MetaMaskContext} from "../../context/metamask";
import {installFilecoinSnap, isFilecoinSnapInstalled} from "../../services/metamask";

export const MetaMaskConnector = () => {

    const [state, dispatch] = useContext(MetaMaskContext);

    useEffect( () => {
        (async () => {
            if(await isFilecoinSnapInstalled()) {
                dispatch({type: MetamaskActions.SET_INSTALLED_STATUS, payload: {isInstalled: true}});
            }
        })();
    }, [dispatch]);

    const installSnap = useCallback(async () => {
       const isInitiated = await installFilecoinSnap();
       if(!isInitiated) {
           dispatch({type: MetamaskActions.SET_INSTALLED_STATUS, payload: {isInstalled: false, message: "Please accept snap installation prompt"}})
       } else {
           dispatch({type: MetamaskActions.SET_INSTALLED_STATUS, payload: {isInstalled: true}});
       }
    }, [dispatch]);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type: MetamaskActions.SET_INSTALLED_STATUS, payload: false})
      };
    
    const shouldDisplaySnackbar = (): boolean => {
      if (!state.filecoinSnap.isInstalled && state.filecoinSnap.message) return true;
      else return false;
    }

    return(
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={shouldDisplaySnackbar()}
                autoHideDuration={6000}
                onClose={handleClose}
                message={state.filecoinSnap.message}
                action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
            />
            <Hidden xsUp={state.hasMetaMask}>
                <Alert severity="warning">Ensure that MetaMask is installed!</Alert>
                <Box mt={"1rem"} />
            </Hidden>
            <Button
                disabled={!state.hasMetaMask}
                onClick={installSnap}
                variant="contained"
                size={"large"}
                color="primary"
            >
                Connect to MetaMask
            </Button>
        </div>
    );

};