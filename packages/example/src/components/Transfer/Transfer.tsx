import React, {useCallback, useEffect, useState} from "react";
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
    const [gasLimit, setGasLimit] = useState<string>("1000");
    const [gasPrice, setGasPrice] = useState<string>("1");

    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState("success" as AlertSeverity);
    const [message, setMessage] = useState("");

    const handleRecipientChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value);
    }, [setRecipient]);

    const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }, [setAmount]);

    const handleGasLimitChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGasLimit(event.target.value);
    }, [setGasLimit]);

    const handleGasPriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGasPrice(event.target.value);
    }, [setGasPrice]);

    const showAlert = (severity: AlertSeverity, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setAlert(true);
    };

    const onSubmit = useCallback(async () => {
        if (amount && recipient && api) {
            // Temporary signature method until sending is implemented
            const signedMessage = await api.signMessage({
                to: recipient,
                value: BigInt(amount).toString(),
                gaslimit: Number(gasLimit),
                gasprice: gasPrice
            });
            showAlert("info", `Message signature: ${signedMessage.signature.data}`);
            const txResult = await api.sendMessage(signedMessage);
            // @ts-ignore
            showAlert("info", `Message included in block with cid: ${txResult["/"]}`);
            setAmount("");
            setRecipient("");
            setGasPrice("1");
            setGasLimit("1000");
        }
    }, [amount, api, recipient, gasPrice, gasLimit]);

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
                        <Box m="0.5rem"/>
                        <TextField
                            onChange={handleGasLimitChange} size="medium" fullWidth id="gaslimit" label="Gas Limit" variant="outlined" value={gasLimit}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                            onChange={handleGasPriceChange} size="medium" fullWidth id="gasprice" label="Gas Price" variant="outlined" value={gasPrice}>
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
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
};
