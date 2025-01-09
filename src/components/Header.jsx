import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";

export function Header() {
  return (

        <WalletModalProvider>
          <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-customDark text-white">
            {/* Left Section */}
            <nav className="flex flex-wrap gap-4 sm:gap-7">
              <Link to="airdrop" className="px-2 sm:px-4 text-sm sm:text-lg hover:underline">
                Airdrop
              </Link>
              <Link to="send-token" className="px-2 sm:px-4 text-sm sm:text-lg hover:underline">
                Send Token
              </Link>
              <Link to="launch-token" className="px-2 sm:px-4 text-sm sm:text-lg hover:underline">
                Launch Token
              </Link>
              <Link to="swapping" className="px-2 sm:px-4 text-sm sm:text-lg hover:underline">
                Swapping
              </Link>
            </nav>

            {/* Right Section */}
            <div className="mt-4 sm:mt-0 flex items-center">
              <WalletMultiButton className="scale-90" />
            </div>
          </header>

          {/* <hr className="border-0 h-px bg-[#2e3337]" /> */}
        </WalletModalProvider>
  );
}
