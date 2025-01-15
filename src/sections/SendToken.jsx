import { useWallet } from "@solana/wallet-adapter-react";
import { getTokens } from "../components/TokenScan";
import { useEffect, useState } from "react";
import { useBalance } from "../components/BalanceContext";
import CustomDropdown from "../components/DropDown";

export function SendToken() {
  const wallet = useWallet();
  const { balance } = useBalance();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet.publicKey) {
      const fetchTokens = async () => {
        try {
          const tokens = await getTokens(wallet.publicKey.toString(), balance);
          setTokens(tokens || []);
        } catch (error) {
          console.error("problem fetching tokens from wallet");
          setTokens([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTokens();
    } else {
      setTokens([]);
      setLoading(false);
    }
  }, [wallet.publicKey, balance]);

  return (
    <div className="flex justify-center items-center h-full">
      {loading ? (
        <div className="text-2xl font-bold">Loading Tokens..</div>
      ) : wallet.connected ? (
        <Connected tokens={tokens} />
      ) : (
        <NotConnected />
      )}
    </div>
  );
}

function NotConnected() {
  return (
    <div className="text-3xl font-bold">
      please connect wallet to use the swapping feature
    </div>
  );
}

function Connected({ tokens }) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokens[0]?.symbol || "");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
<CustomDropdown/>

<textarea
  value={address}
  onChange={handleAddressChange}
  className="text-3xl mr-2 px-5 py-2 bg-transparent text-center appearance-none focus:outline-none rounded resize-none w-[500px] h-24"
  placeholder="wallet address"
/>

      {/* need to add a check for autenticity of the wallet address here*/}

      <br />

      <div className="flex items-center mt-4">
        <input
          value={amount}
          onChange={handleAmountChange}
          className="text-3xl mr-2 px-5 py-2 bg-transparent text-center appearance-none focus:outline-none rounded"
          placeholder="amount"
        />
        <div className="text-2xl mt-2 font-bold">{selectedToken}</div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
}
