import React, {useEffect} from 'react';
import {Dashboard} from "./containers/Dashboard/Dashboard";
import {MetaMaskContextProvider} from "./context/metamask";
import {injectMetamaskPolkadotSnapProvider} from "@nodefactory/metamask-polkadot-adapter";

function App() {

    useEffect(() => {
        injectMetamaskPolkadotSnapProvider("westend");
    }, [])
  
  return (
      <MetaMaskContextProvider>
        <Dashboard/>
      </MetaMaskContextProvider>
  );
}

export default App;
