import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { Airdrop } from "./sections/Airdrop";
import { Layout } from "./components/Layout";
import { SendToken } from "./sections/SendToken";
import { LaunchToken } from "./sections/LaunchToken";
import { Swapping } from "./sections/Swapping";
import { Toaster } from "react-hot-toast";
import { BalanceProvider } from "./components/BalanceContext";

function App() {
  return (
    <div>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <BalanceProvider>
            <Toaster containerId="toast-container" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/airdrop" element={<Airdrop />} />
                  <Route path="/send-token" element={<SendToken />} />
                  <Route path="/launch-token" element={<LaunchToken />} />
                  <Route path="/swapping" element={<Swapping />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </BalanceProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
