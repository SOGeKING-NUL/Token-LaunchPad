
import { Connection, PublicKey } from "@solana/web3.js";
import { parse } from "postcss";
import { TokenListProvider } from '@solana/spl-token-registry';


async function getTokens(walletPublicKey) {
    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        // Fetch token accounts for the wallet, this will give us access to all the token holdings of the wallet
        const tokenAccounts = await connection.getTokenAccountsByOwner(
            new PublicKey(walletPublicKey),{
                programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
            }
        );

        const tokens = [];

        for (const tokenAccount of tokenAccounts.value) {
            const accountInfo = await connection.getParsedAccountInfo(new PublicKey(tokenAccount.pubkey));
            const parsedInfo = accountInfo.value.data.parsed.info;
            const mintAddress = parsedInfo.mint; // Token mint address
            const balance = parsedInfo.tokenAmount.uiAmount; // Token balance

            console.log(mintAddress)
            const metadata= await getTokenMetadata(mintAddress);

            if(metadata){
                    tokens.push({ mintAddress,...metadata ,balance });
                }
            else{
                console.log("something went wrong while loading metadata tokens")
            }
        }

        console.log("Tokens:", tokens);
        return tokens;
    } catch (error) {
        console.error("Error fetching tokens:", error);
    }
}

async function getTokenMetadata(mintAddress) {
    const tokenListProvider = new TokenListProvider();
    const tokenList = await tokenListProvider.resolve();
    const tokens = tokenList.getList();

    const token = tokens.find(token => token.address === mintAddress);
    if (token) {
        return {
            name: token.name,
            symbol: token.symbol,
            logoURI: token.logoURI
        };
    } else {
        return null; 
    }
}

await getTokens("BDAgTqmK9Etk7Qh9uqZaudv8AXm5Xr3MHawCBJBD71Du");