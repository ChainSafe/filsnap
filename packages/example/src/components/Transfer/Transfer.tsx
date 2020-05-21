import React, {useCallback, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Hidden,
    InputAdornment,
    Snackbar,
    TextField
} from '@material-ui/core/';
import {getInjectedMetamaskExtension} from "../../services/metamask";
import {Alert} from "@material-ui/lab";
import {getPolkascanTxUrl} from "../../services/polkascan";
import {TxEventArgument} from "@nodefactory/metamask-polkadot-types";
import {getCurrency} from "../../services/format";

interface ITransferProps {
    network: string
}

type AlertSeverity = "success" | "warning" | "info" | "error";

export const Transfer: React.FC<ITransferProps> = ({network}) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string | number>("");

    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState("success" as AlertSeverity);
    const [message, setMessage] = useState("");
    const [polkascanUrl, setPolkascanUrl] = useState("");

    const handleRecipientChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value);
    }, [setRecipient]);

    const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }, [setAmount]);

    const handleTransactionIncluded = useCallback((tx: TxEventArgument) => {
        if (tx.txHash) {
            showAlert(
                "success",
                `Transaction ${tx.txHash} included in block`,
                getPolkascanTxUrl(tx.txHash, network)
            );
        }
    }, [network]);

    const handleTransactionFinalized = useCallback((tx: TxEventArgument) => {
        if (tx.txHash) {
            showAlert(
                "success",
                `Transaction ${tx.txHash} finalized`,
                getPolkascanTxUrl(tx.txHash, network)
            );
        }
    }, [network]);

    const showAlert = (severity: AlertSeverity, message: string, polkasacanUrl?: string) => {
        setPolkascanUrl(polkasacanUrl ? polkasacanUrl : "");
        setSeverity(severity);
        setMessage(message);
        setAlert(true);
    };

    const onSubmit = useCallback(async () => {
        const provider = await getInjectedMetamaskExtension();
        if(provider && provider.signer.signPayload) {
            if (amount && recipient) {
                const api = await provider.getMetamaskSnapApi();
                const convertedAmount = BigInt(amount) * BigInt("1000000000");
                const txPayload = await api.generateTransactionPayload(convertedAmount.toString(), recipient);
                const signedTx = await provider.signer.signPayload(txPayload.payload);
                let txHash = await api.send(signedTx.signature, txPayload);

                // subscribe to transaction events
                const polkadotEventApi = await api.getEventApi();
                polkadotEventApi.subscribeToTxStatus(txHash, handleTransactionIncluded, handleTransactionFinalized);
                // clear fields
                setAmount("");
                setRecipient("");
            } else {
                showAlert("error", "Please fill recipient and amount fields.");
            }
        }
    }, [amount, handleTransactionFinalized, handleTransactionIncluded, recipient, setAmount, setRecipient]);

    return (
        <Card>
            <CardContent>
                <CardHeader title="Transfer"/>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={12}>
                        <TextField
                        onChange={handleRecipientChange} size="medium" fullWidth id="recipient" label="Recipient" variant="outlined" value={recipient}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                        InputProps={{startAdornment: <InputAdornment position="start">{`m${getCurrency(network)}`}</InputAdornment>}}
                        onChange={handleAmountChange} size="medium" fullWidth id="recipient" label="Amount" variant="outlined" value={amount}>
                        </TextField>
                    </Grid>
                </Grid>
                <Box m="0.5rem"/>
                <Grid container item xs={12} justify="flex-end">
                    <Button onClick={onSubmit} color="secondary" variant="contained" size="large">SEND</Button>
                </Grid>
                <Snackbar
                    open={alert}
                    autoHideDuration={6000}
                    onClose={() => setAlert(false)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                    <Alert severity={severity} onClose={() => setAlert(false)}>
                        {`${message} `}
                        <Hidden xsUp={polkascanUrl === ""}>
                            <a href={polkascanUrl}>See on Polkascan</a>
                        </Hidden>
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
};
