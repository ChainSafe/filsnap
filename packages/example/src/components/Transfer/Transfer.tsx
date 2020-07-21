import React, {useCallback, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    InputAdornment,
    Snackbar,
    TextField
} from '@material-ui/core/';
import {Alert} from "@material-ui/lab";
import {FilecoinSnapApi} from "@nodefactory/metamask-filecoin-types";

interface ITransferProps {
    network: string,
    api: FilecoinSnapApi | null
}

type AlertSeverity = "success" | "warning" | "info" | "error";

export const Transfer: React.FC<ITransferProps> = ({network, api}) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string | number>("");

    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState("success" as AlertSeverity);
    const [message, setMessage] = useState("");

    const handleRecipientChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value);
    }, [setRecipient]);

    const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }, [setAmount]);

    const showAlert = (severity: AlertSeverity, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setAlert(true);
    };

    const onSign = useCallback(async () => {
        if (amount && recipient && api) {
            const address = await api.getAddress();
            // Temporary signature method until sending is implemented
            const signedMessage = await api.signMessage({
                from: address,
                to: recipient,
                value: BigInt(amount).toString(),
                method: 1,
                gaslimit: 100,
                gasprice: "0",
                nonce: 1
            });
            showAlert("info", `Message signature: ${signedMessage.signature.data}`);
            setAmount("");
            setRecipient("");
        }
    }, [amount, api, recipient]);

    const onSubmit = useCallback(args => {console.log("Transaction submited");}, []);

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
                        InputProps={{startAdornment: <InputAdornment position="start">{`FIL`}</InputAdornment>}}
                        onChange={handleAmountChange} size="medium" fullWidth id="recipient" label="Amount" variant="outlined" value={amount}>
                        </TextField>
                    </Grid>
                </Grid>
                <Box m="0.5rem"/>
                <Grid container item xs={12} justify="flex-end">
                    <Button onClick={onSign} color="secondary" variant="contained" size="large">SIGN</Button>
                    <Box m="0.5rem"/>
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
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
};
