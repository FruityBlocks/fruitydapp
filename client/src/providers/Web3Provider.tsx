import { ReactNode, createContext, useState, useCallback } from "react";
import { ethers } from "ethers";
import { notifications } from "@mantine/notifications";
import FruitMarketplace from "../../../artifacts/contracts/NewFruitMarketPlace.sol/NewFruitMarketPlace.json";
import { Web3ContextType } from "../models/interfaces";

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
      notifications.show({
        title: "Connection in Progress",
        message: "A wallet connection is already being processed. Please wait.",
        color: "yellow",
      });
      return;
    }

    if (!window.ethereum) {
      notifications.show({
        title: "Wallet Not Found",
        message: "Please install MetaMask to connect your wallet.",
        color: "red",
      });
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
      console.log(newSigner);
      console.log(newAccount);
      console.log(networkData);
      console.log(chainId);

      setProvider(newProvider);
      setSigner(newSigner);
      setAccount(newAccount);
      setNetwork(chainId);

      const fruitContract = new ethers.Contract(
        DEPLOYED_ADDRESS,
        ABI,
        newSigner
      );
      console.log(fruitContract);
      setContract(fruitContract);

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length ? accounts[0] : null);
      });

      window.ethereum.on("chainChanged", (newChainId: string) => {
        setNetwork(parseInt(newChainId, 16).toString());
      });
      if (!fruitContract.isRegistered()) fruitContract.createUser();
    } catch (error: any) {
      const errorMessages: Record<number, string> = {
        "-32002":
          "A wallet connection request is already in progress. Please check your MetaMask extension.",
        "4001": "You declined the wallet connection. Please try again.",
      };

      notifications.show({
        title: "Connection Error",
        message:
          errorMessages[error.code] ||
          error.message ||
          "Failed to connect wallet. Please try again.",
        color: "red",
      });

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
