import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { Airdrop } from "./components/Airdrop";
import { Layout } from "./components/Layout";
import { SendToken } from "./components/SendToken";
import { LaunchToken } from "./components/LaunchToken";
import { Swapping } from "./components/Swapping";
import { Toaster } from "react-hot-toast";

function App(){
return<div>
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]}>
    <Toaster containerId="toast-container"/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/airdrop" element={<Airdrop/>}/>
        <Route path="/send-token" element={<SendToken/>}/>
        <Route path="/launch-token" element={<LaunchToken/>}/>
        <Route path="/swapping" element={<Swapping/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </WalletProvider>
    </ConnectionProvider>
  </div>
}

export default App;
