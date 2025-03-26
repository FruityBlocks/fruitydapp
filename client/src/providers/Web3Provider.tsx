import { ReactNode, createContext, useContext, useState } from "react";
import Web3 from "web3";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  network: string | null;
  contract: any;
  connectWallet: () => void;
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

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Request account access
      window.ethereum
        ?.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => setAccount(accounts[0]));

      // Set network details
      window.ethereum
        .request({ method: "net_version" })
        .then((networkId: string) => setNetwork(networkId));

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) =>
        setAccount(accounts[0])
      );

      // Listen for network changes
      window.ethereum.on("chainChanged", (networkId: string) =>
        setNetwork(networkId)
      );

      // Initialize the contract with your ABI and deployed address
      //   const contractAddress = "0xYourContractAddress"; // Replace with actual address
      //   const contractInstance = new web3Instance.eth.Contract(
      //     ContractABI, // Replace with your contract's ABI
      //     contractAddress
      //   );
      //  setContract(contractInstance);
    } else {
      console.log("MetaMask not installed.");
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, account, network, contract, connectWallet }}
    >
      {children}
    </Web3Context.Provider>
  );
};
