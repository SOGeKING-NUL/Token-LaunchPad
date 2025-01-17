import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getTokens } from "../components/TokenScan";
import { useEffect, useState } from "react";
import { useBalance } from "../components/BalanceContext";
import CustomDropdown from "../components/DropDown";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { notify } from "../components/Toast";

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
      Please connect wallet to use the swapping feature
    </div>
  );
}

function Connected({ tokens }) {
  const [address, setAddress] = useState("");
  const wallet = useWallet();
  const {connection}= useConnection();
  const [amount, setAmount] = useState("");
  const [tokenMintAddress, setTokenMintAddress]= useState("")
  const [selectedToken, setSelectedToken] = useState(tokens[0] || null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleTokenChange = (token) => {
    setSelectedToken(token)
    setTokenMintAddress(token.mintAddress);
  };

  const  sendToken= async ()=>{
    
    try{

      if(tokenMintAddress== "So11111111111111111111111111111111111111112"){

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(address),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        notify("Transaction Successful", "success");

      }
      else{

      const mintPublicKey=new PublicKey(tokenMintAddress);
      const toPublicKey= new PublicKey(address);

      // Get the sender's associated token account
      const senderTokenAccount= await getAssociatedTokenAddress(mintPublicKey, wallet.publicKey)
    
      // Get the recipient's associated token account
      const recipentTokenAccount= await getAssociatedTokenAddress(mintPublicKey, toPublicKey)

      // Check if the recipient's token account exists
      const recipientAccountInfo= await connection.getAccountInfo(recipentTokenAccount);
      const transaction= new Transaction();

      if(!recipientAccountInfo){
        const createAccountInstruction = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          recipentTokenAccount,
          toPublicKey,
          mintPublicKey
        );
        transaction.add(createAccountInstruction);
      }

      // Add an instruction to transfer tokens
      const transferInstruction= createTransferInstruction(
        senderTokenAccount,
        recipentTokenAccount,
        wallet.publicKey,
        amount * Math.pow(10,6), //since SPL tokens have 6 decimals
        []
      );
      transaction.add(transferInstruction);

      //finally send transaction
      const signature= await wallet.sendTransaction(transaction,connection);
      await connection.confirmTransaction(signature, "confirmed");
      notify("Transaction Successful", "success")
    }
    } catch (error) {
      console.error("Error sending tokens:", error);
      alert("Failed to send tokens: " + error.message);
    }
  }

  return (
    <div className="flex flex-col space-y-4 items-center">
      <CustomDropdown
        tokens={tokens}
        selectedToken={selectedToken}
        handleTokenChange={handleTokenChange}
      />
      <br />
      <textarea
        value={address}
        onChange={handleAddressChange}
        className="text-3xl px-5 py-2 bg-transparent text-center appearance-none focus:outline-none rounded resize-none w-[500px] h-24"
        placeholder="Wallet address"
      />
      <div className="flex items-center mt-4">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-3xl mr-2 px-5 py-2 bg-transparent text-center appearance-none focus:outline-none rounded"
          placeholder="Amount"
        />
        <div className="text-2xl mt-2 font-bold">{selectedToken?.symbol}</div>
      </div>
      <br />
      <button
        onClick={sendToken}
        className="text-xl mt-4 px-6 py-2 bg-comp_color text-white rounded hover:bg-comp_hover"
      >
        Send Token
      </button>
    </div>
  );
}  