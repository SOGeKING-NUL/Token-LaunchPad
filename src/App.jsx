import { useState } from "react";
import "./App.css";
import { LaunchPad } from "./launchpad";
import { ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/nEDdb5_tm52gBvJIgCXgOZiwsHdQp4AB">
      <WalletProvider wallets={[]}>
      <WalletModalProvider>

      <div style={{display: "flex", justifyContent: "flex-end"}}><WalletMultiButton
      style={{
        transform: "scale(0.8)",
        margin: "0 auto"
      }}></WalletMultiButton></div>
        <LaunchPad />
      
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
