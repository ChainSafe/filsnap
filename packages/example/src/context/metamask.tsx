import React, {createContext, Dispatch, PropsWithChildren, Reducer, useReducer} from "react";
import {hasMetaMask, MetamaskFilecoinSnap} from "@chainsafe/filsnap-adapter";

interface IFilecoinSnap {
    isInstalled: boolean
    message: string
    snap?: MetamaskFilecoinSnap
}

export interface MetamaskState {
    filecoinSnap: IFilecoinSnap,
    hasMetaMask: boolean,
}

const initialState: MetamaskState = {
    filecoinSnap: {
        isInstalled: false,
        message: ""
    },
    hasMetaMask: hasMetaMask()
};
type MetamaskDispatch = {type: MetamaskActions, payload: any};

export const MetaMaskContext = createContext<[MetamaskState, Dispatch<MetamaskDispatch>]>([initialState, () => {}]);

export enum MetamaskActions {
    SET_INSTALLED_STATUS
}

const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {
    switch (action.type) {
        case MetamaskActions.SET_INSTALLED_STATUS: {
            return {
                ...state,
                filecoinSnap: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export const MetaMaskContextProvider = (props: PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MetaMaskContext.Provider value={[state, dispatch]}>
            {props.children}
        </MetaMaskContext.Provider>
    );
};
