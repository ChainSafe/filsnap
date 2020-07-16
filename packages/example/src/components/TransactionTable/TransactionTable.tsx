import React from "react";
import {Paper, Table, TableContainer, TableCell,
    TableRow, TableHead, TableBody} from '@material-ui/core/';
import {Transaction} from "@nodefactory/metamask-filecoin-types";

export interface TransactionTableProps {
    txs: Transaction[];
}

export const TransactionTable = (props: TransactionTableProps) => {
    return (
        <TableContainer className="transtaction-table" component={Paper}>
            <Table 
            aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Transaction id</TableCell>
                    <TableCell align="center">Block</TableCell>
                    <TableCell align="center">Sender</TableCell>
                    <TableCell align="center">Destination</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Gas Used</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.txs.map(tx => (
                    <TableRow key={tx.hash}>
                    <TableCell  align="left" component="th" scope="row">
                        {tx.hash}
                    </TableCell>
                    <TableCell  align="center" component="th" scope="row">
                        {tx.block}
                    </TableCell>
                    <TableCell align="center">{tx.sender}</TableCell>
                    <TableCell align="center">{tx.destination}</TableCell>
                    <TableCell align="center">{tx.amount}</TableCell>
                    <TableCell align="center">{tx.fee}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};