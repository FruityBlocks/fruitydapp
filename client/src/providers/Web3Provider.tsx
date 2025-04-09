import { ReactNode, createContext, useState, useCallback } from "react";
import { ethers } from "ethers";
import FruitMarketplace from "../../../artifacts/contracts/FruitMarketPlace.sol/FruitMarketPlace.json";
import { Web3ContextType } from "../models/interfaces";
import { handleError } from "../models/Errors";

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const DEPLOYED_ADDRESS = import.meta.env.VITE_DEPLOYED_ADDRESS;
if (!DEPLOYED_ADDRESS) {
  throw new Error(
    "DEPLOYED_ADDRESS is not defined in the environment variables."
  );
}
const ABI = FruitMarketplace.abi;

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    if (isConnecting) {
      handleError(
        "Connection in Progress",
        "A wallet connection is already being processed. Please wait.",
        "yellow"
      );
      return;
    }

    if (!window.ethereum) {
      handleError(
        "Wallet Not Found",
        "Please install MetaMask to connect your wallet.",
        "red"
      );
      return;
    }

    try {
      setIsConnecting(true);
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      await newProvider.send("eth_requestAccounts", []);

      const newSigner = await newProvider.getSigner();
      const newAccount = await newSigner.getAddress();
      const networkData = await newProvider.getNetwork();
      const chainId = networkData.chainId.toString();

      setProvider(newProvider);
      setSigner(newSigner);
      setAccount(newAccount);
      setNetwork(chainId);

      const fruitContract = new ethers.Contract(
        DEPLOYED_ADDRESS,
        ABI,
        newSigner
      );
      setContract(fruitContract);

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length ? accounts[0] : null);
      });

      window.ethereum.on("chainChanged", (newChainId: string) => {
        setNetwork(parseInt(newChainId, 16).toString());
      });
      const isRegistered = await fruitContract.isRegistered();
      if (!isRegistered) {
        const tsx = await fruitContract.createUser();
        await tsx.wait();
      }
    } catch (error) {
      console.error(error);
      handleError("Connection Error", "Failed to connect your wallet.", "red");
      setProvider(null);
      setSigner(null);
      setAccount(null);
      setNetwork(null);
      setContract(null);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        network,
        contract,
        connectWallet,
        isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Provider, Web3Context };
