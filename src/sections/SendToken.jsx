import { useWallet } from "@solana/wallet-adapter-react";
import { getTokens } from "../components/TokenScan";
import { useEffect, useState } from "react";
import { useBalance } from "../components/BalanceContext";


export function SendToken() {
  const wallet = useWallet();
  const {balance}= useBalance();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet.publicKey) {
      const fetchTokens = async () => {
        try {
          const tokens = await getTokens(wallet.publicKey.toString(),balance);
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
    return (
      <div>
        {tokens.map((token, index) => (
          <div key={index} className="mb-4 p-4 ">
            {token.name} ({token.symbol}): {token.balance}
          </div>
        ))}
      </div>
    );
  }
  