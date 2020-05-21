import React, {useState} from "react";
import {getInjectedMetamaskExtension} from "../../services/metamask";

export const SignMessage = () => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");
    const [modalBody, setModalBody] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
      };

    const onSubmit = async () => {
    }

    return (
    );
}