import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";

export interface Web3ContextType {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
  network: string | null;
  contract: Contract | null;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}
