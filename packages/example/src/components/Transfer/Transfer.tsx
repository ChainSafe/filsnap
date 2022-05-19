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
import {FilecoinSnapApi} from "@chainsafe/filsnap-types";
import { attoFilToFil, filToAttoFil } from "../../services/utils";

interface ITransferProps {
    network: string,
    api: FilecoinSnapApi | null,
    onNewMessageCallback: any
}

type AlertSeverity = "success" | "warning" | "info" | "error";

export const Transfer: React.FC<ITransferProps> = ({network, api, onNewMessageCallback}) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [gasLimit, setGasLimit] = useState<string>("0");
    const [gasPremium, setGasPremium] = useState<string>("0");
    const [gasFeeCap, setGasFeeCap] = useState<string>("0");
    const [maxFee, setMaxFee] = useState<string>("0");
    
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

    const handleGasPremiumChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGasPremium(event.target.value);
    }, [setGasPremium]);
    
    const handleMaxFeeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxFee(event.target.value);
    }, [setMaxFee]);

    const handleGasFeeCapChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGasFeeCap(event.target.value);
    }, [setGasFeeCap]);

    const showAlert = (severity: AlertSeverity, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setAlert(true);
    };

    const onAutoFillGas = useCallback(async () => {
        if (recipient && amount && api) {

            const messageEstimate = (maxFee === "0") ? await api.calculateGasForMessage({
                to: recipient,
                value: BigInt(filToAttoFil(amount)).toString()
            }) : await api.calculateGasForMessage({
                to: recipient,
                value: BigInt(filToAttoFil(amount)).toString()
            }, maxFee);
            setGasPremium(attoFilToFil(messageEstimate.gaspremium));
            setGasFeeCap(attoFilToFil(messageEstimate.gasfeecap));
            setGasLimit(attoFilToFil(messageEstimate.gaslimit.toString()));
            setMaxFee(attoFilToFil(messageEstimate.maxfee));
        } else {
            showAlert("error", "Please first fill in Recipient and Amount fields");
        }
    }, [recipient, amount, maxFee, api]);

    const onSubmit = useCallback(async () => {
        if (amount && recipient && api) {
            // Temporary signature method until sending is implemented
            const signedMessageResponse = await api.signMessage({
                to: recipient,
                value: BigInt(filToAttoFil(amount)).toString(),
                gaslimit: Number(filToAttoFil(gasLimit)),
                gasfeecap: filToAttoFil(gasFeeCap),
                gaspremium: filToAttoFil(gasPremium)
            });
            if(signedMessageResponse.error != null) {
                showAlert("error", "Error on signing message");
            } else if(signedMessageResponse.error == null && !signedMessageResponse.confirmed) {
                showAlert("info", "Signing message declined");
            } else {
                showAlert("info", `Message signature: ${signedMessageResponse.signedMessage.signature.data}`);
                const txResult = await api.sendMessage(signedMessageResponse.signedMessage);
                showAlert("info", `Message sent with cid: ${txResult.cid}`);
            }

            // clear form
            setAmount("");
            setRecipient("");
            setGasFeeCap("0");
            setGasPremium("0");
            setGasLimit("0");
            setMaxFee("0");
            // inform to refresh messages display
            onNewMessageCallback();
        }
    }, [amount, recipient, api, gasLimit, gasFeeCap, gasPremium, onNewMessageCallback]);

    return (
        <Card>
            <CardContent>
                <CardHeader title="Transfer"/>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12}>
                        <TextField
                        onChange={handleRecipientChange} size="medium" fullWidth id="recipient" label="Recipient" variant="outlined" value={recipient}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                        InputProps={{startAdornment: <InputAdornment position="start">FIL</InputAdornment>}}
                        onChange={handleAmountChange} size="medium" fullWidth id="amount" label="Amount" variant="outlined" value={amount}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                            InputProps={{startAdornment: <InputAdornment position="start">FIL</InputAdornment>}}
                            onChange={handleGasLimitChange} size="medium" fullWidth id="gaslimit" label="Gas Limit" variant="outlined" value={gasLimit}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                            InputProps={{startAdornment: <InputAdornment position="start">FIL</InputAdornment>}}
                            onChange={handleGasPremiumChange} size="medium" fullWidth id="gaspremium" label="Gas Premium" variant="outlined" value={gasPremium}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                            InputProps={{startAdornment: <InputAdornment position="start">FIL</InputAdornment>}}
                            onChange={handleGasFeeCapChange} size="medium" fullWidth id="gasfeecap" label="Gas Fee Cap" variant="outlined" value={gasFeeCap}>
                        </TextField>
                        <Box m="0.5rem"/>
                        <TextField
                            InputProps={{startAdornment: <InputAdornment position="start">FIL</InputAdornment>}}
                            onChange={handleMaxFeeChange} size="medium" fullWidth id="maxfee" label="Max fee (0.1 FIL if not set)" variant="outlined" value={maxFee}>
                        </TextField>
                    </Grid>
                </Grid>
                <Box m="0.5rem"/>
                <Grid container item xs={12} justifyContent="flex-end" >
                    <Button onClick={onAutoFillGas} color="secondary" variant="contained" size="large" style={{marginRight: 10}}>AUTO FILL GAS</Button>
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
