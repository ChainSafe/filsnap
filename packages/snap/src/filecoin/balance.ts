import {Wallet} from "../interfaces";
import {LotusRpcApi} from "./types";
import {getKeyPair} from "./account";

let balanceState = {currentBalance: "", listening: false, intervalId: 0};

export async function registerToBalanceChange(wallet: Wallet, api: LotusRpcApi, onBalanceChangeCallback: any) {
    const keypair = await getKeyPair(wallet);
    // initial balance
    if (balanceState.currentBalance === "") {
        balanceState.currentBalance = await api.walletBalance(keypair.address);
    }
    // // clear set interval if already listening
    // if (balanceState.listening) {
    //     clearInterval(balanceState.intervalId);
    //     balanceState.intervalId = 0;
    // }
    setTimeout(() => {console.log("INSIDE SET TIMEOUT");}, 2000);
    // window.setInterval(() => {
    //     // const newBalance = await api.walletBalance(keypair.address);
    //     // console.log(`LISTENING TO BALANCE: ${balanceState.currentBalance} FIL :: interval_${balanceState.intervalId}`);
    //     // if (newBalance !== balanceState.currentBalance) {
    //     //     await onBalanceChangeCallback(newBalance)
    //     // }
    //     // balanceState.currentBalance = newBalance;
    //     console.log("LISTENING TO BALANCE");
    // }, 3000);
}