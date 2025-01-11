import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useBalance } from "./BalanceContext";

export function Header() {

  const {balance, setBalance}= useBalance();
  const wallet= useWallet();
  const {connection}= useConnection()

  async function getBalance(){
    if (wallet.publicKey){
      const walletBalance= await connection.getBalance(wallet.publicKey)
      setBalance(walletBalance)
    }
  }
  
  useEffect(()=>{
    if(wallet.publicKey && wallet.connected){
      getBalance()
    }
    else {
      setBalance(0)
    }

    return()=>{
      setBalance(0)
    }
  },[wallet.publicKey, wallet.connected, connection])

  return (

        <WalletModalProvider>
          <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-customDark text-white">
            {/* Left Section */}
            <nav className="flex flex-wrap gap-4 sm:gap-7">
              <Link to="airdrop" className="px-2 sm:px-4 text-sm sm:text-lg hover:text-text_comp">
                Airdrop
              </Link>
              <Link to="send-token" className="px-2 sm:px-4 text-sm sm:text-lg hover:text-text_comp">
                Send Token
              </Link>
              <Link to="launch-token" className="px-2 sm:px-4 text-sm sm:text-lg hover:text-text_comp">
                Launch Token
              </Link>
              <Link to="swapping" className="px-2 sm:px-4 text-sm sm:text-lg hover:text-text_comp">
                Swapping
              </Link>
            </nav>

              {/* Right Section */}
                {wallet.connected && (
                  <div className="flex justify-items-end text-white ml-auto mr-7">{balance/LAMPORTS_PER_SOL} SOL</div>
                  )}
                <div className="mt-2 sm:mt-0 flex items-center">
          <WalletMultiButton className="scale-90" />
</div>

          </header>

          {/* <hr className="border-0 h-px bg-[#2e3337]" /> */}
        </WalletModalProvider>
  );
}
