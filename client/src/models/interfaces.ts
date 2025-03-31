import Web3 from "web3";

export interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  network: string | null;
  contract: any;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}
