import { createContext, useContext, useState } from "react";

const balanceContext= createContext();

export function BalanceProvider({children}){
    const [balance, setBalance]= useState(0);

    return(
        <balanceContext.Provider value={{balance, setBalance}}>
            {children}
        </balanceContext.Provider>
    )
}

export function useBalance(){
    return useContext(balanceContext);
}

