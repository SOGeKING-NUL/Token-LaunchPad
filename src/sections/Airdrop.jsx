import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { notify } from "../components/Toast";

export function Airdrop() {

  const [amount, setAmount]= useState("");
  const wallet= useWallet();
  const {connection}= useConnection();

  const handleChange=(e)=>{
    setAmount(e.target.value)

  }

  async function airdropSol(){

    if(!wallet.publicKey){
      notify("Wallet not Connected", "error")
    }else if(amount==""){
      notify("Enter Airdrop Amount", "error")
    }else{
      try{
        await connection.requestAirdrop(wallet.publicKey, parseFloat(amount) * LAMPORTS_PER_SOL);
        notify(`Airdrop ${amount} SOL Successfully`, "success")
      }catch(e){
        notify("Error while Airdropping SOL", "error")
      }
    };

  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <br />
        <h1 className="text-3xl font-bold">Please Enter SOL Airdrop Amount:</h1>
        <br /><br /><br />
        <input type="number" value={amount} onChange={handleChange} className=" text-4xl mr-2 px-5 py-2 bg-transparent text-center appearance-none focus:outline-none rounded"  placeholder="sol amount"></input>
        <br/><br /><br /><button
          onClick={airdropSol} className=" text-xl mt-4 px-6 py-2 bg-comp_color text-white rounded hover:bg-comp_hover"
        >
          Airdrop
        </button>
        <br/>
        <br/>
        <div className="text-white text-xs"> ( make sure to switch to devnet ) </div>
      </div>
    </div>
  );
}
