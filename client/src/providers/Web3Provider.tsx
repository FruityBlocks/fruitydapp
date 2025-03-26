import { ReactNode, createContext, useContext, useState } from "react";
import Web3 from "web3";
import { notifications } from "@mantine/notifications";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  network: string | null;
  contract: any;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
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

      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const networkId: string = await window.ethereum.request({
        method: "net_version",
      });
      setNetwork(networkId);

      window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
        setAccount(newAccounts[0] || null);
      });

      window.ethereum.on("chainChanged", (newNetworkId: string) => {
        setNetwork(newNetworkId);
      });
    } catch (error: any) {
      switch (error.code) {
        case -32002:
          notifications.show({
            title: "Connection Pending",
            message:
              "A wallet connection request is already in progress. Please check your MetaMask extension.",
            color: "yellow",
          });
          break;
        case 4001:
          notifications.show({
            title: "Connection Rejected",
            message: "You declined the wallet connection. Please try again.",
            color: "red",
          });
          break;
        default:
          notifications.show({
            title: "Connection Error",
            message:
              error.message || "Failed to connect wallet. Please try again.",
            color: "red",
          });
      }
      setWeb3(null);
      setAccount(null);
      setNetwork(null);
    } finally {
      setIsConnecting(false);
    }
  };
  return (
    <Web3Context.Provider
      value={{ web3, account, network, contract, connectWallet, isConnecting }}
    >
      {children}
    </Web3Context.Provider>
  );
};