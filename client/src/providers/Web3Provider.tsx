import { ReactNode, createContext, useState } from "react";
import Web3 from "web3";
import FruitMarketplace from "../../../build/contracts/FruitMarketplace.json";
import { notifications } from "@mantine/notifications";
import { Web3ContextType } from "../models/interfaces";

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
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
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId: string = await window.ethereum.request({
        method: "net_version",
      });

      setWeb3(web3Instance);
      setAccount(accounts[0]);
      setNetwork(networkId);

      const deployedNetwork = (FruitMarketplace.networks as any)[networkId];
      if (deployedNetwork) {
        const fruitMarketplaceContract = new web3Instance.eth.Contract(
          FruitMarketplace.abi,
          deployedNetwork.address
        );
        console.log(deployedNetwork);
        console.log(fruitMarketplaceContract);
        setContract(fruitMarketplaceContract);
      } else {
        notifications.show({
          title: "Erreur",
          message: "The contract could not be deployed",
          color: "red",
        });
      }

      window.ethereum.on("accountsChanged", (newAccounts: string[]) =>
        setAccount(newAccounts[0] || null)
      );
      window.ethereum.on("chainChanged", (newNetworkId: string) =>
        setNetwork(newNetworkId)
      );
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

export { Web3Provider, Web3Context };
