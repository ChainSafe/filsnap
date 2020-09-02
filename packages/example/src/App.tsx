import React from 'react';
import {Dashboard} from "./containers/Dashboard/Dashboard";
import {MetaMaskContextProvider} from "./context/metamask";
import Footer from "./Footer";

function App() {

  return (
      <MetaMaskContextProvider>
          <Dashboard/>
          <Footer/>
      </MetaMaskContextProvider>
  );
}

export default App;
