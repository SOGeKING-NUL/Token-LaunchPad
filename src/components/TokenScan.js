
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TokenListProvider } from '@solana/spl-token-registry';

export async function getTokens(walletPublicKey, SOLbalance) {

    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        // Fetch token accounts for the wallet, this will give us access to all the token holdings of the wallet
        const tokenAccounts = await connection.getTokenAccountsByOwner(
            new PublicKey(walletPublicKey),{
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            }
        );

        const tokens = [{
            mintAddress: "So11111111111111111111111111111111111111112",
            name: 'Wrapped SOL',
            symbol: 'SOL',
            logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
            balance: SOLbalance/LAMPORTS_PER_SOL
          }];

        for (const tokenAccount of tokenAccounts.value) {
            const accountInfo = await connection.getParsedAccountInfo(new PublicKey(tokenAccount.pubkey));
            const parsedInfo = accountInfo.value.data.parsed.info;
            const mintAddress = parsedInfo.mint; // Token mint address
            const balance = parsedInfo.tokenAmount.uiAmount; // Token balance

            const metadata=  await getTokenMetadata(mintAddress);

            if(metadata){
                    tokens.push({ mintAddress,...metadata ,balance });
                }
        }
        console.log(tokens)
        return tokens.length ? tokens: [];
    }
    catch (error) {
            console.error("Unexpected error:", error);
            return null;
    }
}

let tokenList= null;
async function getTokenMetadata(mintAddress) {

    if (mintAddress === "So11111111111111111111111111111111111111112") {
        return {
            name: "Solana",
            symbol: "SOL",
            logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
        };
    }

    if(!tokenList){
        const tokenListProvider = new TokenListProvider();
        tokenList = (await tokenListProvider.resolve()).getList();
    }
    
    const token = tokenList.find(token => token.address === mintAddress);
    if (token) {
        return {
            name: token.name,
            symbol: token.symbol,
            logoURI: token.logoURI
        };
    } else if (!token) {
        console.warn(`No metadata found for mint address: ${mintAddress}`);
        return null;
    }
}

await getTokens("BDAgTqmK9Etk7Qh9uqZaudv8AXm5Xr3MHawCBJBD71Du");