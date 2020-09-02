import React from 'react';
import {Dashboard} from "./containers/Dashboard/Dashboard";
import {MetaMaskContextProvider} from "./context/metamask";

function App() {

  return (
      <MetaMaskContextProvider>
          <Dashboard/>
      </MetaMaskContextProvider>
  );
}

export default App;
