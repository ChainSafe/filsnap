import React from "react";
import {shortAddress} from "../../services/format";

export interface Transaction {
    type: string;
    id: string;
    attributes: {
        "block_id": number;
        value: number,
        fee: number,
        sender: {
            type: string;
            attributes: {
                address: string;
            }
        };
        destination: {
            attributes: {
                address: string;
            }
        }
    }
}

export interface TransactionTableProps {
    txs: Transaction[];
}

export const TransactionTable = (props: TransactionTableProps) => {
    return (
    );
};