import "@solana/wallet-adapter-react-ui/styles.css"
import { ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";


export function Header(){
    return (
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/nEDdb5_tm52gBvJIgCXgOZiwsHdQp4AB">
            <WalletProvider wallets={[]}>
            <WalletModalProvider>
      
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", }}>
        {/* Left Section */}
        <div className="flex gap-7 m-4 flex-wrap sm:flex-nowrap">
        <div className="px-1 sm:px-10 text-sm sm:text-lg whitespace-nowrap"><Link to="airdrop"> Airdrop</Link></div>
        <div className="px-1 sm:px-10 text-sm sm:text-lg whitespace-nowrap"><Link to="send-token"> Send Token</Link></div>
        <div className="px-1 sm:px-10 text-sm sm:text-lg whitespace-nowrap"><Link to="launch-token"> Launch Token</Link></div>
        <div className="px-1 sm:px-10 text-sm sm:text-lg whitespace-nowrap"><Link to="swapping"> Swapping</Link> </div>
      </div>
      
      
        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <WalletMultiButton
            style={{
              transform: "scale(0.9)",
            }}
          ></WalletMultiButton>
        </div>
      </div>
      <hr style={{ border: "0", height:"1px", backgroundColor: "#2e3337", }} />
      
              {/* <LaunchPad /> */}
            
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        );
  }