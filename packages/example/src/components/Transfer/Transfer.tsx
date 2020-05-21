import React, {useCallback, useState} from "react";
import {getInjectedMetamaskExtension} from "../../services/metamask";
import {TxEventArgument} from "@nodefactory/metamask-filecoin-types";
import {getCurrency} from "../../services/format";

interface ITransferProps {
    network: string
}

type AlertSeverity = "success" | "warning" | "info" | "error";

export const Transfer: React.FC<ITransferProps> = ({network}) => {

    const onSubmit = async () => {
    }

    return (
    );
};
